<script setup lang="ts">
import AppHeader from '~~/components/common/AppHeader.vue';
import LoginComponent from '~~/components/auth/LoginComponent.vue';


const { detectChain, isNetwork, loadConnectedWallet, chainId, resetUser, connectUser } = useUser()
const { isMetamaskInstalled,   getProvider, addToken } = useWallet()
const { address, balance, id, isAuthenticated, labzbalance, buyLabz } = useUser()


let prov:any;
let amountMatics = 0;

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
   // prov.removeListener('accountsChanged', onAccountsChanged)
   // prov.removeListener('chainChanged', onChainChanged)
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

</script>
<template>
    <v-app theme="dark">
        <AppHeader />
        <v-main>

<v-container fluid>     
    <div v-if="!isAuthenticated && isNetwork">
        <v-dialog v-model="dialog" persistent><LoginComponent :is-authenticated="isAuthenticated" :is-connected="isAuthenticated" :connect-func="connectUser" /></v-dialog>
    </div>

   
      <div>Is network: {{ isNetwork }}</div>
      <div>Is connected: {{ isAuthenticated }}</div>
      <div>Address: {{ address ?? 'null' }}</div>
      <div>balance: {{ balance ?? 'null' }} matics</div>
      <div>identity: {{ id ?? 'null' }}</div>
      <div>labz balance: {{ labzbalance ?? 'null' }} LABZ</div>
      <div><v-btn @click="buyLabz(amountMatics)">buy labz</v-btn> <v-text-field label="amount of matic" type="numeric" v-model="amountMatics" ></v-text-field></div>
      <div><v-btn @click="addToken">add token to metamask</v-btn></div>
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
