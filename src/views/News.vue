<template>
    <div class="container-xxl">
        <main class="mb-4">
            <div class="row mb-75">
                <horizontal-advertise-component :advertises="advertises[1]"/>
            </div>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <vertical-advertise-component v-if="advertises[7]?.length > 0" :advertises="advertises[7]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="" :title="$t('site.Main page')">{{ $t('site.Main page') }}</a></li>
                                    <li class="breadcrumb-item">
                                        <router-link :to="`/archive/${post?.category?.id}/${post?.category?.title}`" :title="post?.category?.title">
                                            {{ post?.category?.title }}
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
                                <div class="post--header">
                                      <!--  -->

                                    <div class="post--cover ratio ratio-16x9"
                                    :style="`background-image: url('${post?.image?.indexArray['large']}')`">
                                        <div class="post--header--overly"></div>
                                        <div class="post--head-info">
                                            <div class="extend-info">
                                                <span class="post-id">{{ $t('site.News id') }}: {{ post.id }}</span>
                                                <span>
                                                    <span class="post-date">{{ $t('site.Time') }}: {{ formattedDate }}</span>
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
                                                <router-link target="_blank" :to="`/news/${post.id}/${post.slug}`" :title="post.title" class="news">
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

                    <!-- <div class="comment-section">
                        <div class="comment-section--header">
                            <div class="comment-section--title-wrap">
                                <span class="comment-section--title">{{ $t('site.Comments') }}</span>
                                <span class="comment-section--number">{{ $post->comments()->count() }} {{ $t('site.Comment') }}</span>
                            </div>
                            <div class="comment-section--divider"></div>
                        </div>
                        <div class="comment-form">
                            <div id="replay-close" class="replay-close hidden">
                                {{ $t('site.Reply') }}
                                <button class="btn btn-sm btn-warning"><span class="material-icons size-font text-primary"> close </span></button>
                            </div>
                            @include('errors.error')
                            @auth
                            <x-form-creator :form="$form" />
                            @else
                                <a id="comment-text" href="{{ route('login') }}"><button class="btn btn-primary w-100">{{ $t("site.Login please") }}</button></a>
                            @endauth

                        </div>
                        @foreach($comments as $comment)
                        <div class="comment-wrap">
                            <div class="comment">
                                <div class="comment--body">
                                    <div class="commenter-avatar-wrap">
                                        <div class="commenter-avatar">
                                            @if(!empty($comment->user()->profile_photo_path))
                                                <img src="{{ asset(auth()->user()->profile_photo_path) }}" alt="{{ $comment->user->first_name }}" />
                                            @else
                                                <img src="{{ asset('assets/site/images/user-icon.png') }}" alt="{{ $comment->user->first_name }}" />
                                            @endif
                                            <a href="#" class="stretched-link"></a>
                                        </div>
                                    </div>
                                    <div class="comment-text">
                                        <p class="comment-text-pragraph">
                                            <a class="comment-user-text-link" href="#">
                                                <span class="user-name"> {{ $comment->user->first_name }} </span>
                                            </a>
                                            <br>
                                            <span class="comment-text-span">{{ $comment->text }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="comment--footer">
                                    <div class="comment--date">{{ $comment->created_at->diffforhumans() }}</div>
                                    <div class="comment--reactions">
                                        <button data-id="{{ $comment->id }}" class="reply-btn btn vt-btn-white">
                                            <span class="material-icons size-font"> reply </span>
                                            <span>{{ $t('site.Reply') }}</span>
                                        </button>
        {{--                                        <button class="btn vt-btn-white">--}}
        {{--                                            <span class="material-icons size-font">--}}
        {{--                                              thumb_up_alt--}}
        {{--                                            </span>--}}
        {{--                                            <span>10</span>--}}
        {{--                                        </button>--}}
        {{--                                        <button class="btn vt-btn-white is-danger">--}}
        {{--                                            <span class="material-icons size-font">--}}
        {{--                                              thumb_down_alt--}}
        {{--                                            </span>--}}
        {{--                                            <span>2</span>--}}
        {{--                                        </button>--}}
                                    </div>
                                </div>
                            </div>
                            @if(!empty($comment->parents))
                                @foreach($comment->parents as $parent)
                                    <div class="comment">
                                        <div class="comment--body">
                                            <div class="commenter-avatar-wrap">
                                                <div class="commenter-avatar">
                                                    @if(!empty($parent->user()->profile_photo_path))
                                                        <img src="{{ asset($parent->user()->profile_photo_path) }}" alt="user avatar" />
                                                    @else
                                                        <img src="{{ asset('assets/site/images/user-icon.png') }}" alt="user avatar" />
                                                    @endif
                                                    <a href="#" class="stretched-link"></a>
                                                </div>
                                            </div>
                                            <div class="comment-text">
                                                <p class="comment-text-pragraph">
                                                    <a class="comment-user-text-link" href="#">
                                                        <span class="user-name"> {{ $parent->user->first_name }} </span>
                                                    </a>
                                                    <br>
                                                    <span class="comment-text-span">{{ $parent->text }}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="comment--footer">
                                            <div class="comment--date">{{ $parent->created_at->diffforhumans() }}</div>
                                            <div class="comment--reactions">
        {{--                                                <button class="btn vt-btn-white">--}}
        {{--                                                    <span class="material-icons size-font">--}}
        {{--                                                      thumb_up_alt--}}
        {{--                                                    </span>--}}
        {{--                                                    <span>10</span>--}}
        {{--                                                </button>--}}
        {{--                                                <button class="btn vt-btn-white is-danger">--}}
        {{--                                                    <span class="material-icons size-font">--}}
        {{--                                                      thumb_down_alt--}}
        {{--                                                    </span>--}}
        {{--                                                    <span>2</span>--}}
        {{--                                                </button>--}}
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                        @endforeach
                    </div> -->
                </div>
                <div class="col-12 col-lg-3 flex-grow-1 item-column">
                    
                    <full-slider-component :slides="specialPosts"></full-slider-component>

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
                    <full-slider-component :slides="specialVideos"></full-slider-component>
                </div>
            </div>
        </main>
    </div>
  </template>

<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, computed } from 'vue';

  import { useRoute } from 'vue-router';
  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
//   import LiveComponent from '@/components/site/LiveComponent';
//   import MatchComponent from '@/components/site/MatchComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';




  const advertises = ref([]);
  const posts = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);

  const tabItem = ref('latest');
  const post = ref({});

  const route = useRoute();

  const formattedDate = computed(() => {
        const date = new Date(post.value.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
})

  onMounted(() => {

    getPost()
    getAdvertises();
    getPosts();
  });

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getPost = () => {
    useApi().get(`/api/post/${route.params.id}`)
        .then((response) => {
            post.value = response.data;
        });
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

  const changeTab = (id) => {
    tabItem.value = id;
  }


</script>
  