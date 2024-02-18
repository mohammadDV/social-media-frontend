<template>
    <div class="container-xxl">
        <main class="mb-4">
            <div class="row mb-75">
                <HorizontalAdvertiseComponent :advertises="advertises[1]"/>
            </div>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <VerticalAdvertiseComponent v-if="advertises[7]?.length > 0" :advertises="advertises[7]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="" :title="$t('site.Main page')">{{ $t('site.Main page') }}</a></li>
                                    <li class="breadcrumb-item">
                                        <router-link :to="`/category/${category?.id}/${category?.title}`" :title="category?.title">
                                            {{ category?.title }}
                                        </router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ $t('site.You are here') }}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="card vt-news-card archive-card">
                        <div class="card-header header-alt">
                            <p class="h4 text-primary">{{ category?.title }}</p>
                            <div class="vt-divider"><span></span></div>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                            <div id="main-list" class="row gy-3 news-item-row">
                                <div v-for="(post, index) in posts" :key="index" class="col-12 col-lg-6">
                                    <div class="news-row-item">
                                        <div class="row gx-2">
                                            <div class="col-4">
                                                <div class="news-row-item-thumb ratio ratio-1x1" :style="`background-image: url(${post?.image})`"></div>
                                            </div>
                                            <div class="col-8">
                                                <p class="news-row-item-title">{{ post.title }}</p>
                                                <!-- <router-link class="news-row-item-link stretched-link" :to="`/news/${post.id}/${post.slug}`">
                                                    {{ post.pre_title }}
                                                </router-link> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="more" class="col-12 lazyload-body">
                                <button type="button" @click="addMore" class="lazyload-button btn vt-btn-white">
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

                    <div class="card vt-news-card height-fluid mb-75">
                        <div class="card-header">
                            <tabs-component class="nav">
                                <tab-component class="nav-item cursor-pointer" :is-active="tabItem == 'latest'"
                                                @tab-clicked="changeTab('latest')">
                                                {{ $t('site.Latest news') }}
                                </tab-component>
                                <tab-component class="nav-item cursor-pointer" :is-active="tabItem == 'challenged'"
                                                @tab-clicked="changeTab('challenged')">
                                                {{ $t('site.Challenged') }}
                                </tab-component>
                                <tab-component class="nav-item cursor-pointer" :is-active="tabItem == 'popular'"
                                                @tab-clicked="changeTab('popular')">
                                                {{ $t('site.Popular') }}
                                </tab-component>
                            </tabs-component>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                                <div class="tab-content" id="hottiesContent">
                                    <div v-if="tabItem == 'latest'" class="tab-pane fade show active"  id="latest"  role="tabpanel"  aria-labelledby="latest-tab">
                                        <ul v-if="latest?.length > 0" class="news-list">
                                            <li v-for="(post, index) in latest" :key="index" class="news-item">
                                                <!-- <router-link :to="`/news/${post.id}/${post.slug}`"  :title="post.title">
                                                    <span class="material-icons size-font text-primary">
                                                    double_arrow
                                                    </span>
                                                    {{ post.title }}
                                                </router-link> -->
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="tabItem == 'challenged'" class="tab-pane fade show active"  id="conv"  role="tabpanel"  aria-labelledby="conv-tab">
                                        <ul v-if="challenged?.length > 0" class="news-list">
                                            <li v-for="(post, index) in challenged" :key="index" class="news-item">
                                                <!-- <router-link :to="`/news/${post.id}/${post.slug}`"  :title="post.title">
                                                    <span class="material-icons size-font text-primary">
                                                    double_arrow
                                                    </span>
                                                    {{ post.title }}
                                                </router-link> -->
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="tabItem == 'popular'" class="tab-pane fade  show active" id="hot" role="tabpanel" aria-labelledby="hot-tab">
                                        <ul v-if="popular?.length > 0" class="news-list">
                                            <li v-for="(post, index) in popular" :key="index" class="news-item">
                                                <!-- <router-link :to="`/news/${post.id}/${post.slug}`"  :title="post.title">
                                                    <span class="material-icons size-font text-primary">
                                                    double_arrow
                                                    </span>
                                                    {{ post.title}}
                                                </router-link> -->
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- specialVideos -->
                    <full-slider-component :slides="specialVideos"></full-slider-component>
                </div>
            </div>
        </main>
    </div>
  </template>

<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch } from 'vue';

  import { useRoute } from 'vue-router';
  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
 
  const advertises = ref([]);
  const posts = ref([]);
  const category = ref({});
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);
  const tabItem = ref('latest');
  const route = useRoute();
  const more = ref(true);
  const page = ref(1);

  onMounted(() => {
    getArchive();
    getAdvertises();
    getPosts();
  });

  const addMore = () => {
    getArchive();
  }

  watch(() => route.params.id, () => {
    if (route.params.id) {
        page.value = 1;
        more.value = true;
        posts.value = {};
        getArchive();
    } 
  });

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getArchive = () => {
    useApi().get(`/api/archive/${route.params.id}?page=${page.value}`)
        .then((response) => {
            if (response.data.data?.length > 0) {
                posts.value.push(...response.data.data);
            } else {
                more.value = false;
            }
            page.value++;
            category.value = response.data.category;
        });
  }

  const getPosts = () => {
    useApi().get('/api/posts')
        .then((response) => {
            latest.value = response?.data?.latest;
            challenged.value = response?.data?.challenged;
            popular.value = response?.data?.popular;
            specialPosts.value = response?.data?.specialPosts;
            specialVideos.value = response?.data?.specialVideos;
        });
  }

  const changeTab = (id) => {
    tabItem.value = id;
  }


</script>
  