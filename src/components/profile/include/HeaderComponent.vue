<script setup>
    
    import {useApi} from '@/utils/api.ts';
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useAuthStore } from '@/stores/auth.ts';
    import { useI18n } from "vue-i18n";
    import Dropdown from '@/components/plugins/dropdown/DropDown.vue'
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
                    <router-link class="navbar-brand-profile" to="/" :title="$t('site.Main page')">
                        <img src="/profile/images/vt-logo.png" alt="logo" width="36" height="36"/>
                    </router-link>



                     <!-- <div id="searchMember" class="navbar-search-group input-group d-none d-lg-flex">
                        <span class="input-group-text-profile" id="basic-addon1">
                            <span class="material-icons size-font-ahalf"> search </span>
                        </span>
                        <span v-if="state?.users?.length > 0" class="cursor-pointer absolute left-2 z-10 top-2 material-icons size-font-ahalf" @click="resetSearch()"> close </span>
                        <input class="form-control navbar-search" v-model.lazy="state.search" type="text" :placeholder="$t('site.Search')"/>
                        <div v-if="state?.users?.length > 0" class="max-h-[350px] overflow-scroll shadow-lg absolute z-10 top-[40px] w-full bg-gray-200">
                            <router-link v-for="(user, index) in state.users" :key="index" :to="`/member/${user.id}`" class="text-decoration-none [&>*:last-child]:border-0">
                                <div class="flex border-b-2 border-gray-100 p-2">
                                    <div>
                                        <img class="w-[50px] h-[50px] rounded-full" :src="user.profile_photo_path" :alt="user.nickname"/>
                                    </div>
                                    <div>
                                        <p class="m-3">{{ user.nickname }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div v-if="state?.message?.length > 0" class="max-h-[350px] overflow-scroll shadow-lg absolute z-10 top-[40px] w-full bg-gray-200">
                            <p class="p-2">{{ state.message }}</p>
                        </div>
                    </div>  -->


                    <DropDownSearchBox :options="dropdownItems"/>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div>
                            <ul class="navbar-nav items-center">
                            
                            <li class="nav-item dropdown">
                                <!-- <router-link class="text-decoration-none" to="/profile/notifications">
                                    <button
                                        class="btn btn-light"
                                        type="button"
                                        id="dropdownNotifications"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span class="material-icons size-font-ahalf">
                                        notifications
                                        </span>
                                        <span v-if="notifCount" class="absolute -right-[5px] top-0 text-white rounded-full text-xs bg-danger px-2 py-1">
                                            {{ notifCount }}
                                        </span>
                                    </button>
                                </router-link> -->
                               


                                <DropDownNotif 
                                    icon="notifications"
                                    float="left"
                                    :options="notifications"
                                    v-model="parentSelectedOption"
                                   />
                            </li>
                            <li class="nav-item dropdown user-dropdown">
                                <Dropdown
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
