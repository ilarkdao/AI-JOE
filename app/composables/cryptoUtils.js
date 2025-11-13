//Base Polygon网络设置

export const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address recipient, uint256 amount) external returns (bool)"
]

//Base
// export const aiJoeCon = '0x4DA24647066df2d68431E63f51871c46D42C9511'
// export const slimeCon = '0x68503A15efD0D2F81D185a07d60Ed9Ac2a66B59e'
export const usdtbaseCon = '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2'

//Polygon
// export const larkAddress = '0x4cE8485608F78921Fbc0F96e63c0566B1b176Db0' 
export const usdtAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' 
export const toB = "0x5278c6A7B0E805c15a8FEe34ddEC27195D5E3138"  //scisan


export const formatAddr = (data) =>{
    return data.substring(0, 6) + '...' + data.substring(38)
}