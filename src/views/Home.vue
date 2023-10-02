<template>
    <div class="container-xxl">
            <main class="mb-4">
                <div v-if="advertises[1]?.length > 0" class="row mb-75">
                    <div class="col-12 col-lg-6" v-for="(advertise, index) in advertises[1]" :key="index">
                        <div class="row-ads mb-2">
                            <a :href="advertise.link" :title="advertise.title">
                                <img :src="advertise.image" :alt="advertise.title" class="img-fluid row-ad"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-7 flex-grow-1">
                        <div class="row mx-0 mb-75">
                          <slider-component :slides="specialPosts"></slider-component>
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
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
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
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
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
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
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
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
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
                    <div class="col-12 col-lg-3 flex-grow-1 item-column">
                        <full-slider-componenet :slides="specialPosts"></full-slider-componenet>
                        <!-- <newspaper-slider-componenet :slides="posts[7]"></newspaper-slider-componenet> -->
                        <div class="card vt-news-card height-fluid">
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
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
                                                      <span class="material-icons size-font text-primary">
                                                      double_arrow
                                                      </span>
                                                      {{ post.title }}
                                                  </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-if="tabItem == 'challenged'" class="tab-pane fade show active"  id="conv"  role="tabpanel"  aria-labelledby="conv-tab">
                                            <ul v-if="challenged?.length > 0" class="news-list">
                                              <li v-for="(post, index) in challenged" :key="index" class="news-item">
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
                                                      <span class="material-icons size-font text-primary">
                                                      double_arrow
                                                      </span>
                                                      {{ post.title }}
                                                  </router-link>
                                              </li>
                                            </ul>
                                        </div>
                                        <div v-if="tabItem == 'popular'" class="tab-pane fade  show active" id="hot" role="tabpanel" aria-labelledby="hot-tab">
                                            <ul v-if="popular?.length > 0" class="news-list">
                                              <li v-for="(post, index) in popular" :key="index" class="news-item">
                                                  <router-link :to="`news/${post.id}/${post.slug}`" target="_blank" :title="post.title">
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

                        <!-- specialVideos -->
                        <full-slider-componenet :slides="specialVideos"></full-slider-componenet>
                    </div>
                    <div v-if="advertises[2]?.length > 0" class="col-12 col-lg-2 ads-column item-column">
                        <div class="col-ads" v-for="(advertise, index) in advertises[2]" :key="index">
                          <router-link :to="advertise.link" :title="advertise.title">
                            <img class="col-ad" :src="advertise.image" :alt="advertise.title"/>
                          </router-link>
                        </div>
                    </div>
                    <div class="col-12 col-lg-2 ads-column item-column">
                        <div class="col-ads">
                            <img class="col-ad" src="/site/images/ads/cols/00911970.gif" alt="site ad"/>
                        </div>
                        <div class="col-ads">
                            <img class="col-ad" src="/site/images/ads/cols/00911861.gif" alt="site ad"/>
                        </div>
                        <div class="col-ads">
                            <img class="col-ad" src="/site/images/ads/cols/00911969.gif" alt="site ad"/>
                        </div>
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
                                                    <div class="news-row-item-thumb ratio ratio-1x1" :style="`background-image: url(/${post['image']['indexArray']['small']})`"></div>
                                                </div>
                                                <div class="col-8">
                                                    <p class="news-row-item-title">{{ post.title }}</p>
                                                    <router-link :to="`'news/${post.id}/${post.slug}`">{{ post.pre_title }}</router-link>
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
                                    <div class="col-12 col-lg-6" v-for="(post, index) in posts[5]" :key="index">
                                        <div class="news-row-item">
                                            <div class="row gx-2">
                                                <div class="col-4">
                                                    <div class="news-row-item-thumb ratio ratio-1x1" :style="`background-image: url(/${post['image']['indexArray']['small']})`"></div>
                                                </div>
                                                <div class="col-8">
                                                    <p class="news-row-item-title">{{ post.title }}</p>
                                                    <router-link :to="`'news/${post.id}/${post.slug}`">{{ post.pre_title }}</router-link>
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
                    <!-- <x-lives  :lives="$lives" /> -->
                </div>
                <div class="col-12 col-lg-4">
                    <!-- <x-match-table  :sports="$sports" :id="1" /> -->
                </div>
                <div class="col-12 col-lg-4">
                    <!-- <x-match-table  :sports="$sports" :id="2" /> -->
                </div>
            </div>
        </div>
  </template>

<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import TabsComponent from '@/components/plugins/tabs/TabsComponent.vue';
  import TabComponent from '@/components/plugins/tabs/TabComponent.vue';
  import SliderComponent from '@/components/plugins/slider/SliderComponenet.vue';
  import FullSliderComponenet from '@/components/plugins/slider/FullSliderComponenet.vue';


  const advertises = ref([]);
  const posts = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);

  const tabItem = ref('latest');

  onMounted(() => {
    getAdvertises();
    getPosts();
  });

  const getAdvertises = () => {
    useApi().get('api/advertise')
        .then((response) => {
            console.log(response.data);
            advertises.value = response.data;
        });
  }

  const getPosts = () => {
    useApi().get('api/posts')
        .then((response) => {
            console.log(response.data);
            posts.value = response?.data?.posts;
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
  