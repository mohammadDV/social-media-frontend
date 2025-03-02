<script setup>

  import { defineProps, ref } from 'vue';

  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';

  defineProps({
        latest: {
            type: Array,
            required: true
        },
        challenged: {
            type: Array,
            required: true
        },
        popular: {
            type: Array,
            required: true
        }
    });

  const tabItem = ref('latest');

  const changeTab = (id) => {
    tabItem.value = id;
  }


</script>
<template>
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
        <div class="card-body max-height-sm">
            <div class="card-body-inner">
                <div class="tab-content" id="hottiesContent">
                    <div v-if="tabItem == 'latest'" class="tab-pane fade show active"  id="latest"  role="tabpanel"  aria-labelledby="latest-tab">
                        <ul v-if="latest?.length > 0" class="news-list">
                            <li v-for="(post, index) in latest" :key="index" class="news-item">
                                <span class="material-icons size-font text-primary">
                                double_arrow
                                </span>
                                <router-link :to="post?.type == 1 ? `/video/${post.id}/${post.slug}` : `/news/${post.id}/${post.slug}`"  :title="post.title">
                                    {{ post.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div v-if="tabItem == 'challenged'" class="tab-pane fade show active"  id="conv"  role="tabpanel"  aria-labelledby="conv-tab">
                        <ul v-if="challenged?.length > 0" class="news-list">
                            <li v-for="(post, index) in challenged" :key="index" class="news-item">
                                <span class="material-icons size-font text-primary">
                                double_arrow
                                </span>
                                <router-link :to="post?.type == 1 ? `/video/${post.id}/${post.slug}` : `/news/${post.id}/${post.slug}`"  :title="post.title">
                                    {{ post.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div v-if="tabItem == 'popular'" class="tab-pane fade  show active" id="hot" role="tabpanel" aria-labelledby="hot-tab">
                        <ul v-if="popular?.length > 0" class="news-list">
                            <li v-for="(post, index) in popular" :key="index" class="news-item">
                                <span class="material-icons size-font text-primary">
                                double_arrow
                                </span>
                                <router-link :to="post?.type == 1 ? `/video/${post.id}/${post.slug}` : `/news/${post.id}/${post.slug}`"  :title="post.title">
                                    {{ post.title}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>

  <style scoped>

    .nav-item:not(:last-child) {
        margin-inline-end: 0;
    }
  </style>

  