<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch } from 'vue';

  import { useRoute } from 'vue-router';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';
  import { useI18n } from "vue-i18n";  

  const { t } = useI18n(); 
  const advertises = ref([]);
  const posts = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);

  const page = ref({});

  const route = useRoute();

  onMounted(() => {
    getPage()
    getAdvertises();
    getPosts();
  });

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getPage = () => {
    
    if (route.params.slug != undefined) {
        useApi().get(`/api/page/${route.params.slug}`)
            .then((response) => {
                page.value = response.data;

                window.document.title =   `${response.data.title} | ${t('site.Website name')}`;
            });
    }
  }

  const getPosts = () => {
    useApi().get('/api/posts')
        .then((response) => {
            posts.value = response?.data?.posts;
            latest.value = response?.data?.latest;
            challenged.value = response?.data?.challenged;
            popular.value = response?.data?.popular;
            specialPosts.value = response?.data?.specialPosts;
            specialVideos.value = response?.data?.specialVideos;
        });
  }

  watch(() => route.params.slug, () => {
    if (route.params.slug) {
        getPage();
    } 
  });

</script>

<template>
    <div class="container-xxl">
        <main class="mb-4">
            <horizontal-advertise-component :advertises="advertises[1]"/>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <vertical-advertise-component v-if="advertises[7]?.length > 0" :advertises="advertises[7]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/" :title="$t('site.Main page')">{{ $t('site.Main page') }}</router-link>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <router-link :to="`/page/${page?.slug}`" :title="page?.title">
                                            {{ page?.title }}
                                        </router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ $t('site.You are here') }}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="card vt-news-card mb-3" :key="route.params.slug">
                        <div class="card-body">
                            <div class="post">
                                <div class="post--header">
                                    <div class="post--cover ratio ratio-16x9"
                                    :style="`background-image: url('${page?.image}')`">
                                    </div>
                                </div>
                                <div class="post--body">
                                    <div class="post--lead">
                                        <span>{{ page.title }}</span>
                                    </div>
                                    <div v-html="page.content"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 flex-grow-1">
                    
                    <div class="mb-75">
                        <full-slider-component :key="route.params.slug" :slides="specialPosts"></full-slider-component>
                    </div>

                    <LatestNewsComponent 
                            :latest="latest"
                            :challenged="challenged"
                            :popular="popular"
                        />
                    <!-- specialVideos -->
                    <full-slider-component :key="route.params.slug" :slides="specialVideos"></full-slider-component>
                </div>
            </div>
        </main>
    </div>
  </template>


  
