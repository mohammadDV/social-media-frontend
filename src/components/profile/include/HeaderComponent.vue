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

    onMounted(() => {
        getRpc();
        autoInterval.value = setInterval(function() {
            getRpc();
        }, 3000);
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
                        <img src="/profile/images/vt-logo.png" alt="logo" width="36" height="36"/>
                    </router-link>
                    <DropDownSearchBox :options="dropdownItems"/>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse justify-content-end" id="navbarSupportedContent">
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
