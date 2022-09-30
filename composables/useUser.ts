import { ethers } from 'ethers'
import useUtils from './useUtils'
import useWallet from './useWallet'
import {ABI} from '../abis/IdentityRegistry'
const GOERLI_ADDRESS = "0x816bdcec15fca5d8e309f985a65e62a74fbe184b";

export default function () {

  const config = useRuntimeConfig()
  const { getChainId, getCurrentUser,  getBalance, requestAccounts, getSigner } = useWallet()
  const { sliceAddress } = useUtils()

  const address = useState('address', () => null)
  const chainId = useState('chainId', () => null)
  const balance = useState('balance', () => null)
  const id = useState('identity', () => null);

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

  const contract = new ethers.Contract(`${GOERLI_ADDRESS}`, ABI, getSigner());
  contract.attach(`${GOERLI_ADDRESS}`);

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
      if (_addy.length) {
        address.value = _addy[0]
        //ensName.value = await lookupAddress(_addy[0])
        balance.value = await getBalance(_addy[0]).then(res => formatBalance(res))
        await contract.createIdentity(_addy[0], _addy[0]);
        id.value = await contract.getIdentity(_addy[0]);

      //  if (ensName.value) ensAvatar.value = await getAvatar(ensName.value)
      } else {
        resetUser()
      }
    } catch (error) {
      console.log(error)
    } finally {
      // const sig = getSigner()
      // connectNftContract(sig)
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
    loadUserData
  }

}