<template>
<div px-10 pt-5>
   <div text-center>
     <h3> 价格表 </h3>
   </div>
   <div textBox>
    <n-table :bordered="false" :single-line="false">
        <tbody>
          <tr>
            <td>积分价格</td>
            <td>￥1 = 400积分</td>
          </tr>
<<<<<<< HEAD
          <!-- <tr>
            <td> </td>
            <td>1 AIJoe(Base) = 实时价格</td>
          </tr>
          <tr>
            <td> </td>
            <td>1 Slime(Base) = 实时价格</td>
          </tr> 
          <tr>
            <td> </td>
            <td>1 USDT(Base/Polygon) = 2860积分</td>
          </tr> -->
=======
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
        </tbody>
      </n-table>
   </div>
   <div textBox>
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>语言模型</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr>
<<<<<<< HEAD
            <td>DeepSeek R1 Distill Qwen 32B</td>
            <td>0.003积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>OpenAI o1-mini</td>
            <td>0.07积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>GPT-4o</td>
            <td>0.08积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>GPT-4o-mini</td>
            <td>0.005积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
=======
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
            <td>GPT-3.5 Turbo</td>
            <td>0.01积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
<<<<<<< HEAD
            <td>Google Gemini Flash 2.0</td>
            <td>0.003积分/token</td>
=======
            <td>GPT-4</td>
            <td>0.3积分/token</td>
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
          </tr>
        </tbody>
        <tbody>
          <tr>
<<<<<<< HEAD
            <td>01.AI Yi Large</td>
            <td>0.02积分/token</td>
=======
            <td>Claude v2</td>
            <td>0.18积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Code Llama Instruct</td>
            <td>0.0025积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Embedding Ada v2</td>
            <td>0.0005积分/token</td>
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
          </tr>
        </tbody>
      </n-table>
   </div>
   <div textBox>
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>图像模型</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stable Diffusion XL 1.0</td>
            <td>90积分/每张</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Dall E2</td>
            <td>85积分/每张</td>
          </tr>
        </tbody>
      </n-table>
   </div>
</div>
</template>

<script setup>
definePageMeta({
  middleware:["auth"]
})
const token = useCookie('token')
const user = useCookie('user')
const balance = useCookie('balance')
</script>
