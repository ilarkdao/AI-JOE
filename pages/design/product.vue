<template>
<div px-5 pt-5>
    <div bg-white rounded mt-4.5 pb-6 px-4 lg:px-10 min-h-85vh shadow-sm> 
      <p text-4.5 text-gray-600 text-center pt-2 h-10>产品草图渲染</p>

      <div v-if="!clickFlag">        
        <!-- 上传图片 -->
        <n-upload mt-2 mb-4
          :default-upload="false"
          list-type="image-card"
          multiple
          @change="handleChangeX"
        >
          上传产品草图
        </n-upload>

        <div text-rose mb-2>描述产品和背景！</div>
        <n-input
          v-model:value="prompt"
          type="textarea"
          placeholder="input image prompt......"
        />        

        <n-radio-group v-model:value="materialX" name="radiogroup" mt-4 mb-4> 选取主体材质
          <n-space>
            <n-radio v-for="material in materials" :key="material.value" :value="material.value">
              {{ material.label }}
            </n-radio>
          </n-space>
        </n-radio-group>   

        <n-radio-group v-model:value="lightX" name="radiogroup" mt-4 mb-4> 选取灯光 
          <n-space>
            <n-radio v-for="light in lights" :key="light.value" :value="light.value">
              {{ light.label }}
            </n-radio>
          </n-space>
        </n-radio-group>          

         <n-radio-group v-model:value="renderX" name="radiogroup" mt-4 mb-4> 选取渲染器
          <n-space>
            <n-radio v-for="render in renders" :key="render.value" :value="render.value">
              {{ render.label }}
            </n-radio>
          </n-space>
        </n-radio-group>         
   
        <!-- 关键词： <span font-italic text-3.4>{{ imgX }}  portrait,  {{ materialX }} --iw 1.1"</span> -->

        <n-button block mt-2 items-center type="primary" @click="onSubmit" mt-4>
          生成图像
        </n-button>

        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">图像渲染需1分钟左右。</div>
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">
          <p><a target="_blank" href="https://doc.ilark.io/design/product.html">-> 参考文档</a></p> 
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
  title:"产品草图渲染"
})

//选取材质 
const materialX = ref(",Plastic") 
const materials = [
  {
    value: ",Plastic",
    label: "塑料"
  },
  {
    value: ",Leather",
    label: "皮革"
  },
  {
    value: ",Silk",
    label: "丝绸"
  },
  {
    value: ",Synhetic Leather",
    label: "人造革"
  },
  {
    value: ",Aluminum drawing",
    label: "铝拉丝"
  },
  {
    value: ",glass",
    label: "玻璃"
  },
  {
    value: ",Natural fibers",
    label: "天然纤维"
  },
  {
    value: ",Metal",
    label: "金属"
  },
  {
    value: ",Wood",
    label: "木材"
  },
  {
    value: ",made of chrome",
    label: "镀铬"
  }]

//选取灯光 
const lightX = ref(",soft lights") 
const lights = [
  {
    value: ",soft lights",
    label: "柔和照明"
  },
  {
    value: ",hard lighting",
    label: "强光"
  },
  {
    value: ",volumetric lighting",
    label: "体积照明"
  },
  {
    value: ",global illuminations",
    label: "全局照明"
  },
  {
    value: ",cinematic lighting",
    label: "电影灯光"
  },
  {
    value: ",Rembrandt Lighting",
    label: "伦勃朗照明"
  },
  {
    value: ",cold light",
    label: "冷光"
  },
  {
    value: ",neon cold lighting",
    label: "霓虹灯冷光"
  },
  {
    value: ",front lighting",
    label: "前光"
  },
  {
    value: ",Back lighting",
    label: "背光"
  },
  {
    value: ",Dark moody lighting",
    label: "黑暗灯光特效"
  }]

//选取渲染器
const renderX = ref(",octane render") 
const renders = [
  {
    value: ",octane render",
    label: "OC渲染"
  },
  {
    value: ",Maxon Cinema 4D",
    label: "C4D渲染"
  },
  {
    value: ",blender",
    label: "blender"
  },
  {
    value: ",Quixel Megascans Render",
    label: "Quixel Megascans"
  },
  {
    value: ",V-Ray",
    label: "V-Ray"
  },
  {
    value: ",Unreal Engine",
    label: "UE虚幻引擎"
  },
  {
    value: ",Corona Render",
    label: "室内渣染"
  }]

const imgmodel = ref("midjourney")
const checkedNum = ref('4')
const imgX = ref(null)

const clickFlag = ref(false)
const prompt = ref('Camera Design,product image,white background')
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

  if(imgX.value == null){ 
    message.error("您还未上传草图！", { duration: 5e3 })
    return
  }

  prompt.value = imgX.value + " " + prompt.value + materialX.value + lightX.value + renderX.value
  // console.log(559, "prompt", prompt.value)
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
  prompt.value = 'Camera Design,product image,white background'
  img_url.value = ''
  imgX.value = null
}
</script>