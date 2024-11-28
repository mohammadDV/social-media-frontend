<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch, computed } from 'vue';

  import { useRoute } from 'vue-router';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import CommentComponent from '@/components/site/components/comments/CommentComponent';
  import CommentFormComponent from '@/components/site/components/comments/CommentFormComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';
  import VideoPlayerComponent from '@/components/site/components/video/VideoPlayerComponent';
  import { useI18n } from "vue-i18n";  
  import { useHead } from '@unhead/vue';

  const { t } = useI18n();    
  const advertises = ref([]);
  const timestamp = ref('');
  const authorPosts = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const categories = ref([]);
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
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        timestamp.value = `${hours}:${minutes} ${year}/${month}/${day}`;
    }

  onMounted(() => {
    getPost()
    getAdvertises();
    getPosts();
    getComments();
  });

  const updateComments = () => {
    page.value = 1;
    getComments(1);
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
                getAuthorPosts(post);
                categories.value = post.value.categories;
                formattedDate(response.data);
                useHead({
                    title: `${response.data?.title} | ${t('site.Website name')}`,
                    meta: [
                        {
                            name: `description`,
                            content: response.data?.summary
                        },
                        {
                            property: `og:url`,
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

  const getAuthorPosts = () => {
    useApi().get('/api/author-posts/' + post.value?.user?.id)
        .then((response) => {
            authorPosts.value = response?.data;
        });
  }

    const comments = ref([]);
    const page = ref(1);
    const more = ref(false);
    const loading = ref(false);

    const getComments = (submit = 0) => {

        loading.value = true;
         
        if (page.value == 1) {
            comments.value = [];
        }

        let url = `/api/comment/post/${route?.params?.id}?page=${page.value}`;

        if (submit == 1) {
            url = `/api/comment/post/${route?.params?.id}?page=${page.value}&submit=1`;
        }

         useApi().get(url)
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

    const isPostRecent = (createdAt) => {
      return new Date(createdAt) > new Date('2024-11-27');
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
            <template v-if="isPostRecent(post.created_at)">
                <horizontal-advertise-component :key="post.id" :advertises="advertises[1]"/>
            </template>
            <template v-else>
                <div class="m-2">&nbsp;</div>
            </template>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <vertical-advertise-component :key="post.id" v-if="advertises[7]?.length > 0" :advertises="advertises[7]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <div class="text-primary">
                                <h1 class="text-xl">{{ post?.title }}</h1>
                            </div>
                            <!-- <nav aria-label="breadcrumb">
                                <ol class="breadcrumb"> -->
                                    <!-- <li class="breadcrumb-item">
                                        <router-link to="/" :title="$t('site.Main page')">{{ $t('site.Main page') }}</router-link>
                                    </li> -->
                                    <!-- <li v-for="(category,index) in categories" class="breadcrumb-item" :key="index">
                                        <router-link :to="`/category/${category?.id}/${category?.slug}`" :title="category?.title">
                                            {{ category?.title }}
                                        </router-link>
                                    </li> -->
                                    <!-- <li class="breadcrumb-item">
                                        <router-link :to="`/news/${post.id}/${post.slug}`" :title="post?.title">
                                            {{ post?.title }}
                                        </router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ $t('site.You are here') }}
                                    </li> -->
                                <!-- </ol>
                            </nav> -->
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
                                    <div class="main-info">
                                        <router-link 
                                                    :to="`/member/${post.user?.id}`"  
                                                    :title="post.user?.nickname"
                                                    class="text-decoration-none cursor-pointer text-gray-200 fs-6 post--subtitle"
                                                >نویسنده: {{ post.user?.nickname }}  | مشاهده پروفایل</router-link>
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
                                                <router-link 
                                                    :to="`/member/${post.user?.id}`"  
                                                    :title="post.user?.nickname"
                                                    class="text-decoration-none cursor-pointer text-gray-200 fs-6 post--subtitle"
                                                >نویسنده: {{ post.user?.nickname }}  | مشاهده پروفایل</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="post--body">
                                    <div class="flex gap-2 flex-wrap">
                                        <span>دسته بندی ها:</span>
                                        <span v-for="(category,index) in categories" class="" :key="index">
                                            <router-link class="text-decoration-none" :to="`/category/${category?.id}/${category?.slug}`" :title="category?.title">
                                                {{ category?.title }}
                                            </router-link>
                                            <span v-if="categories.length -1 != index">
                                                |
                                            </span>
                                        </span>
                                    </div>
                                    <hr>
                                    <div class="fs-6 post--subtitle mt-4 mb-4">{{ post.pre_title }}</div>
                                    <div class="post--lead">
                                        <span>{{ post.summary }}</span>
                                    </div>
                                    <div id="body-content" v-html="post.content"></div>
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
                                <template v-if="authorPosts?.length > 0">
                                    <div class="relative-posts--header">
                                        <span class="relative-posts--title">خبرهای پربازدید {{ post.user?.nickname }} </span>
                                    </div>
                                    <div class="relative-posts--body">
                                        <ul class="news-list">
                                            <template  v-for="(post, index) in authorPosts" :key="index">
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
                                </template>
                                <!-- <hr>
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
                                </div> -->
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


<style>

#body-content h5 {
    font-size: 1.10rem;
    line-height: 1.75rem;
}

#body-content h4 {
    font-size: 1.15rem;
    line-height: 1.75rem;
}

#body-content h3 {
    font-size: 1.20rem;
    line-height: 1.75rem;
}

#body-content h2 {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

#body-content h1 {
    font-size: 1.50rem;
    line-height: 1.75rem;
}

#body-content p {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

#body-content p {
    font-size: 1.08rem;
    line-height: 1.8;
}

blockquote {
    background: #eeeeeea6;
    padding: 10px 15px;
    border-right: 3px Solid red;
}
.arrow-btn .material-icons {
    font-size: 35px !important;
} 
.slider .arrow-btn {
    height: 35px !important;
}

</style>


  
