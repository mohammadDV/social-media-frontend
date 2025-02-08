
<template>
    <div>
        <GlobalLoading />
        <HeaderVideoComponent/>
        <router-view></router-view>
        <FooterComponent />
    </div>
</template>

<script setup>

import { computed, watch } from 'vue'
import GlobalLoading from '@/components/plugins/GlobalLoading.vue'
import HeaderVideoComponent from '@/components/site/include/HeaderVideoComponent'
import FooterComponent from '@/components/site/include/FooterComponent'
import { useRoute } from 'vue-router';

import { useI18n } from "vue-i18n"; 
import { useHead } from '@unhead/vue'

const route = useRoute();
const { t } = useI18n(); 

useHead({
    link: [
        {
          rel: 'canonical',
          href: computed(() => window.location.href)
        }
    ],
    meta: [
        {
            property: `og:site_name`,
            content: t('site.Website name')
        },
        {
            property: `og:type`,
            content: 'website'
        },
        {
            property: `og:locale`,
            content: 'fa_IR'
        },
        {
            property: `og:url`,
            content: computed(() => window.location.href)
        },
        {
            property: `og:image`,
            content: 'https://cdn.varzeshpod.com/uploads/images/default/user-1/2024/09/13/1gmbvPupCcYelTwe8blMh3239k56ERG0gAistTF6.jpg'
        },
        {
            name: `twitter:site`,
            content: t('site.Website name')
        },
        {
            name: `twitter:card`,
            content: 'summary'
        },
        {
            name: `twitter:image:src`,
            content: 'https://cdn.varzeshpod.com/uploads/images/default/user-1/2024/09/13/1gmbvPupCcYelTwe8blMh3239k56ERG0gAistTF6.jpg'
        },
        {
            name: `robots`,
            content: 'max-image-preview:large'
        },
        {
            name: `twitter:url`,
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





