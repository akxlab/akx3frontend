<script setup lang="ts">
import AppHeader from '~~/components/common/AppHeader.vue';
import LoginComponent from '~~/components/auth/LoginComponent.vue';


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
       
        <v-main>

<v-container fluid style="margin:0;padding:0">     

  <v-row no-gutters>
    <v-col lg="4" style="height:100vh;text-align:center" >
      <v-card theme="light" color="#22519c" height="100vh">
      <v-img src="https://www.akxipfs.com/ipfs/QmUo7nywxScoWnwoMekNxFPTaJmoKKaDNiqnVeiY4eJBBk" width="200" class="ml-auto mr-auto pt-12 mt-5" />
      <v-card-text>
       <v-row>
        <v-col cols="10">
          <h1 class="title pt-5 pl-10"> Start your journey <br />with AKX<sup>3</sup>.</h1>
          <p class="intro pt-5 pl-10">Welcome to AKX<sup>3</sup> ecosystem DAPP. <br/>This space will evolve continuously as we develop more features.</p>
        </v-col>
       </v-row>
      </v-card-text>
    </v-card>

    </v-col>
    <v-col lg="8" style="height:100vh;">
      <v-row>
        <v-col lg="10" class="ml-auto mr-auto">
          <v-card elevation="0" style="margin-top:25%;">
        <v-card-text>
         <v-row>
          <v-col lg="12"  class="pa-8">
            <h2 class="title">please login or signup</h2>
          </v-col>
          <v-col lg="6" class="pa-8">
            <h3>OPTION 1 Create an on-chain identity (RECOMMENDED)</h3>
            <p class="note">* a small 0.01 matics fee will be charged for signing your identity<br /> <a href="#">click here to know what is it</a> <br /></p>
           
            </v-col>
           
              <v-col lg="6"  class="pa-8"> <h3>OPTION 2 Already have an online identity <br />or don't want one.</h3>
           
          </v-col>
          <v-col lg="6"  class="pa-8"> <v-btn size="large" class="mt-4" color="secondary">CONNECT AND CREATE MY IDENTITY</v-btn></v-col>
          <v-col lg="6"  class="pa-8"> <v-btn size="large" class="mt-4" color="primary">CONNECT WITH METAMASK</v-btn></v-col>
         </v-row> 
  
        </v-card-text>
        <v-card-actions>
         
        </v-card-actions>
      </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</v-container>
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
<style>
   @import url("https://use.typekit.net/tie2ewy.css");

html, body {
  font-family: sofia-pro-soft, sans-serif !important;
}

  h1.title, .v-card-title {
    color:white;
    font-size: 3rem;
    text-align:left;
    line-height:4rem;
    margin-top:15%;
    font-family: sofia-pro, sans-serif !important;

font-weight: 600;

font-style: normal;
 
  }

  h2.title {
    font-size: 2rem;
    line-height:2.5rem;
    text-transform:uppercase;
    font-family: sofia-pro, sans-serif !important;
  }

  h3 {
    font-size: 1.2rem;
    line-height:2rem;
    font-family: sofia-pro, sans-serif !important;
  }

  p.note {
    font-size:0.8rem;
    line-height:2rem;

  }

  p.intro {
    font-family: sofia-pro-soft, sans-serif !important;

font-weight: 400;

font-style: normal;
font-size:1.5rem;
text-align:left;
color:white;
line-height:2rem;
  }
</style>
