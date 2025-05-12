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
      
      <!-- 生成数量 -->
      <div flex mb-4 h-6 items-center justify-between v-if="imgmodel == 'stable'"> 
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
        <!-- <div text-rose mb-2 v-if="imgmodel == 'dall'">DALL·E3模型目前只能一次生成一张！</div> -->
        <div text-rose mb-2 v-if="imgmodel != 'dall'&&superior == 'Selfconf'">请使用英文关键词！</div>
        
        <n-input
          v-model:value="prompt"
          type="textarea"
          placeholder="输入关键词句以生成图像......"
        />

        <!-- 上传图片 -->
        <div v-if="imgmodel == 'midjourney'&&superior == 'Selfconf'">
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
        </div>

        <div mt-2>
        <n-button block items-center type="primary" @click="onSubmit">
          生成图像
        </n-button></div>
                 
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">Midjourney生成图片的时间约1分钟左右。</div>
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">如果超时，可直接到 用户中心 -> 
          <nuxt-link to="/user/images"><n-button quaternary type="primary" size="small">图片库</n-button> </nuxt-link>中查看</div>
        <div mt-4 mb-2 v-if="imgmodel == 'midjourney'">
          <p><a target="_blank" href="https://doc.ilark.io/Midjourney_prompt.html">-> 关键词技巧参考</a></p> 
        </div>
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
// console.log(123, token.value, 566, token.value == null)
useHead({
  title:"图像"
})
// 图片模型
const imgmodel = ref("midjourney")
const options = [
  {
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
  },
  {
    value: "Selfconf",
    label: "自定义关键词"
  }]

// 图片数量
const checkedNum = ref('1')
const handleChange = (e) => {
  console.log(e.target.value)
  checkedNum.value = e.target.value
}

const clickFlag = ref(false)
const prompt = ref('')
const img_url = ref(null)

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
  // prompt.value += ref_img+' '
  prompt.value = ref_img+' '+prompt.value
}

const gpt4Superior = async () => {
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  if(prompt.value == ''){
    message.error("关键词不能为空！", { duration: 5e3 })
    return
  }
  let role = "我想让你担任Midjourney人工智能程序的提示生成器，它是一个绘画AI。你的任务是提供详细而有创意的描述，激发人工智能生成独特而有趣的图像。请记住，它只能理解具象的描述而非抽象的概念，同时根据你对绘画AI的理解，比如它可能的训练模型、自然语言处理方式等方面，进行翻译优化。由于我的描述可能会很散乱，不连贯，你需要综合考虑这些问题，然后对翻译后的英文内容再次优化或重组，从而使绘画AI更能清楚我在说什么。请严格按照此条规则进行翻译，也只输出翻译后的英文内容。以下是第一条提示："
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          model: "gpt-4-1106-preview",
          query: [{role: "user", content: role+prompt.value}],
          temperature: 0.2
      })
  }

  const response = await fetch(baseURL+'/gpt4', dataObj) 
  if (response.ok) {
      let content = await response.text() 
      // console.log(236, "content", content)
      let str = content.replace("\"","").replace("\"","") //去除首尾的双引号
      // console.log(566, "str", str)
      return str
  } else {
      const err = await response.text()
      message.error("错误！\n"+err, { duration: 5e3 })
      return ''
  }
}

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
  if(superior.value == "GPT4"){
    prompt.value = await gpt4Superior()
  }

  // console.log(999, "prompt.value", prompt.value)
  // return

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
}
</script>