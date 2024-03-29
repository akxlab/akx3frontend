import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import Vue from "vue";
const LABZ_ADDRESS = '0xEeF80FC4Cb371F9e00E71EC80ea7D49e004Edb9F';
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

  const addToken = async () => {
    connection = await getProvider();
    await connection.provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: LABZ_ADDRESS,
          symbol: 'LABZ',
          decimals: 18,
          image: 'https://www.akxipfs.com/ipfs/QmUo7nywxScoWnwoMekNxFPTaJmoKKaDNiqnVeiY4eJBBk'
        }
      }
    })
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
    detectEthereumProvider,
    addToken
  }
}
