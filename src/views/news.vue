<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch } from 'vue';

  import { useRoute } from 'vue-router';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import CommentComponent from '@/components/site/components/comments/CommentComponent';
  import CommentFormComponent from '@/components/site/components/comments/CommentFormComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';
  import VideoPlayerComponent from '@/components/site/components/video/VideoPlayerComponent';
  import { useI18n } from "vue-i18n";  

  const { t } = useI18n();    
  const advertises = ref([]);
  const timestamp = ref('');
  const posts = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const category = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);

  const post = ref({});

  const route = useRoute();

  const formattedDate = (post) => {
        const date = new Date(post.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        timestamp.value = `${year}/${month}/${day}`;
}

  onMounted(() => {
    getPost()
    getAdvertises();
    getPosts();
    getComments();
  });

  const updateComments = () => {
    page.value = 1;
    getComments()
  }

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getPost = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/post/${route.params.id}`)
            .then((response) => {
                post.value = response.data;
                category.value = post.value.categories[0];
                formattedDate(response.data);
                window.document.title =   `${response.data?.title} | ${t('site.Website name')}`;
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

    const comments = ref([]);
    const page = ref(1);
    const more = ref(false);
    const loading = ref(false);

    const getComments = () => {

        loading.value = true;
         
        if (page.value == 1) {
            comments.value = [];
        }

         useApi().get(`/api/comment/post/${route?.params?.id}?page=${page.value}`)
            .then((response) => {

                if (response.data?.data) {

                    comments.value.push(...response.data.data);
    
                    if (response.data.total > page.value * response.data.per_page) {
                        more.value = true;
                    } else {
                        more.value = false;
                    }
    
                    page.value++;
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }

    watch(() => route.params.id, () => {
        if (route.params.id) {
            getPost();
            page.value = 1;
            getComments();
        } 
    });


</script>

<template>
    <div class="container-xxl">
        <main class="mb-4">
            <horizontal-advertise-component :key="post.id" :advertises="advertises[1]"/>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <vertical-advertise-component :key="post.id" v-if="advertises[7]?.length > 0" :advertises="advertises[7]"/>
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
                                        <router-link :to="`/category/${category?.id}/${category?.slug}`" :title="category?.title">
                                            {{ category?.title }}
                                        </router-link>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <router-link :to="`/news/${post.id}/${post.slug}`" :title="post?.title">
                                            {{ post?.title }}
                                        </router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ $t('site.You are here') }}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="card vt-news-card mb-3">
                        <div class="card-body">
                            <div class="post">
                                <div v-if="post.type == 1">
                                    <VideoPlayerComponent :key="post.id" :video="post.video" :advertise="post?.advertise?.file"/>
                                    <div class="extend-info">
                                        <span class="post-id">{{ $t('site.News id') }}: {{ post.id }}</span>
                                        <span>
                                            <span class="post-date">{{ $t('site.Time') }}: {{ timestamp }}</span>
                                            <span class="post-view">{{ $t('site.Views count') }}: {{ post.view }}</span>
                                        </span>
                                    </div>
                                    <div v-if="post?.pre_titl" class="main-info">
                                        <span class="fs-6 post--subtitle">{{ post.pre_title }}</span>
                                    </div>
                                </div>
                                <div v-else class="post--header">
                                    <div class="post--cover ratio ratio-16x9"
                                    :style="`background-image: url('${post?.image}')`">
                                        <div class="post--header--overly"></div>
                                        <div class="post--head-info">
                                            <div class="extend-info">
                                                <span class="post-id">{{ $t('site.News id') }}: {{ post.id }}</span>
                                                <span>
                                                    <span class="post-date">{{ $t('site.Time') }}: {{ timestamp }}</span>
                                                    <span class="post-view">{{ $t('site.Views count') }}: {{ post.view }}</span>
                                                </span>
                                            </div>
                                            <div class="main-info">
                                                <span class="fs-6 post--subtitle">{{ post.pre_title }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="post--body">
                                    <div class="post--lead">
                                        <span>{{ post.title }}</span>
                                    </div>
                                    <div>
                                        {{ post.summary }}
                                    </div>
                                    <div v-html="post.content"></div>
                                </div>
                            </div>
                            <div v-if="post?.tags?.length > 0" class="post-tag-list">
                                <div v-for="(tag, index) in post.tags" :key="index" class="tag-list-item">
                                    <span class="material-icons text-primary size-font">
                                    tag
                                    </span>
                                    <span>{{ tag.title }}</span>
                                    <router-link :to="`/tag/${tag.id}/${tag.title}`" :title="tag.title" class="stretched-link"></router-link>
                                </div>
                            </div>
                            <div class="relative-posts">
                                <div class="relative-posts--header">
                                    <span class="relative-posts--title">اخبار مرتبط</span>
                                </div>
                                <div class="relative-posts--body">
                                    <ul class="news-list" v-if="latest?.length > 0">
                                        <template  v-for="(post, index) in latest" :key="index">
                                            <li v-if="index < 5" class="news-item">
                                                <router-link :to="`/news/${post.id}/${post.slug}`" :title="post.title" class="news">
                                                    <span class="material-icons size-font text-primary">
                                                    double_arrow
                                                    </span>
                                                    {{ post.title}}
                                                </router-link>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CommentFormComponent :key="post.id" @updateComments="updateComments"/>
                    <CommentComponent :key="post.id" :comments="comments" @updateComments="updateComments"/>
                    <div class="text-center">
                        <button v-if="more" class="btn btn-light" @click="getComments()">
                            <span>{{ $t('site.More post') }}</span>
                        </button>
                    </div>
                </div>
                <div class="col-12 col-lg-3 flex-grow-1">
                    
                    <div class="mb-75">
                        <full-slider-component :key="post.id" :slides="specialPosts"></full-slider-component>
                    </div>

                    <LatestNewsComponent :key="post.id"
                            :latest="latest"
                            :challenged="challenged"
                            :popular="popular"
                        />
                    <!-- specialVideos -->
                    <full-slider-component :key="post.id" :slides="specialVideos"></full-slider-component>
                </div>
            </div>
        </main>
    </div>
  </template>


  
