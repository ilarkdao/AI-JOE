<template>
<div px-5 pt-5>
    <div bg-white rounded mt-4.5 pb-6 px-4 lg:px-10 min-h-85vh shadow-sm> 
      <p text-4.5 text-gray-600 text-center pt-2 h-10>海报设计</p>

      <div v-if="!clickFlag">
        <div text-rose mb-2>仅需修改下面的关键词模板！</div>
        
        <n-input
          v-model:value="prompt"
          type="textarea"
          placeholder="input image prompt......"
        />

        <!-- 上传图片 -->
        <n-space text-3>
          <n-switch size="small" v-model:value="switchActive" /> 参考图
        </n-space>
        <n-upload mt-2 v-if="switchActive"
          :default-upload="false"
          list-type="image-card"
          multiple
          @change="handleChangeX"
        >
          上传参考图
        </n-upload>

        选取宽高比
        <n-radio-group v-model:value="aspect" name="radiogroup" mt-4 mb-4> 
          <n-space>
            <n-radio v-for="aspect in aspects" :key="aspect.value" :value="aspect.value">
              {{ aspect.label }}
            </n-radio>
          </n-space>
        </n-radio-group>         

        <n-button block mt-2 items-center type="primary" @click="onSubmit">
          生成图像
        </n-button>

        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">生成图像需1分钟左右。</div>
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">
          <p><a target="_blank" href="https://doc.ilark.io/design/poster.html">-> 参考文档</a></p> 
        </div>
      </div>

      <div v-else>
        <div mt--2 mb-2> 
          图片关键词： <span font-italic text-3.4>{{prompt}} </span>
        </div>
        <div text-center v-if="!img_url"><img :src="loading" alt="ai joe loading"></div>
        <div v-for="(item,index) in img_url" :key="index" inline mr-4>
          <n-image
            width="250" 
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
  title:"海报设计"
})
const imgmodel = ref("midjourney")
const checkedNum = ref('4')
const handleChange = (e) => {
  // console.log(e.target.value)
  checkedNum.value = e.target.value
}

const clickFlag = ref(false)
const prompt = ref('"Hua Mu Lan", poster design')
const img_url = ref(null)

//宽高比
const aspect = ref(" --ar 9:16")
const aspects = [
  {
    value: " --ar 9:16",
    label: "9:16"
  },
  {
    value: " --ar 2:3",
    label: "2:3"
  },
  {
    value: " --ar 16:9",
    label: "16:9"
  }]

//上传mj参考图片
const switchActive = ref(false)
const handleChangeX = (options) => {
  if(options.fileList.length == 0) {
    return
  }
  handleClick(options.fileList[0].file) 
}
const handleClick = async (file) =>{
  let ref_img = await upImage(file)
  prompt.value = ref_img+' '+prompt.value
}


const onSubmit = async () => {
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  // if(prompt.value == ''){
  //   message.error("关键词不能为空！", { duration: 5e3 })
  //   return
  // }
  prompt.value = prompt.value + aspect.value
  // console.log(688, "prompt", prompt.value)
  // return 

  clickFlag.value = true
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
  prompt.value = '"Hua Mu Lan", poster design'
  img_url.value = ''
}
</script>