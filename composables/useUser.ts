import { ethers } from 'ethers'
import useUtils from './useUtils'
import useWallet from './useWallet'
import {LABZABI, SALEABI} from "../abis/PrivateSale";
import {ABI} from '../abis/IdentityRegistry'
const GOERLI_ADDRESS = "0x399AE34B8B0AE6e1Abc25d73EFC71cD6B781F8a6";
const LABZ_ADDRESS = '0xEeF80FC4Cb371F9e00E71EC80ea7D49e004Edb9F';
const SALE_ADDRESS = '0xed904D447d2795cA4b264B1A55cde16634C563D7';

export default function () {

  const config = useRuntimeConfig()
  const { getChainId, getCurrentUser,  getBalance, requestAccounts, getSigner } = useWallet()
  const { sliceAddress } = useUtils()


  const address = useState('address', () => null)
  const chainId = useState('chainId', () => null)
  const balance = useState('balance', () => null)
  const id = useState('identity', () => null);
  const labzbalance = useState('labzbalance', () => null);
  const saleContract = useState('saleContract', () => null);

  const ensName = useState('ensName', () => null)
  const ensAvatar = useState('ensAvatar', () => null)

  const ownedTokens = useState('ownedTokens', () => [])

  const username = computed(() => ensName.value || sliceAddress(address.value))

  const isNetwork = computed(() => config.NETWORK_ID === chainId.value)
  const isAuthenticated = computed(() => Boolean(address.value))

  const detectChain = async () => chainId.value = await getChainId()

  const formatBalance = (balance) => {
    if (!parseInt(balance)) return 0
    return parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
  }

 
  const userLoading = ref(false)

  const resetUser = () => {
    address.value = null
    balance.value = null
    ensName.value = null
    ensAvatar.value = null
    ownedTokens.value = []
  }


  const loadUserData = async (_addy) => {
  
    try {
      userLoading.value = true;
      if (_addy.length) {
        address.value = _addy[0]
        //ensName.value = await lookupAddress(_addy[0])
        balance.value = await getBalance(_addy[0]).then(res => formatBalance(res))
      
      //  if (ensName.value) ensAvatar.value = await getAvatar(ensName.value)
      } else {
        resetUser()
      }
    } catch (error) {
      console.log(error)
    } finally {
      const sig = getSigner();
      const contractl = new ethers.Contract(LABZ_ADDRESS, LABZABI, sig);
      contractl.attach(LABZ_ADDRESS);
      labzbalance.value = formatBalance(await getLabzBalance(contractl,_addy[0]));
       saleContract.value = new ethers.Contract(SALE_ADDRESS, SALEABI, sig);
      const contract = new ethers.Contract(`${GOERLI_ADDRESS}`, ABI, sig);
     contract.attach(`${GOERLI_ADDRESS}`);
     id.value = await contract.getIdentity(_addy[0]);
     if(id.value === null || id.value == '0x0000000000000000000000000000000000000000') {
     const tx = await contract.createIdentity(_addy[0], _addy[0]);
     await tx.wait();
     id.value = await contract.getIdentity(_addy[0]);
     }
     
     userLoading.value = false
    
   
      
    }
  }



  const getLabzBalance = async (contract, addr) => {
      return await contract.balanceOf(addr);
      
  }

  const buyLabz = async (amountMatics) => {
    if(typeof saleContract !== 'undefined')  {
    
    
      await saleContract.value.buy({value: ethers.utils.parseEther(amountMatics)});
    }
  }

  const loadConnectedWallet = async (prov:any) => {
    try {
      userLoading.value = true
      await getCurrentUser()
        .then(res => loadUserData(res))
    } catch (error) {
      console.log(error)
    } finally {
      userLoading.value = false
    }
  }

  const connectUser = async (prov:any) => {
    try {
      userLoading.value = true
      await requestAccounts()
        .then(res => loadUserData(res))
    } catch (error) {
      console.log(error)
    } finally {
      userLoading.value = false
    }
  }

  return {
    address,
    chainId,
    balance,
    ensAvatar,
    ensName,
    ownedTokens,
    username,
    isNetwork,
    isAuthenticated,
    detectChain,
    userLoading,
    resetUser,
    loadConnectedWallet,
    connectUser,
    loadUserData,
    id,
    labzbalance,
    buyLabz
  }

}