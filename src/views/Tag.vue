<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch } from 'vue';

  import { useRoute } from 'vue-router';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';

  const advertises = ref([]);
  const posts = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);
  const route = useRoute();
  const more = ref(true);
  const page = ref(1);

  const addMore = () => {
    getTag();
  }

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getTag = () => {

    if (page.value < 2) {
        posts.value = [];
    }

    useApi().get(`/api/tag/${route.params.id}?page=${page.value}`)
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
    useApi().get('/api/posts')
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
        getTag();
    } 
  });

  onMounted(() => {
    getTag();
    getAdvertises();
    getPosts();
  });


</script>
<template>
    <div class="container-xxl">
        <main class="mb-4">
            <HorizontalAdvertiseComponent :advertises="advertises[1]"/>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <VerticalAdvertiseComponent v-if="advertises[5]?.length > 0" :advertises="advertises[5]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="" :title="$t('site.Main page')">{{ $t('site.Main page') }}</a></li>
                                    <li class="breadcrumb-item">
                                        <router-link :to="`/tag/${route.params.id}/${route.params.title}`" :title="route.params.title">
                                            {{ route.params.title }}
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
                                                <router-link class="news-row-item-link stretched-link" :to="`/news/${post.id}/${post.slug}`">
                                                    {{ post.pre_title }}
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

  