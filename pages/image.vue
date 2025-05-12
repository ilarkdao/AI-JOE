<template>
  <div class="subContainer"> 
    <div bg-white rounded mt-4.5 pb-6 px-4 lg:px-20 min-h-85vh shadow-sm> 
      <p text-4.5 text-gray-600 text-center pt-4.5 h-10>从关键词句生成图像</p>

      <div flex mb-4 h-6 items-center justify-between>
        <p>选择图像模型：</p>
        <n-space vertical w-52vw lg:w-35vw>
          <n-select v-model:value="imgmodel" :options="options" />
        </n-space> 
      </div>
<<<<<<< HEAD

        <!-- 是否优化关键词 -->
        <div flex items-center>
        <n-popover trigger="hover" >
          <template #trigger>
            <div class="i-mdi-alpha-i-circle" hidden lg:flex mr-2/>  
          </template>
          <span>AI自动关键词会先调用o1-mini接口对输入的关键词进行优化，并翻译成英文</span>
        </n-popover>        
        <n-radio-group v-model:value="superior" name="radiogroup" mt-3 mb-3> 
          <n-space>
            <n-radio v-for="superior in superiors" :key="superior.value" :value="superior.value">
              {{ superior.label }}
            </n-radio>
          </n-space>
        </n-radio-group> 
        </div>     
=======
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
      
      <!-- 生成数量 -->
      <div flex mb-4 h-6 items-center justify-between> 
        <p>生成图像数量：</p>
        <n-space w-52vw lg:w-35vw>
          <n-radio
            :checked="checkedNum === '1'"
            value="1"
            name="basic-demo"
            @change="handleChange"
          >
            1张
          </n-radio>
          <n-radio
            :checked="checkedNum === '2'"
            value="2"
            name="basic-demo"
            @change="handleChange"
          >
            2张
          </n-radio>
          <n-radio
            :checked="checkedNum === '4'"
            value="4"
            name="basic-demo"
            @change="handleChange"
          >
            4张
          </n-radio>
        </n-space>
      </div>

      <div v-if="!clickFlag">
        <div text-rose mb-2 v-if="imgmodel == 'stable'">Stable Diffusion模型请尽量使用英文关键词！</div>
        <n-input
          v-model:value="prompt"
          type="textarea"
          placeholder="input image prompt......"
        />
        <n-button block mt-4 items-center type="primary" @click="onSubmit">
          生成图像
        </n-button>
      </div>

      <div v-else>
        <div mt--2 mb-2>
          图片关键词句： <span font-italic text-3.4>{{prompt}}</span>
        </div>
        <div text-center v-if="!img_url"><img :src="loading" alt="ai joe loading"></div>
        <div v-for="(item,index) in img_url" :key="index" inline mr-4>
          <n-image
            width="250" 
            :src="item" rounded-2 alt="ai joe"
          /> 
        </div><br>
        <n-button type="tertiary" v-if="img_url" @click="more" text-3.6>再来一次</n-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
import loading from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
// console.log(123, token.value, 566, token.value == null)
useHead({
  title:"图像"
})
// 图片模型
const imgmodel = ref("stable")
const options = [
  {
<<<<<<< HEAD
    label: "Midjourney V6",
    value: "midjourney",
  },
  {
    label: "DALL·E3",
    value: "dall"
  },
  {
    label: "Stable Diffusion XL 1.0",
    value: "stable"
  }]

//是否优化关键词
const superior = ref("GPT4")
const superiors = [
  {
    value: "GPT4",
    label: "AI自动优化关键词"
=======
    label: "Stable Diffusion XL 1.0",
    value: "stable"
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
  },
  {
    label: "Dall E2",
    value: "dall",
  }
  ]
// 图片数量
const checkedNum = ref('1')
const handleChange = (e) => {
  console.log(e.target.value)
  checkedNum.value = e.target.value
}

const clickFlag = ref(false)
const prompt = ref('')
const img_url = ref(null)
const onSubmit = async () => {
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  if(prompt.value == ''){
    message.error("关键词不能为空！", { duration: 5e3 })
    return
  }
  clickFlag.value = true
  let body = {
    imgmodel: imgmodel.value,
    num: checkedNum.value,
    prompt: prompt.value
  }
  let { data,  error } = await postHttp("/imageapi", body, token.value)
  // console.log(211, data.value)

  if(error.value) {
    // console.log(444, error)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    clickFlag.value = false
    return
  }
  img_url.value = data.value.imgurl
}
const more = () => {
  clickFlag.value = false
  prompt.value = ''
  img_url.value = ''
}
</script>