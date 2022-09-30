import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import Vue from "vue";

export default function() {


  let connection
  let signer
  let pro
  
  const getProvider = async () => {
    if(typeof window !== 'undefined') {pro = detectEthereumProvider({timeout:10000})
    connection = new ethers.providers.Web3Provider(await pro)
  signer = connection.getSigner()
  return connection;
    }
    

  }
  const provider = (async () => await getProvider())();
 
  const isMetamaskInstalled = computed(() => Boolean(provider))
 

  const connectProvider = (_provider) => {
    connection = new ethers.providers.Web3Provider(_provider)
    signer = connection.getSigner()
  }



  const signMessage = async (message) => await signer.signMessage(message).then(res => console.log(res))

  const requestAccounts = async () => await connection.send('eth_requestAccounts', [])

  const getCurrentUser = async () => await connection.send('eth_accounts', [])

  const getBalance = async (address) => await connection.getBalance(address)
  
  const lookupAddress = async (address) => await connection.lookupAddress(address)

  const getAvatar = async (ensName) => await connection.getAvatar(ensName)

  const request = async (payload) => {
   
    await getProvider();
     await pro.request(payload)
    
  }
  const switchNetwork = async () => {
    connection = await getProvider();
    await connection.provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: useRuntimeConfig().public.NETWORK_ID }] })
  }

  const getChainId = async () => {
    connection = await getProvider();
   
    return connection.provider.chainId;
  };



  const getSigner = () => signer



  return {
    connection,
    provider,
    signer,
    connectProvider,
    signMessage,
    requestAccounts,
    getCurrentUser,
    getBalance,
    lookupAddress,
    getAvatar,
    request,
    switchNetwork,
    getChainId,
    getProvider,
    getSigner,
    isMetamaskInstalled,
    detectEthereumProvider
  }
}
