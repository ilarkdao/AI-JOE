<template>
<div px-10 pt-5 pb-6>
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
            <td>GPT-3.5 Turbo</td>
            <td>0.01积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Google Gemini Flash 2.0</td>
            <td>0.003积分/token</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>01.AI Yi Large</td>
            <td>0.02积分/token</td>
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
            <td>Midjourney V6</td>
            <td>60积分/每张</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>DALL·E3</td>
            <td>150积分/每张</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Stable Diffusion XL 1.0</td>
            <td>70积分/每张</td>
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
// const token = useCookie('token')
// const user = useCookie('user')
// const balance = useCookie('balance')
</script>
