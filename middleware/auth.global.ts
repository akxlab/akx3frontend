export default defineNuxtRouteMiddleware((to) => {

    const { $isAuthenticated } = useNuxtApp();
   if(!$isAuthenticated?.value) {
    if(to.path != "/") {
    return navigateTo('/')
    }
   }
   
})