<script setup>

    
  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';

  import { useRoute } from 'vue-router';
//   import userImage from '@/components/plugins/UserImage.vue';
  import Dropdown from '@/components/plugins/dropdown/DropDown.vue';
  import DropDownMainSearch from '@/components/plugins/dropdown/DropDownMainSearch.vue';

  import { useI18n } from "vue-i18n";

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
//   const dropdown = ref(false);


//   const toggleDropdown = () => {
//     dropdown.value = !dropdown.value
//   }

//   const logout = () => {
//     authStore.logout();
//   };

const search = ref('');

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
  
onMounted(() => {

    search.value = route?.query?.q;

    getActiveCategory();
    getActivePages();
  });

</script>

<template>
    <div class="relative w-full flex h-50 bg-vt-gradient mb-[130px] pb-5">
        <div class="flex-start">
            <template v-if="authStore.isAuthenticated">
                <div class="pt-[4px] px-3">
                    <Dropdown
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
                            <button class="vt-btn-tit main-gradient rounded-[5px] py-[5px] px-[10px] hover:text-[#06b4f9] ">
                                <span class="material-icons text-accent"> person </span>
                                <span>{{ $t('site.Login') }}</span>
                            </button>
                        </router-link>
                    </div>
                    <div class="nav-item mx-[10px] my-[6px]">
                        <router-link to="/register" class="text-white ">
                            <button class="vt-btn-tit main-gradient rounded-[5px] py-[5px] px-[10px] hover:text-[#06b4f9] ">
                                <span class="material-icons text-accent"> group_add </span>
                                <span>{{ $t('site.Register to site') }}</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </template>
            <!-- <div class="relative cursor-pointer" v-if="authStore.isAuthenticated" @click="toggleDropdown">
                <div class="rounded-lg mx-3 mt-[5px] px-3 py-2 flex gap-2 align-items-center cursor-pointer border">
                    <span class="">
                        <userImage addclass="w-[35px] h-[35px] rounded-full" :item="authStore?.user" />
                    </span>
                    <span class="material-icons text-accent"> person </span>
                    <span class="text-black text-white">{{ authStore?.user?.nickname }}</span>
                </div>
                <div v-if="dropdown" class="rounded shadow-current z-50 absolute w-[150px] p-2 mt-1 mx-[15px] bg-vt">
                    <router-link class="text-white text-decoration-none" to="/profile">
                        <div class="p-2 border-bottom cursor-pointer">
                            <span class="material-icons"> person </span>
                            <span> {{ $t('site.Profile') }} </span>
                        </div>
                    </router-link>
                    <a @click="logout" class="text-white text-decoration-none">
                        <div class="p-2 cursor-pointer">
                            <span class="material-icons"> exit_to_app </span>
                            <span>{{ $t('site.Logout') }}</span>
                        </div>
                    </a>
                </div>
            </div>
            <div v-else class="flex button-type">
                <div class="nav-item">
                    <router-link to="/login" title="$t('site.Login')">
                        <button class="btn vt-btn-tit">
                            <span class="material-icons text-accent"> person </span>
                            <span>{{ $t('site.Login') }}</span>
                        </button>
                    </router-link>
                </div>
                <div class="nav-item">
                    <router-link to="/register">
                        <button class="btn vt-btn-tit">
                            <span class="material-icons text-accent"> group_add </span>
                            <span>{{ $t('site.Register to site') }}</span>
                        </button>
                    </router-link>
                </div>
            </div> -->
        </div>
        <div class="flex-grow text-left">
            <div class="flex flex-lg-row-reverse gap-3 p-3">
                <div class="" v-for="(page, index) in pages" :key="index">
                    <router-link class="text-white text-decoration-none" :to="`/page/${page.slug}`">{{ page.title }}</router-link>
                </div>
            </div>
        </div>

        <header class="absolute w-full mb-4 top-10 p-3">
         
           

                <!-- <nav class="preheader-navbar navbar navbar-expand navbar-dark">
                    <div class="row preheader-navbar-row">
                        <div class="col-9 col-lg-6 preheader-navbar-col">
                            <ul v-if="authStore.isAuthenticated" class="navbar-nav button-type">
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <button class="flex btn vt-btn-tit dropdown-toggle  justify-around items-center" type="button" @click="toggleDropdown">
                                            <span class="user-avatar">
                                                <userImage addclass="inline" :item="authStore?.user" />
                                            </span>
                                            <span>{{ authStore?.user?.nickname }}</span>
                                        </button>
                                        <ul v-show="dropdown" class="absolute w-[180px] rounded-lg bg-white z-50 p-2 d-block">
                                            <li>
                                                <router-link class="dropdown-item" to="/profile">
                                                    <span class="material-icons"> person </span>
                                                    <span> {{ $t('site.Profile') }} </span>
                                                </router-link>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#">
                                                    <span class="material-icons"> settings </span>
                                                    <span>تنظیمات</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="">
                                                    <span class="material-icons"> post_add </span>
                                                    <span>{{ $t('site.Create new status') }}</span>
                                                </a>
                                            </li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li>
                                                <a @click="logout"  class="dropdown-item">
                                                    <span class="material-icons"> exit_to_app </span>
                                                    <span>{{ $t('site.Logout') }}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul> 
                            <ul v-else class="navbar-nav button-type">
                                <li class="nav-item">
                                    <router-link to="/login" title="$t('site.Login')">
                                        <button class="btn vt-btn-tit">
                                            <span class="material-icons text-accent"> person </span>
                                            <span>{{ $t('site.Login') }}</span>
                                        </button>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/register">
                                        <button class="btn vt-btn-tit">
                                            <span class="material-icons text-accent"> group_add </span>
                                            <span>{{ $t('site.Register to site') }}</span>
                                        </button>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="col-3 preheader-navbar-col d-block d-lg-none">
                            <ul class="navbar-nav button-type justify-content-end">
                                <li class="nav-item">
                                    <button class="btn vt-btn-tit" id="mobileMenuCaller">
                                        <span class="material-icons text-accent"> menu </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 preheader-navbar-col d-none d-lg-block">
                            <ul class="navbar-nav justify-content-end">
                                <li class="nav-item">
                                    <button class="btn vt-btn-transparent-invert">تبلیغات</button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn vt-btn-transparent-invert">
                                        اخبار زنده
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn vt-btn-transparent-invert">
                                        ارتباط با ما
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn vt-btn-transparent-invert">
                                        درباره ما
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav> -->
                <section class="header">
                   
                    <section class="header-main">
                        <div class="header-main-actions">
                            <button class="btn vt-btn-white">سفارش تبلیغات</button>
                        </div>
                        <div class="search-container">

                            <!-- <form action="/search">
                                <input class="form-control is-white" v-model="search" name="q" type="text" placeholder="جستجو اخبار، تیم ها، بازیکنان و ویدیو های ورزشی ..."/>
                                <button class="btn vt-btv-primary">
                                    <span class="material-icons text-body-invert"> search </span>
                                </button>
                            </form> -->

                            <DropDownMainSearch
                                icon=""
                                color=""
                                :options="dropdownItems"
                                />
                        
                        </div>
    
                        <div class="logo-wrap">
                            <a href="" title="{{ $t('site.Main page') }}">
                                <img src="/site/images/logo.png" alt="site's logo" />
                            </a>
                        </div>


                        
                    </section>
                    <nav class="subheader-navbar navbar navbar-expand-lg navbar-dark bg-vt-gradient">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <router-link to="/" title="$t('site.Main page')">
                                        <button class="btn vt-btn-transparent-invert active" title="$t('site.Main page')">
                                            {{ $t('site.Main page') }}
                                        </button>
                                    </router-link>
                                </li>
                                <li class="nav-item" v-for="(category,index) in categories" :key="index">
                                    <router-link :to="`/category/${category.id}/${category.title}`" :title="category.title">
                                        <button class="btn vt-btn-transparent-invert">
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
