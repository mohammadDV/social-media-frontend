<script setup>
    
    import {useApi} from '@/utils/api.ts';
    import { onMounted, onUnmounted, ref } from 'vue';
    //   import userImage from '@/components/plugins/UserImage.vue'
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
    const notifMenu = ref( [
    
        {
            title: t('site.Logout'),
            url: '/profile',
            img: '../../../assets/site/images/user.jpg'
        }
    
        
    ]
    );
  const authStore = useAuthStore();


const notifCount = ref(0);

// const resetSearch = () => {
//     state.search = '';
//     state.message = '';
//     state.users = [];
// }

// const logout = () => {
//     authStore.logout();
// };



const getRpc = () => {
    if (authStore?.user?.id > 0) {

        useApi().get('/api/profile/rpc')
                .then((response) => {
                    notifCount.value = response.data.notification_count;
                })
    }
}

const autoInterval = ref([]);

onMounted(() => {
    getRpc();
    autoInterval.value = setInterval(function() {
        getRpc();
    }, 30000);
});

onUnmounted(() => {
    clearInterval(autoInterval.value);
});


</script>

<template>
   <header class="header-navbar">
        <div class="container-xxl">
            <nav class="navbar navbar-expand navbar-light-profile bg-light">
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
                                    color=""
                                    float="left"
                                    name=""
                                    :options="notifMenu"
                                    v-model="parentSelectedOption"
                                   />
                            </li>
                            <li class="nav-item dropdown user-dropdown">
                                <Dropdown
                                    icon="person"
                                    color="profile"
                                    :name="authStore?.user?.nickname"
                                    :options="accountMenu"
                                    v-model="parentSelectedOption"/>
                                <!-- <button
                                    class="btn btn-light dropdown-toggle"
                                    type="button"
                                    id="dropdownProfile"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div class="profile-avatar">
                                        
                                        <userImage add-class="inline" :item="authStore?.user" />
                                    </div>
                                    <span class="user-name">{{ authStore?.user?.nickname }}</span>
                                </button>
                                <div
                                    class="dropdown-menu is-left"
                                    aria-labelledby="dropdownProfile"
                                >
                                    <div class="vt-dropdown-list-menu">
                                        <a class="vt-list-menu-item" href="#" :title="$t('site.Profile')">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> account_circle </span>
                                            </span>
                                            <span class="dropdown-item-title">{{ $t('site.Profile') }}</span>
                                        </a>

                                        <a class="vt-list-menu-item" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> bookmark </span>
                                            </span>
                                            <span class="dropdown-item-title">ذخیره شده</span>
                                        </a>

                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> manage_accounts </span>
                                            </span>
                                            <span class="user-link-title">
                                            ویرایش حساب کاربری
                                            </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> group_add </span>
                                            </span>
                                            <span class="user-link-title">
                                            درخواست های دنبال کردن
                                            </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> chat </span>
                                            </span>
                                            <span class="user-link-title"> پیام های خصوصی </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> verified_user </span>
                                            </span>
                                            <span class="user-link-title"> تایید حساب کاربری </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> paid </span>
                                            </span>
                                            <span class="user-link-title">
                                            ارتقاع حساب کاربری
                                            </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                                <span class="material-icons"> article </span>
                                            </span>
                                            <span class="user-link-title"> مدیریت مطالب </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                                <span class="material-icons"> post_add </span>
                                            </span>
                                            <span class="user-link-title"> ایجاد مطالب جدید </span>
                                        </a>
                                        <a class="vt-list-menu-item is-mobile" href="#">
                                            <span class="dropdown-item-icon">
                                                <span class="material-icons"> block </span>
                                            </span>
                                            <span class="user-link-title"> مسدود شده ها </span>
                                        </a>

                                        <a class="vt-list-menu-item" href="#">
                                            <span class="dropdown-item-icon">
                                            <span class="material-icons"> settings </span>
                                            </span>
                                            <span class="dropdown-item-title">تنظیمات</span>
                                        </a>

                                        <div class="vt-list-menu-divider"></div>
                                        <a @click="logout" lass="vt-list-menu-item">
                                            <span class="dropdown-item-icon">
                                                <span class="material-icons">
                                                    power_settings_new
                                                </span>
                                            </span>
                                            <span class="dropdown-item-title">{{ $t('site.Logout') }}</span>
                                        </a>
                                    </div>
                                </div> -->
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>

</template>
