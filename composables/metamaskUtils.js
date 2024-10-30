import { ethers } from 'ethers'

let signer = null
let provider

export const metaMaskConn = async () => {
    if (process.client){
        // console.log(66, "client")
        if (window.ethereum == null) {
            // If MetaMask is not installed, we use the default provider,
            // which is backed by a variety of third-party services (such
            // as INFURA). They do not have private keys installed so are
            // only have read-only access
            console.log("MetaMask not installed; using read-only defaults")
            alert("没有安装MetaMask！\n请安装！ https://metamask.io")
            provider = ethers.getDefaultProvider()
            return null
        } else {
            // Connect to the MetaMask EIP-1193 object. This is a standard
            // protocol that allows Ethers access to make all read-only
            // requests through MetaMask.
            try {
                // 请求用户账号授权
                provider = new ethers.BrowserProvider(window.ethereum)
                const network = await provider.getNetwork()
                const chainId = network.chainId
                // console.log(566, "chainId", chainId)  //main: 137  test: 80001
                if(chainId != 137){
                    // console.log(666, "chainId", chainId)
                    // alert("请切换到Polygon Mumbai测试网络！")
                    alert("请切换到Polygon网络！")
                    return null
                }
                signer = await provider.getSigner()
                // console.log(666, "signer", signer, signer.address)
                return signer
            } catch (error) {
                // 用户拒绝了访问
                // console.error("4444, 用户拒绝账号授权")
                alert("请先连接MetaMask钱包才能使用！")
                return null
            }
        }

        
    }
}



