<template>
    <v-card theme="light">
        <v-card-title>
            Welcome to akx3 dapp!
        </v-card-title>
        <v-card-subtitle>
            <p>Congratulation you already have metamask installed! Now it's time to connect it to our DAPP!</p>
        </v-card-subtitle>
        <v-card-text>
            <div v-if="!isConnected">
                <v-btn v-on:click="connectFunc">LINK YOUR METAMASK WALLET</v-btn>
            </div>
           <div v-if="!isAuthenticated && isConnected == true"><h3>
                First let's create an account so its easier for you to connect next time as well as secure your account more.
            </h3>
            <v-form>
                           <v-text-field
                              prepend-icon="person"
                              name="login"
                              label="Pick a username"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form></div> 
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    export default {
        name: "login",
        props: {
            isAuthenticated: Boolean,
            isConnected: Boolean,
            connectFunc: Function,
        },
        computed: {
            
        },
        data() {
            return {
                showCreateAccount:false
            }
        }
    }
</script>