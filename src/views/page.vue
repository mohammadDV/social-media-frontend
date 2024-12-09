<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch, computed } from 'vue';

  import { useRoute } from 'vue-router';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';
  import { useI18n } from "vue-i18n";  
  import { useHead } from '@unhead/vue';

  const { t } = useI18n(); 
  const advertises = ref([]);
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

                useHead({
                    title: `${response.data?.title} | ${t('site.Website name')}`,
                    meta: [
                        {
                            name: `description`,
                            content: response.data?.title
                        },
                        {
                            name: `og:title`,
                            content: response.data?.title
                        },
                        {
                            name: `og:description`,
                            content: `${response.data?.title} | ${t('site.Website name')}`
                        },
                        {
                            property: `og:url`,
                            content: computed(() => window.location.href)
                        },
                        {
                            name: `twitter:title`,
                            content: response.data?.title
                        },
                        {
                            name: `twitter:description`,
                            content: `${response.data?.title} | ${t('site.Website name')}`                        },
                        {
                            property: `twitter:url`,
                            content: computed(() => window.location.href)
                        },
                    ]
                })
            });
    }
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
                            <h1 class="h4 text-primary">
                                {{ page?.title }}
                            </h1>
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


  
