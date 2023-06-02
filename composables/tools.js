export const sleep = async() => {
  return new Promise(resolve => {
      // console.log(1, "start")
      setTimeout(resolve, 2000)  //2秒
      // console.log(2, "end")
  })
}

export const formatData = (value, digit = 2) => {
  const str =
      digit != null && digit >= 0
          ? Number(value)
              .toFixed(digit)
              .toString()
          : value.toString()
  let integer = str
  let fraction = ''
  if (str.includes('.')) {
    integer = str.split('.')[0]
    fraction = '.' + str.split('.')[1]
  }
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fraction
}

export const TimesToLocal = (date) => {
  let date1 = new Date(date)
  return date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toLocaleTimeString()
}