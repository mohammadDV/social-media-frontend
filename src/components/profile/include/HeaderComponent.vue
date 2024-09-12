<script setup>
    
    import {useApi} from '@/utils/api.ts';
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useAuthStore } from '@/stores/auth.ts';
    import { useI18n } from "vue-i18n";
    import DropDown from '@/components/plugins/dropdown/DropDown.vue'
    import DropDownNotif from '@/components/plugins/dropdown/DropDownNotif.vue';
    import DropDownSearchBox from '@/components/plugins/dropdown/DropDownSearchBox.vue';
  
    const parentSelectedOption = ref(null);
    const { t } = useI18n();
    const accountMenu = ref( [
        {
            title: t('site.Main page'),
            url: '/',
            icon: 'account_circle',
        },
        {
            title: t('site.Logout'),
            url: '/logout',
            icon: 'logout'
        }        
    ]
    );


    const isOpen = ref(false);

    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
    }

    const closeMenu = () => {
        isOpen.value = false;
    }
  
    const authStore = useAuthStore();
    const notifications = ref([]);

    const getRpc = () => {
        if (authStore?.user?.id > 0) {

            useApi().get('/api/profile/rpc')
                .then((response) => {
                    notifications.value = response.data.notifications;
                })
        }
    }

    const autoInterval = ref([]);
    const menu = ref([]);

    onMounted(() => {
        getRpc();
            autoInterval.value = setInterval(function() {
            getRpc();
        }, 10000);

        setTimeout(() => {
            menu.value = authStore.menu.filter(item => !item.permission || authStore.permissions.includes(item.permission));
        }, 500);
    });

    onUnmounted(() => {
        clearInterval(autoInterval.value);
    });


</script>

<template>
   <header class="header-navbar bg-vt-gradient">
        <div class="container-xxl">
            <nav class="navbar navbar-expand navbar-light-profile">
                <div class="container-fluid-profile">
                    <router-link class="navbar-brand-profile" to="/profile" :title="$t('site.Profile')">
                        <img class="mx-2" src="/site/images/icon-white.png" alt="logo" width="36" height="36"/>
                    </router-link>
                    <DropDownSearchBox/>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <button @click="toggleMenu" class="btn focus:outline-none vt-btn-tit mx-2" id="mobileMenuCaller">
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
                            <template v-if="authStore.isAuthenticated">
                                <li v-for="(item, index) in menu" :key="index">
                                    <router-link  class="text-white text-xl text-decoration-none" @click="toggleMenu" :title="$t(item.name)" :to="item.route" >{{ $t(item.name) }}</router-link>                            
                                </li>
                            </template>                            
                        </ul>
                    </div>
                    <div class="hidden md:flex navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div>
                            <ul class="navbar-nav items-center">
                                <li class="relative nav-item dropdown">
                                    <!-- <div class="absolute right-0 top-0 bg-danger text-white">{{ notifications.count }}</div> -->
                                    <span v-if="notifications.length > 0" class="absolute right-0 top-0 flex h-3 w-3">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                    </span>
                                    <DropDownNotif 
                                        icon="notifications"
                                        float="left"
                                        :options="notifications"
                                        v-model="parentSelectedOption"
                                    />
                                </li>
                                <li class="nav-item dropdown user-dropdown">
                                    <DropDown
                                        menuClass="min-w-[170px]"
                                        icon="person"
                                        float="left"
                                        :name="authStore?.user?.nickname"
                                        :options="accountMenu"
                                        v-model="parentSelectedOption"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>

</template>
