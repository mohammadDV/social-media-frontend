
<template>
    <div>
        <header-component/>
        <router-view></router-view>
        <footer-component />
    </div>
</template>

<script setup>

import { computed, watch } from 'vue'
import HeaderComponent from '@/components/site/include/HeaderComponent'
import FooterComponent from '@/components/site/include/FooterComponent'
import { useRoute } from 'vue-router';

import { useI18n } from "vue-i18n"; 
import { useHead } from '@unhead/vue'

const route = useRoute();
    

const { t } = useI18n(); 
    // const router = useRouter();

useHead({
    meta: [
        {
            property: `og:site_name`,
            content: t('site.Website name')
        },
        {
            property: `og:url`,
            content: computed(() => window.location.href)
        },
    ]
})


watch(() => route.params.id, () => {
    if (route.params.id) {
        // window.document.title = "test"
    } 
  });

</script>





