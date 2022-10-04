import { ethers } from 'ethers'



export default function() {
    const isLoggedIn = useCookie<Boolean>('isLoggedIn');
      isLoggedIn.value = false; 

   
   const { detectChain, isNetwork, loadConnectedWallet, chainId, resetUser, connectUser } = useUser()
   const {     connection,
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
    addToken } = useWallet()

    
   const { address, balance, id, isAuthenticated, labzbalance, buyLabz } = useUser()
   
   let prov:any;
  
   const onAccountsChanged = async (accounts) => {
     resetUser()
     if (isNetwork.value)  loadConnectedWallet(prov)
   }
   const onChainChanged = (chain) => {
     chainId.value = chain
     if (isNetwork.value) loadConnectedWallet(prov)
     if (!isNetwork.value) resetUser()
   }
   const setListeners = (prov, bool) => {
     if (bool) {
       prov.on('accountsChanged', onAccountsChanged)
       prov.on('chainChanged', onChainChanged)
     } else {
       prov.removeListener('accountsChanged', onAccountsChanged)
   prov.removeListener('chainChanged', onChainChanged)
     }
   }

   onMounted(async () => {
   
       prov = await getProvider()
     
       await detectChain()
       if (isNetwork.value) {
         await loadConnectedWallet(prov)
    
       }
       setListeners(prov, true)
     
   })
   onUnmounted(() => {
     if (isMetamaskInstalled.value) setListeners(null, false)
   })



}