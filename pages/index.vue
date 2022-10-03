<script setup lang="ts">

const router = useRouter();
      const isLoggedIn = useCookie<Boolean>('isLoggedIn');
        if(isLoggedIn.value == true) {
            router.push('/dashboard')
        }
    definePageMeta({
        layout: "login"
    })
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>INDEX</h1>
                
            </v-col>
        </v-row>
    </v-container>
</template>
