<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import SliderComponent from '@/components/plugins/slider/SliderComponent';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import LiveComponent from '@/components/site/LiveComponent';
  import MatchComponent from '@/components/site/MatchComponent';
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

  const getAdvertises = () => {
    useApi().get('api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getPosts = () => {
    useApi().get('api/posts')
        .then((response) => {
            posts.value = response?.data?.posts;
            latest.value = response?.data?.latest;
            challenged.value = response?.data?.challenged;
            popular.value = response?.data?.popular;
            specialPosts.value = response?.data?.specialPosts;
            specialVideos.value = response?.data?.specialVideos;
        });
  }
  
  onMounted(() => {

    window.document.title =   `${t('site.Main page')} | ${t('site.Website name')}`;
    getAdvertises();
    getPosts();
  });

</script>

<template>
    <div class="container-xxl">
            <main class="mb-4">
                <HorizontalAdvertiseComponent :advertises="advertises[1]"/>
                <div class="row">
                    <div class="col-12 col-lg-7 flex-grow-1">
                        <div class="row mx-0 mb-75">
                          <slider-component v-if="specialPosts?.length > 0" :slides="specialPosts"></slider-component>
                        </div>
                        <div class="row">
                            <div class="col-12 col-lg-6 item-column">
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> movie </span>
                                            <span class="card-header-title">{{ $t("site.Non-football") }}</span>
                                        </div>
                                    </div>
                                    <div v-if="posts[4]?.length > 0" class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                                <li v-for="(post, index) in posts[4]" :key="index" class="news-item">
                                                  <router-link :to="`news/${post.id}/${post.slug}`" :title="post.title">
                                                        <span class="material-icons size-font text-primary">
                                                        double_arrow
                                                        </span>
                                                        {{ post.title}}
                                                  </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> movie </span>
                                            <span class="card-header-title">{{ $t('site.Foreign news') }}</span>
                                        </div>
                                    </div>
                                    <div v-if="posts[3]?.length > 0" class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                              <li v-for="(post, index) in posts[3]" :key="index" class="news-item">
                                                  <router-link :to="`news/${post.id}/${post.slug}`" :title="post.title">
                                                      <span class="material-icons size-font text-primary">
                                                      double_arrow
                                                      </span>
                                                      {{ post.title}}
                                                  </router-link>
                                              </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 item-column">
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> create </span>
                                            <span class="card-header-title">{{ $t('site.Column of writers') }}</span>
                                        </div>
                                    </div>
                                    <div v-if="posts[1]?.length > 0" class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                              <li v-for="(post, index) in posts[1]" :key="index" class="news-item">
                                                  <router-link :to="`news/${post.id}/${post.slug}`" :title="post.title">
                                                        <span class="material-icons size-font text-primary">
                                                        double_arrow
                                                        </span>
                                                        {{ post.title }}
                                                  </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> create </span>
                                            <span class="card-header-title">{{ $t('site.Iran news') }}</span>
                                        </div>
                                    </div>
                                    <div v-if="posts[2]?.length > 0" class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                              <li v-for="(post, index) in posts[2]" :key="index" class="news-item">
                                                  <router-link :to="`/news/${post.id}/${post.slug}`" :title="post.title">
                                                        <span class="material-icons size-font text-primary">
                                                        double_arrow
                                                        </span>
                                                        {{ post.title}}
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-3 flex-grow-1">
                        <div class="mb-75">
                            <FullSliderComponent :hasDate="true" :slides="posts[7]"></FullSliderComponent>
                        </div>

                        <LatestNewsComponent 
                            :latest="latest"
                            :challenged="challenged"
                            :popular="popular"
                        />

                        <!-- specialVideos -->
                        <FullSliderComponent :slides="specialVideos"></FullSliderComponent>
                    </div>
                    <div v-if="advertises[2]?.length > 0" class="col-12 col-lg-2 ads-column item-column">
                        <VerticalAdvertiseComponent :advertises="advertises[2]"/>
                    </div>
                </div>
            </main>
        </div>

        <div class="mid-site-ad-wrapper" style="
            background-image: linear-gradient(
                to right,
                rgba(21, 26, 48, 0.85),
                rgba(21, 26, 48, 0.85)
              ),
              url(/site/images/53970387-B72B-43A2-9FE0-C0EB33F35404.jpeg);
          ">
            <div class="container-xxl py-5">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-9">
                        <p>
                            شبکه اجتماعی ورزشی، تحلیل مسابقات مختلف ورزشی، ویدیو های مسابقات
                            حساس، کری خوانی های ورزشی، تحلیل های پیش و پس از بازی
                        </p>
                        <p class="h1 mb-4">
                            ثبت و تحلیل رخدادهای ورزشی های ورزشی، شبکه اجتماعی ورزشی
                        </p>
                        <a href="register">
                            <div class="btn vt-btv-primary px-4">{{ $t('site.Please register') }}</div>
                        </a> 
                    </div>
                    <div class="col-12 col-lg-2">
                        <img
                            src="/site/images/sport-mid.png"
                            alt="sport"
                            class="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="container-xxl mb-75">
            <div class="row gy-3">
                <div class="col-12 col-lg-6">
                    <div class="card vt-news-card height-md">
                        <div class="card-header header-alt">
                            <p class="h4 text-primary">{{ $t('site.The latest football analysis') }}</p>
                            <div class="vt-divider"><span></span></div>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                                <div v-if="posts[5]?.length > 0" class="row gy-3 news-item-row">
                                    <div class="col-12 col-lg-6" v-for="(post, index) in posts[5]" :key="index">
                                        <div class="news-row-item">
                                            <div class="row gx-2">
                                                <div class="col-4">
                                                    <div class="news-row-item-thumb ratio ratio-1x1" :style="`background-image: url(${post['image']})`"></div>
                                                </div>
                                                <div class="col-8">
                                                    <p class="news-row-item-title">{{ post.title }}</p>
                                                    <router-link class="text-decoration-none"  :to="`news/${post.id}/${post.slug}`">{{ post.pre_title }}</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="card vt-news-card height-md">
                        <div class="card-header header-alt">
                            <p class="h4 text-primary">{{ $t('site.The latest non-football analysis') }}</p>
                            <div class="vt-divider"><span></span></div>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                                <div v-if="posts[6]?.length > 0" class="row gy-3 news-item-row">
                                    <div class="col-12 col-lg-6" v-for="(post, index) in posts[6]" :key="index">
                                        <div class="news-row-item">
                                            <div class="row gx-2">
                                                <div class="col-4">
                                                    <div class="news-row-item-thumb ratio ratio-1x1" :style="`background-image: url(${post['image']})`"></div>
                                                </div>
                                                <div class="col-8">
                                                    <p class="news-row-item-title">{{ post.title }}</p>
                                                    <router-link class="text-decoration-none" :to="`news/${post.id}/${post.slug}`">{{ post.pre_title }}</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-for="(advertise, index) in advertises[3]" :key="index">
                    <div class="row-ads mb-2">
                      <router-link :to="advertise.link" :title="advertises.title">
                        <img :src="advertise.image" :alt="advertise.title" class="img-fluid row-ad"/>
                      </router-link>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <live-component />
                </div>
                <div class="col-12 col-lg-4">
                    <match-component />
                </div>
                <div class="col-12 col-lg-4">
                    <match-component />
                </div>
            </div>
        </div>
  </template>
  
