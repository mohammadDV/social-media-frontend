<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch, computed } from 'vue';

  import { useRoute } from 'vue-router';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
//   import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';
  import { useI18n } from "vue-i18n";  
  import { useHead } from '@unhead/vue';
  import jalaliMoment from 'moment-jalaali';

  const { t } = useI18n(); 
  const advertises = ref([]);
  const posts = ref([]);
//   const category = ref({});
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);
  const route = useRoute();
  const more = ref(true);
  const page = ref(1);
  const addMore = () => {
    handleSearch();
  }

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const handleSearch = () => {

    if (page.value < 2) {
        posts.value = [];
    }

    useApi().post(`/api/search`, { 
        search: search.value,
        page: page.value,
     })
        .then((response) => {
            if (response.data?.length > 0) {
                posts.value.push(...response.data);
            } else {
                more.value = false;
            }
            page.value++;
        });
  }

  const getPosts = () => {
    useApi().get('/api/suggested-posts')
        .then((response) => {
            latest.value = response?.data?.latest;
            challenged.value = response?.data?.challenged;
            popular.value = response?.data?.popular;
            specialPosts.value = response?.data?.specialPosts;
            specialVideos.value = response?.data?.specialVideos;
        });
  }

  watch(() => route.params.id, () => {
    if (route.params.id) {
        page.value = 1;
        more.value = true;
        posts.value = {};
    } 
  });

  const search = ref('');

  onMounted(() => {

    search.value = route.query.q;

    useHead({
        title: `${search.value} | ${t('site.Website name')}`,
        meta: [
            {
                name: `description`,
                content: `جامع‌ترین اخبار و تحلیل‌های مرتبط با ${search.value}، شامل موضوعات فوتبالی و ورزشی، از جزئیات تا دیدگاه‌های تخصصی.`
            },
            {
                name: `og:title`,
                content: search.value
            },
            {
                name: `og:description`,
                content: `جامع‌ترین اخبار و تحلیل‌های مرتبط با ${search.value}، شامل موضوعات فوتبالی و ورزشی، از جزئیات تا دیدگاه‌های تخصصی.`
            },
            {
                property: `og:url`,
                content: computed(() => window.location.href)
            },
            {
                name: `twitter:title`,
                content: search.value
            },
            {
                name: `twitter:description`,
                content: `جامع‌ترین اخبار و تحلیل‌های مرتبط با ${search.value}، شامل موضوعات فوتبالی و ورزشی، از جزئیات تا دیدگاه‌های تخصصی.`
            },
            {
                property: `twitter:url`,
                content: computed(() => window.location.href)
            },
        ]
    })
    getAdvertises();
    getPosts();
    handleSearch();
  });


</script>
<template>
    <div class="container-xxl">
        <main class="mb-4">

            <div class="m-2">&nbsp;</div>
            <!-- <HorizontalAdvertiseComponent :advertises="advertises[1]"/> -->
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <VerticalAdvertiseComponent v-if="advertises[5]?.length > 0" :advertises="advertises[5]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <!-- <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/" :title="$t('site.Main page')">{{ $t('site.Main page') }}</router-link>
                                    </li>
                                    <li class="breadcrumb-item active"> -->
                                        <!-- <router-link :to="`/category/${category?.id}/${category?.title}`" :title="category?.title"> -->
                                            <!-- {{ search }} -->
                                        <!-- </router-link> -->
                                    <!-- </li> -->
                                    <!-- <li class="breadcrumb-item active" aria-current="page">
                                        {{ $t('site.You are here') }}
                                    </li> -->
                                <!-- </ol>
                            </nav>
                        </div>
                    </div> -->
                    <div class="card vt-news-card archive-card">
                        <div class="card-header header-alt">
                            <h1 class="h4 text-primary">{{ search }}</h1>
                            <div class="vt-divider"><span></span></div>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                            <div id="main-list" class="row gy-3 news-item-row">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full sm:grid sm:grid-cols-1 xs:grid xs:grid-cols-1">
                                    <div class=" cursor-pointer" v-for="(post, index) in posts" :key="index">
                                    <div class="flex gap-2 flex-nowrap flex-wrap items-center justify-center rounded-md bg-gray-50  hover:bg-gray-100 xs:flex xs:flex-col">
                                        <div class="flex-none">
                                            <router-link class="text-decoration-none cursor-pointer" :title="post.title" :to="`/news/${post.id}/${post.slug}`">
                                                <img class="rounded-md h-[100px]" :src="post.image" alt="img">
                                            </router-link>
                                        </div>
                                        <div class="flex-grow p-2">
                                            <router-link class="text-decoration-none cursor-pointer" :title="post.title" :to="`/news/${post.id}/${post.slug}`">
                                                <h3 class="h-[20px] text-blue-400 overflow-hidden no-underline text-base"  href="">{{ post.title }}</h3>
                                                <p class="text-xs text-gray-700 h-[29px] overflow-hidden w-full"> {{ post.summary }} </p>
                                            </router-link>
                                            <div id="search-material" class="flex gap-6 justify-between">
                                                <div class="flex gap-2">
                                                <div class="view text-gray-400 text-xs">
                                                    <span class="material-icons text-sm">visibility</span>
                                                    {{ post.view }}
                                                </div>
                                                </div>
                                                <div class="time text-gray-400 text-xs">
                                                <span class="material-icons text-sm">schedule</span>
                                                {{ jalaliMoment(post.created_at).format('dddd jD jMMMM') }}</div>
                                            </div>
                                        </div>
                                    </div>  
                                    </div>
                                </div>
                                <!-- <div v-for="(post, index) in posts" :key="index" class="col-12 col-lg-6">
                                    <div class="news-row-item">
                                        <div class="row gx-2">
                                            <div class="col-4">
                                                <div class="news-row-item-thumb ratio ratio-1x1" :style="`background-image: url(${post?.image})`"></div>
                                            </div>
                                            <div class="col-8">
                                                <p class="news-row-item-title">{{ post.title }}</p>
                                                <router-link class="news-row-item-link stretched-link" :to="`/news/${post.id}/${post.slug}`">
                                                    {{ post.pre_title }}
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div v-if="more" class="col-12 px-5 mt-2">
                                <button type="button" @click="addMore" class="w-full btn vt-btn-white">
                                    {{ $t('site.More post')}}
                                </button>
                                <div class="lazyload-loader">
                                    <span class="material-icons text-primary"> autorenew </span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 flex-grow-1">
                    
                    <div class="mb-75">
                        <full-slider-component :slides="specialPosts"></full-slider-component>
                    </div>

                    <LatestNewsComponent 
                        :latest="latest"
                        :challenged="challenged"
                        :popular="popular"
                    />
                    <!-- specialVideos -->
                    <full-slider-component :slides="specialVideos"></full-slider-component>
                </div>
            </div>
        </main>
    </div>
  </template>

  
