<script setup lang="ts">
import AppHeader from '~~/components/common/AppHeader.vue';
import LoginComponent from '~~/components/auth/LoginComponent.vue';
import LoginComponentVue from '~~/components/auth/LoginComponent.vue';


const { detectChain, isNetwork, loadConnectedWallet, chainId, resetUser, connectUser } = useUser()
const { isMetamaskInstalled,   getProvider, addToken } = useWallet()
const { address, balance, id, isAuthenticated, labzbalance, buyLabz } = useUser()


let prov:any;
let amountMatics;

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

const logout = async () => {
  const isLoggedIn = useCookie<Boolean>('isLoggedIn');
    resetUser();
    isLoggedIn.value = false;
    navigateTo('/');
}

const upj ={
  address: address,
  balance: balance,
  labz: labzbalance,
  identity: id
};
const userProfile = useCookie<any>("userProfile");
userProfile.value = upj;

</script>
<template>
    <v-app theme="dark">
        <AppHeader :userProfile="upj" />
        <v-main>

<v-container fluid>     
      
      
      <div><v-btn @click="buyLabz(amountMatics)">buy labz</v-btn> <v-text-field label="amount of matic" type="numeric" v-model="amountMatics"></v-text-field></div>
      <div><v-btn @click="addToken">add token to metamask</v-btn>
  </div>
    </v-container>  
      <v-container>    <v-row>
        <v-col>
            <slot /> 
        </v-col>
      </v-row>  </v-container>
        </v-main>
       
    </v-app>
</template>
<script lang="ts">
  export default {
   
    data() {
      return {
        amountMatics: 0
      }
    },
   
  }
</script>
