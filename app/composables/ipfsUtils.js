import {create} from 'ipfs-http-client'
import { Buffer } from 'buffer'


export const readFile = (file) => {
  if (process.client){
    return new Promise(resolve => {
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (event) => {
        resolve(Buffer.from(event.target.result))
      }
    })
  }
}

export const upImage = async(file) => {
  if (process.client){
    const ipfs = create({ host: 'ipfs.ilark.io', port: '9001', protocol: 'https' })
    const ipfs_host = "https://ipfs.ilark.io/ipfs/"
    let content = await readFile(file)
    let res = await ipfs.add(content)
    // console.log(88, res)
    // console.log(998, "url", ipfs_host+res.path)
    return ipfs_host+res.path
  }
}