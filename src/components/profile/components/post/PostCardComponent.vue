<script setup>

  import { defineProps } from 'vue';
  import userImage from '@/components/plugins/UserImage.vue';
  import jalaliMoment from 'moment-jalaali';

    defineProps({
        post: {
            type: Object,
            require: true
        },
        tab: {
            type: Number,
            default: 1
        }
    });
    
</script>

<template>
    <div class="p-3">
        <div class="flex gap-3">
            <div class="">
                <userImage addclass="w-[50px] h-[50px] rounded-full" :item="post?.user" />
            </div>
            <div class="flex-1 mt-2">
                <div class="tweet-user-name">
                    <router-link class="text-black text-decoration-none" :to="`/member/${post?.user?.id}`">{{ post?.user?.nickname }}</router-link>
                </div>
                <div class="tweet-date">
                    {{ jalaliMoment(post.created_at).fromNow() }}
                </div>
            </div>
        </div>
        <div class="tweet-body mt-2 p-2">
            <router-link class="text-black text-decoration-none" :title="post?.title" :to="post?.type == 1 ? `/video/${post.id}/${post.slug}` : `/news/${post.id}/${post.slug}`">
                {{ post?.title }}
                <img v-if="post?.image?.length > 0" v-lazy="post.image"/>
            </router-link>
        </div>
    </div>
</template>