<script setup>

    
  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';


  const categories = ref([]);

  onMounted(() => {
    useApi().get('api/active-categories')
        .then((response) => {
            categories.value = response.data;
        })
  });


  
// import SegmentationPickerComponent from "./SegmentationPickerComponent.vue";
// import SelectedSegmentationComponent from "./SelectedSegmentationComponent.vue";
// import {computed, ref} from "vue";

// const selection = ref([
//     {
//         cint_platform_key: 2,
//         options: [2, 3],
//     }
// ]);

// const selectedSegmentation = ref([]);

// // define the emits
// const emits = defineEmits(['setSegmentation', 'resetSegmentation', 'canCheckout']);

// const props = defineProps({
//     completes: {
//         type: Number,
//         default: 0,
//     },
//     segmentation: {
//         type: Object,
//         default: () => {
//             return {};
//         }
//     }
// })

// const reset = ref(false);

// const setSegmentation = (value) => {
//     selectedSegmentation.value = value;
//     // emit the selected value to the parent component
//     emits('setSegmentation', value);
// }

// const resetSegmentation = (value) => {
//     // emit the selected value to the parent component
//     emits('resetSegmentation', value);

//     // if the value is an empty array we need to set the reset value to true
//     if (value.length === 0) {
//         reset.value = true;
//     } else {
//         reset.value = false;
//         // set the selected segmentation to the value
//     }
// }

// const canCheckout = (value) => emits('canCheckout', value)

</script>

<template>
   <div class="container-xxl">
        <header class="mb-4">
            <nav class="preheader-navbar navbar navbar-expand navbar-dark">
                <div class="row preheader-navbar-row">
                    <div class="col-9 col-lg-6 preheader-navbar-col">
                        <!-- @auth() -->
                        <!-- <ul class="navbar-nav button-type">
                            <li class="nav-item">
                                <div class="dropdown">
                                    <button class="btn vt-btn-tit dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="user-avatar">
                                        @if(!empty(auth()->user()->profile_photo_path))
                                            <img src="{{ asset(auth()->user()->profile_photo_path) }}" alt="{{ auth()->user()->fullname }}" />
                                        @else
                                            <img src="{{ asset('assets/site/images/user-icon.png') }}" alt="{{ auth()->user()->fullname }}" />
                                        @endif
                                    </span>
                                        <span>{{ auth()->user()->fullname }}</span>
                                    </button>

                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                        <li>
                                            <a class="dropdown-item" href="{{ route('profile') }}">
                                                <span class="material-icons"> person </span>
                                                <span> {{ $t('site.Profile') }} </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#">
                                                <span class="material-icons"> settings </span>
                                                <span>تنظیمات</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="{{ route('profile.status.create') }}">
                                                <span class="material-icons"> post_add </span>
                                                <span>{{ $t('site.Create new status') }}</span>
                                            </a>
                                        </li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li>
                                            <form id="logout-form" method="POST" action="{{ route('logout') }}">
                                                @csrf
                                                <a onclick="event.preventDefault();document.getElementById('logout-form').submit();"  class="dropdown-item" href="{{ route('logout') }}">
                                                    <span class="material-icons"> exit_to_app </span>
                                                    <span>{{ $t('site.Logout') }}</span>
                                                </a>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul> -->
                        <!-- @else -->
                            <ul class="navbar-nav button-type">
                                <li class="nav-item">
                                    <!-- <a href="{{ route('login') }}"> -->
                                    <a href="/">
                                        <button class="btn vt-btn-tit">
                                            <span class="material-icons text-accent"> person </span>
                                            <span>{{ $t('site.Login') }}</span>
                                        </button>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <!-- <a href="{{ route('register') }}"> -->
                                    <a href="">
                                        <button class="btn vt-btn-tit">
                                            <span class="material-icons text-accent"> group_add </span>
                                            <span>{{ $t('site.Register to site') }}</span>
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        <!-- @endauth -->
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
                                <a href="">
                                    <button class="btn vt-btn-transparent-invert active">
                                        {{ $t('site.Main page') }}
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" v-for="(category,index) in categories" :key="index">
                                <!-- <a href="{{ url('archive/' . $category->id . '/' . slug($category->title) ) }}" :title="category.title"> -->
                                <router-link to="/profile" :title="category.title">
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
