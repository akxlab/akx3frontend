<script setup lang="ts">
   
  const props = defineProps<{userProfile: {address: any, balance: any, labz: any, identity: any}}>();
  const userProfile = props.userProfile;
  const data = await useFetch('/api/pricing', {method:'get'})
  // @ts-ignore
  console.log(data.data);
 const akxUsd = data.data.value.finance.USDValuePerAKX;
    
</script><template>
 
        <v-app-bar app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title> <v-img src="https://www.akxipfs.com/ipfs/QmUo7nywxScoWnwoMekNxFPTaJmoKKaDNiqnVeiY4eJBBk" width="60" /></v-toolbar-title>
            
            <div style="font-size:0.8rem" class="pr-2"><strong>MY MATICS:</strong> <span style="color:#009fe3; font-size:1rem">{{userProfile.balance.value}}</span> Matics</div>
            <v-divider vertical class="mx-2"></v-divider>
            <div style="font-size:0.8rem" class="pl-2"><strong>MY TOKENS:</strong> <span style="color:#009fe3; font-size:1rem">{{userProfile.labz.value}}</span> AKX</div>
            <v-divider vertical class="mx-2"></v-divider>
            <div style="font-size:0.8rem" class="pl-2"><strong>AKX / USD: <span style="color:#009fe3; font-size:0.7rem">{{akxUsd}}</span></strong></div>
            <v-spacer></v-spacer>
            <v-menu  origin="auto" min-width="300" max-width="1000">
    <template v-slot:activator="{ props }">
        
                <v-btn   v-bind="props" elevation="0" size="large"
        
        plain class="pa-0 px-1">
     
        <v-avatar size="45" color="white" style="background-color:#347ed4;">
          <img src="/avatars/avatar1.png" width="30" alt="tmp" />
        </v-avatar>
        
    </v-btn></template>
    <v-list class="pa-6 mt-3" elevation="10" rounded="lg" width="300">
   
      <v-btn block color="secondary" variant="tonal" class="mt-4 py-4"
        >Update Name</v-btn>
      <v-btn block color="secondary" variant="tonal" class="mt-4 py-4"
        >Change avatar</v-btn>
      <v-btn block color="secondary" variant="tonal" class="mt-4 py-4"
        >Logout</v-btn>
    </v-list>
</v-menu>
         
        </v-app-bar>
  
</template>