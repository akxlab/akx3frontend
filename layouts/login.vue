<script setup lang="ts">


const props = defineProps<{connect: Function}>()

const agreeToFee = useState("agreefee", () => false);
const agreeToWallet =  useState("agreewallet", () => false);
const hidebanner =  useState("hideban", () => false);
const agreeFee = function(state:boolean) {
        agreeToFee.value = state;
      }
      const agreeWallet = function(state:boolean) {
        agreeToWallet.value = state;
      }

const identityDialog = useState("showIdentityDialog", () => false);

const isLoggedIn = useCookie<Boolean>('isLoggedIn');

   if(isLoggedIn.value == true) {
    navigateTo('/dashboard');
  }

useHead({
  title: "AKX3 Ecosystem DAPP"
})

</script>
<template>
    <v-app >
       
        <v-main>

<v-container fluid style="margin:0;padding:0">     

  <v-row no-gutters>
    <v-col cols="12" md="6" lg="5" xl="4" style="height:100vh;text-align:center" >
      <v-card  color="primary" height="100%" class="rounded-0" >
      <v-img src="https://www.akxipfs.com/ipfs/QmUo7nywxScoWnwoMekNxFPTaJmoKKaDNiqnVeiY4eJBBk" width="200" class="ml-auto mr-auto pt-12 mt-5" />
      <v-card-text>
       <v-row>
        <v-col cols="10" class="pa-10">
          <h1 class="title"> Start your journey <br />with AKX<sup>3</sup>.</h1>
          <p class="intro ">Welcome to AKX<sup>3</sup> ecosystem DAPP. <br/>This space will evolve continuously as we develop more features.</p>
        </v-col>
       </v-row>
      </v-card-text>
    </v-card>

    </v-col>
    <v-col cols="12" md="6" lg="7" xl="8" style="height:100vh;">
      <v-row>
        <v-col lg="10" class="ml-auto mr-auto pa-10">
          <v-card elevation="0" style="margin-top:25vh;" class="rounded-lg surface-gradient">

            <v-card-title class="pa-8">
              <h2 class="title">please login or signup</h2>
            </v-card-title>
        <v-card-text class="pa-8">
         <v-row>
          <v-col lg="12" >
           
          </v-col>
          <v-col lg="5" >
            <h3><strong>OPTION 1</strong> Create an on-chain identity (RECOMMENDED)</h3>
            <v-btn variant="flat" color="secondary" class="mt-3" @click="identityDialog = true">CREATE MY IDENTITY</v-btn>
            </v-col>
           <v-divider vertical class="mx-4"></v-divider>
              <v-col lg="5"  > <h3><strong>OPTION 2</strong> Already have an online identity or don't want one.</h3>
                <v-btn variant="flat"  color="primary" class="mt-3" @click="props.connect()">CONNECT WITH METAMASK</v-btn>
                
          </v-col>
       
          <v-col lg="6"  > </v-col>
         </v-row> 
  
        </v-card-text>
        <v-card-actions>
         
        </v-card-actions>
      </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-dialog v-model="identityDialog" class="pa-0" persistent>
  <v-card  class="pa-0 ma-auto" max-width="100%" width="50vw"  >
    <v-card-text class="pa-0">
      <v-alert type="warning" title="NETWORK FEES & PRIVACY AGREEMENT">
        <v-row class="mb-3">
          <v-col class="pt-10">You will need Polygon matics to create your identity. Approximately 0.01 matics is charged by the network for signing your identity. <v-btn variant="text" @click="hidebanner=false" prepend-icon="mdi-information">need help to get matics? click here</v-btn>
            <v-banner lines="two" class="rounded-lg mt-3" theme="light" v-show="!hidebanner">
   

    <v-banner-text>
     If you are new to the Polygon Network, we advise you to follow the small tutorial to know how to add the network to your metamask wallet and how to get Polygon Matics.
  
    </v-banner-text>

    <v-banner-actions>
      <v-btn @click="hidebanner = true">HIDE THIS</v-btn>
      <v-btn>SHOW ME!</v-btn>

    </v-banner-actions>
  </v-banner>
          </v-col>
        </v-row>
        <v-divider></v-divider>
       <v-row class="mt-3">
        <v-col>Tick the checkboxes below to continue
        <v-checkbox hide-details label="I agree that the Polygon Network will charge me to sign my identity." v-model="agreeToFee"></v-checkbox>
        <v-checkbox hide-details label="I agree to connect to the AKX3 network with my Metamask wallet." v-model="agreeToWallet"></v-checkbox></v-col>
       </v-row>
       <v-divider></v-divider>
       <v-row class="mt-3">
        <v-col cols="12" lg="6" >
          <v-btn variant="outlined"  @click="identityDialog = false" prepend-icon="mdi-close-circle-outline">CANCEL</v-btn>
        </v-col>
       
        <v-col cols="12" lg="6">
          <v-btn variant="outlined" :disabled="agreeToWallet == false || agreeToFee == false" append-icon="mdi-arrow-right" >CONTINUE</v-btn>
        </v-col>
      </v-row>
       
      </v-alert>
      
    </v-card-text>
   
  </v-card>
</v-dialog>
</v-container>

        </v-main>
       
    </v-app>
</template>
