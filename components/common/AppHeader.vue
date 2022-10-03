<script setup lang="ts">
   
  const props = defineProps<{userProfile: {address: any, balance: any, labz: any, identity: any}}>();
  const userProfile = props.userProfile;
 

    
</script><template>
 
        <v-app-bar app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>AKX3 DAPP</v-toolbar-title>
            
            <div style="font-size:0.8rem" class="pr-2"><strong>MY MATICS:</strong> <span style="color:lightgreen; font-size:1rem">{{userProfile.balance.value}}</span> Matics</div>
            <v-divider vertical class="mx-2"></v-divider>
            <div style="font-size:0.8rem" class="pl-2"><strong>MY TOKENS:</strong> <span style="color:lightgreen; font-size:1rem">{{userProfile.labz.value}}</span> AKX</div>
            <v-spacer></v-spacer>
            <v-menu  origin="auto" min-width="300" max-width="1000">
    <template v-slot:activator="{ props }">
                <v-btn   v-bind="props" elevation="0" size="large"
        
        plain class="pa-0 px-1">
        <div style="color:#fff;font-size:0.7rem" class="ml-2">account</div>
        <v-avatar size="55" class="rounded-circle" color="white">
          <img src="/avatars/avatar1.png" width="35" alt="tmp" />
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