<template>
<div px-5 pt-5>
    <div bg-white rounded mt-4.5 pb-6 px-4 lg:px-10 min-h-85vh shadow-sm> 
      <p text-4.5 text-gray-600 text-center pt-2 h-10>风格头像</p>

      <div v-if="!clickFlag">        
        <!-- 上传图片 -->
        <n-upload mt-2 mb-4
          :default-upload="false"
          list-type="image-card"
          multiple
          @change="handleChangeX"
        >
          上传头图
        </n-upload>

        选取风格
        <n-radio-group v-model:value="styleX" name="radiogroup" mb-4> 
          <n-space>
            <n-radio v-for="style in styles" :key="style.value" :value="style.value">
              {{ style.label }}
            </n-radio>
          </n-space>
        </n-radio-group>   
   
        <!-- 关键词： <span font-italic text-3.4>{{ imgX }}  portrait,  {{ styleX }} --iw 1.1"</span> -->

        <n-button block mt-2 items-center type="primary" @click="onSubmit" mt-4>
          生成图像
        </n-button>

        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">生成图像需1分钟左右。</div>
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">如果超时，可直接到 用户中心 -> 
          <nuxt-link to="/user/images"><n-button quaternary type="primary" size="small">图片库</n-button> </nuxt-link>中查看</div>
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">
          <p><a target="_blank" href="https://doc.ilark.io/design/portrait.html">-> 参考文档</a></p> 
        </div>
      </div>

      <div v-else>
        <div my-2>
          图片关键词： <span font-italic text-3>{{prompt}}</span>
        </div>
        <div text-center v-if="!img_url"><img :src="loading" alt="ai joe loading"></div>
        <div v-for="(item,index) in img_url" :key="index" inline mr-4>
          <n-image
            width="240" 
            :src="item" rounded-2 alt="ai joe"
          /> 
        </div><br>
        <n-button type="tertiary" v-if="img_url" @click="more" text-3.6>
          再来一次
        </n-button>
      </div>
    </div>
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
import loading from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')

useHead({
  title:"风格头像"
})

const styleX = ref("pop mart, cartoon 3d render, funny cartoon in the style of Pixar,chibi")
const styles = [
  {
    value: "pop mart, cartoon 3d render, funny cartoon in the style of Pixar,chibi",
    label: "卡通风格"
  },
  {
    value: "style of Van Gogh",
    label: "凡高风格"
  },
  {
    value: "style of Da Vinci Drawing",
    label: "达芬奇画风"
  },
  {
    value: "style of zhang xiaogang",
    label: "张小刚风格"
  },
  {
    value: "style of Amedeo Modigliani",
    label: "莫迪利亚尼风格"
  },
  {
    value: "style of Andy Warhol",
    label: "安迪·沃霍尔风格"
  },
  {
    value: "style of Cyberpunk",
    label: "赛博朋克风"
  },
  {
    value: "style of Futuristic",
    label: "未来主义风"
  }]

const imgmodel = ref("midjourney")
const checkedNum = ref('4')
const imgX = ref(null)

const clickFlag = ref(false)
const prompt = ref('')
const img_url = ref(null)

//上传mj参考图片
const handleChangeX = async (options) => {
  if(options.fileList.length == 0) {
    return
  }
  // handleClick(options.fileList[0].file) 
  imgX.value = await upImage(options.fileList[0].file)
}
// const handleClick = async (file) =>{
//   img_url.value = await upImage(file)
// }


const onSubmit = async () => {
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  prompt.value = imgX.value + "  portrait, " + styleX.value + " --iw 1.1"
  // console.log(559, "prompt", prompt.value)

  if(imgX.value == null){ 
    message.error("您还未上传头像！", { duration: 5e3 })
    return
  }

  clickFlag.value = true
  
 /*
  img_url.value = [
        'https://ipfs.ilark.io/ipfs/QmT88XzQRcFWZYEo52yLz6RwsgLESpuvoLcL9YTGnddw1N',
        'https://ipfs.ilark.io/ipfs/QmNpF5zYTvVF9ERm5BDtgiQdLvB2yFfwdEahJ8gctEpL4W',
        'https://ipfs.ilark.io/ipfs/QmSQbHepMBAScMaPFJAakWM4Rkdv3VEPRfVhxStESruLKa',
        'https://ipfs.ilark.io/ipfs/QmapN3tJnhtxD1jTQcUfZjW2dk4FzpUz41GiqJaQjYaQJJ'
      ]
  return
  */
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          imgmodel: imgmodel.value,
          num: checkedNum.value,
          prompt: prompt.value
      })
  }

  const response = await fetch(baseURL+'/imageapi', dataObj)
  // console.log(223, response)
  if(response.ok){
    let res = await response.json()
    // console.log(566, res, 886, res.imgurl)
    img_url.value = res.imgurl
  } else {
      const err = await response.text()
      clickFlag.value = false
      message.error("错误！\n"+err, { duration: 5e3 })
  }
}
const more = () => {
  clickFlag.value = false
  prompt.value = ''
  img_url.value = ''
  imgX.value = null
}
</script>