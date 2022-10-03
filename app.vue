<script setup lang="ts">
import { createDOMCompilerError } from '@vue/compiler-dom';
import { routerKey } from 'vue-router';


   
   const config = useAppConfig();
   const { detectChain, isNetwork, loadConnectedWallet, chainId, resetUser, connectUser } = useUser()
   const { isMetamaskInstalled,   getProvider, addToken } = useWallet()
   const { address, balance, id, isAuthenticated, labzbalance, buyLabz } = useUser()
   
   
   const layout = useState('layout', () => "login")
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
       //  await loadContractState(getProvider())
         await loadConnectedWallet(prov)
         
        // await getLabzBalance();
       }
       setListeners(prov, true)
     
   })
   onUnmounted(() => {
     if (isMetamaskInstalled.value) setListeners(null, false)
   })


   let dialog = true;
   watch(() => isAuthenticated, () => dialog = false)
   const router = useRouter();

   watchEffect(() => {
      isAuthenticated.value == true ? router.push('/dashboard') : null;
   })


   
   
   
   </script>

<template>
 
 <NuxtLayout layout="login"  :connect="connectUser" :isAuth="isAuthenticated">
   <NuxtLoadingIndicator />
    <NuxtPage />
 </NuxtLayout>
</template>

<style lang="css">
   h1 {
      font-size: 3.5rem;
      line-height:4rem;
      text-align:left;
      font-family: sofia-pro-soft, sans-serif;
      font-weight:700;
      font-style:normal;
   }

   h3 {
      font-size: 1rem;
      line-height:1.5rem;
      text-align:left;
      font-family: sofia-pro-soft, sans-serif;
      font-weight:400;
      font-style:normal;
   }
</style>