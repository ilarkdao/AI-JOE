const Img_url = "https://img.ilark.io/uploadimg"

export const upImage = async(file) => {
  if (process.client){
    let formData = new FormData()
    formData.append('file', file)
    const option = {
      method: "POST",
      headers: { 'Imgkey': 'IMG-EI98juxck256.jhurt#69vglk#fd' },  
      body: formData
    }
    const { data, pending, error, refresh } =  await useFetch(Img_url, option)
    if(data.value){
      // console.log(688, data.value.img_url)
      return data.value.img_url
    }  
  }
} 