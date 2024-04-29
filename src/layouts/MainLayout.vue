
<template>
    <div>
        <header-component/>
        <router-view></router-view>
        <footer-component />
    </div>
</template>

<script setup>

import { watch } from 'vue'
import HeaderComponent from '@/components/site/include/HeaderComponent'
import FooterComponent from '@/components/site/include/FooterComponent'
import { useRoute } from 'vue-router';
    const route = useRoute();
    // const router = useRouter();


watch(() => route.params.id, () => {
    if (route.params.id) {
        console.log("xaskxmkamxkm------");
        console.log(route);
        window.document.title = "test"
    } 
  });

</script>





