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
            <td>gpt 3.5 turbo</td>
            <td>1积分/100tokens</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Embedding Ada v2</td>
            <td>1积分/500tokens</td>
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
            <td>Dall E2</td>
            <td>65积分/每张</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Stable Diffusion 768 v2</td>
            <td>40积分/每张</td>
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
