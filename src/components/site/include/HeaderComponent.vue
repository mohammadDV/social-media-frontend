<script setup>

    
  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import userImage from '@/components/plugins/UserImage.vue';

  const authStore = useAuthStore();
  const categories = ref([]);
  const dropdown = ref(false);


  const toggleDropdown = () => {
    dropdown.value = !dropdown.value
  }

  const logout = () => {
    authStore.logout();
  };

  onMounted(() => {
    useApi().get('/api/active-categories')
        .then((response) => {
            categories.value = response.data;
        })
  });

</script>

<template>
   <div class="container-xxl">
        <header class="mb-4">
            <nav class="preheader-navbar navbar navbar-expand navbar-dark">
                <div class="row preheader-navbar-row">
                    <div class="col-9 col-lg-6 preheader-navbar-col">
                        <!-- @auth() -->
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
                                            <!-- <a class="dropdown-item" href="{{ route('profile.status.create') }}"> -->
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
            </nav>
            <section class="header">
                <section class="header-main">
                    <div class="header-main-actions">
                        <button class="btn vt-btn-white">سفارش تبلیغات</button>
                    </div>
                    <div class="search-container">
                        <!-- <form action="{{ route('search') }}" method="POST"> -->
                        <form action="" method="POST">
                            <!-- @csrf -->
                            <input class="form-control is-white" name="search" type="text" placeholder="جستجو اخبار، تیم ها، بازیکنان و ویدیو های ورزشی ..."/>
                            <button class="btn vt-btv-primary">
                                <span class="material-icons text-body-invert"> search </span>
                            </button>
                        </form>
                    </div>

                    <div class="logo-wrap">
                        <a href="" title="{{ $t('site.Main page') }}">
                            <img src="/site/images/logo.png" alt="site's logo" />
                        </a>
                    </div>
                </section>
                <nav class="subheader-navbar navbar navbar-expand-lg navbar-dark">
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
</template>
