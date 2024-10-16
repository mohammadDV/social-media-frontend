<script setup>

    
  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';

  import { useRoute } from 'vue-router';
//   import userImage from '@/components/plugins/UserImage.vue';
  import Dropdown from '@/components/plugins/dropdown/DropDown.vue';
  import DropDownMainSearch from '@/components/plugins/dropdown/DropDownMainSearch.vue';

  import { useI18n } from "vue-i18n";

  import Intercom from '@intercom/messenger-js-sdk';

  

  const { t } = useI18n();
  const route = useRoute();
  const accountMenu = ref( [
    {
        title: t('site.Profile'),
        url: '/profile',
        icon: 'account_circle',
    },
    {
        title: t('site.Logout'),
        url: '/logout',
        icon: 'logout'
    }
  ]
  );
  const parentSelectedOption = ref(null);
  const authStore = useAuthStore();
  const categories = ref([]);
  const pages = ref([]);
  const isMainPage = ref(true);

if (authStore.isAuthenticated) {
    Intercom({
        app_id: "xluw35fe",
        user_id: authStore.user.id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
        user_hash: authStore.user.intercom, // IMPORTANT: Replace this with the HMAC code you generated on your server
    });
}

const search = ref('');
const isOpen = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
}

const closeMenu = () => {
    isOpen.value = false;
}

const getActiveCategory = () => {
    useApi().get('/api/active-categories')
        .then((response) => {
            categories.value = response.data;
        })
}
const getActivePages = () => {
    useApi().get('/api/pages')
        .then((response) => {
            pages.value = response.data;
        })
}

const isActiveRoute = (id, title) => {

    if (route.params.id === String(id) && route.params.title === title) {
        isMainPage.value = false;
        return true;
    }

    if (!isMainPage.value && !route.params.id && !route.params.title) {
        isMainPage.value = true;
    }

    return false;
}
  
onMounted(() => {

    search.value = route?.query?.q;

    getActiveCategory();
    getActivePages();
  });

</script>

<template>
    <div class="relative w-full flex h-[80px] bg-vt-gradient mb-[130px]">
        <div class="flex-start">
            <template v-if="authStore.isAuthenticated">
                <div class="py-[7px] px-3">
                    <Dropdown
                    menuClass="min-w-[170px]"
                    icon="person"
                    color="primary"
                    :name="authStore?.user?.nickname"
                    :options="accountMenu"
                    v-model="parentSelectedOption"/>
                </div>
            </template>
            <template v-else>
                <div class="flex button-type">
                    <div class="nav-item mx-[14px] my-[6px] ">
                        <router-link to="/login" title="$t('site.Login')" class="text-white">
                            <button class="vt-btn-tit main-gradient rounded-[5px] py-[5px] px-[10px] hover:text-[#ff7322] ">
                                <span class="material-icons text-accent ml-1"> person </span>
                                <span>{{ $t('site.Login') }}</span>
                            </button>
                        </router-link>
                    </div>
                    <div class="nav-item my-[6px]">
                        <router-link to="/register" class="text-white ">
                            <button class="vt-btn-tit main-gradient rounded-[5px] py-[5px] px-[10px] hover:text-[#ff7322] ">
                                <span class="material-icons text-accent ml-1"> group_add </span>
                                <span>{{ $t('site.Register to site') }}</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </template>
        </div>
        <div class="flex-grow text-left">
            <div class="hidden md:flex flex-lg-row-reverse gap-3 p-3">
                <div class="" v-for="(page, index) in pages" :key="index">
                    <router-link class="text-white text-decoration-none" :to="`/page/${page.slug}`">{{ page.title }}</router-link>
                </div>
            </div>

            <button @click="toggleMenu" class="btn focus:outline-none mt-2 ml-3 vt-btn-tit" id="mobileMenuCaller">
                <span class="material-icons text-accent"> menu </span>
            </button>

            <div v-if="isOpen" class="fixed top-0 left-0 w-full h-screen bg-gray-800 z-10">
                <button @click="closeMenu" class="md:hidden float-right p-3 focus:outline-none">
                    <span v-if="isOpen" class="block w-8 h-1 bg-white my-1 transform rotate-45 translate-y-2"></span>
                    <span v-if="isOpen" class="block w-8 h-1 bg-white my-1 opacity-0"></span>
                    <span v-if="isOpen" class="block w-8 h-1 bg-white my-1 transform -rotate-45 -translate-y-2"></span>
                </button>
                <ul class="flex flex-col items-center justify-center h-full space-y-6">
                    <li>
                        <router-link class="text-white text-xl text-decoration-none" @click="toggleMenu" :title="$t('site.Main page')" to="/">{{ $t('site.Main page') }}</router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated">
                        <router-link class="text-white text-xl text-decoration-none" @click="toggleMenu" :title="$t('site.Profile')" to="/profile">{{ $t('site.Profile') }}</router-link>
                    </li>
                    <li v-for="(category,index) in categories" :key="index">
                        <router-link class="text-white text-xl text-decoration-none" @click="toggleMenu" :to="`/category/${category.id}/${category.slug}`" :title="category.title">
                            {{ category.title }}
                        </router-link>
                    </li>
                    <li v-for="(page, index) in pages" :key="index">
                        <router-link class="text-white text-xl text-decoration-none" @click="toggleMenu" :title="page.title" :to="`/page/${page.slug}`">{{ page.title }}</router-link>
                    </li>
                </ul>
            </div>
        </div>

        <header class="absolute w-full mb-4 top-10 p-3">
                <section class="header">
                    <section class="header-main">
                        <div class="header-main-actions">
                            <router-link to="/advertising-order" :title="$t('site.Advertising order')">
                                <button class="btn vt-btn-white">{{ $t('site.Advertising order') }}</button>
                            </router-link>
                        </div>
                        <div class="search-container">
                            <DropDownMainSearch :options="dropdownItems" />
                        </div>
                        <div class="logo-wrap">
                            <router-link class="navbar-brand-profile" to="/" :title="$t('site.Main page')">
                                <img src="/site/images/logo.png" alt="site's logo" />
                            </router-link>
                        </div>
                    </section>
                    <nav class="subheader-navbar navbar navbar-expand-lg navbar-dark bg-vt-gradient">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <router-link to="/" title="$t('site.Main page')">
                                        <button class="btn vt-btn-transparent-invert" :class="isMainPage ? 'active' : ''" title="$t('site.Main page')">
                                            {{ $t('site.Main page') }}
                                        </button>
                                    </router-link>
                                </li>
                                <li class="nav-item" v-for="(category,index) in categories" :key="index">
                                    <router-link :to="`/category/${category.id}/${category.slug}`" :title="category.title">
                                        <button class="btn vt-btn-transparent-invert" :class="isActiveRoute(category.id, category.slug) ? 'active' : ''">
                                            {{ category.title }}
                                        </button>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </section>
            </header>
    </div>
   <div class="container-xxl">
        
        
    </div>
</template>
