<script setup>

    import { defineProps, defineEmits} from 'vue';
    import {useApi} from '@/utils/api.ts';
    // import userImage from '@/components/plugins/UserImage.vue';

    const emit = defineEmits(['updateMembers']);

    defineProps({
        members: {
            type: Array,
            require: true
        }
    });

    const followUser = (id) => {
        useApi().post(`/api/follow/${id}`)
        .then(() => {
            emit('updateMembers');
        })
    };

</script>


<template>
    <div class="card-body">
    <div v-for="(follower, index) in members" :key="index" class="mb-2 p-2 bg-gray-100 hover:bg-blue-100 rounded-md">
        <div class="flex gap-6">
            <div>
                <router-link :to="`/member/${follower.id}`" class="no-underline">
                    <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " :src="follower.profile_photo_path" alt="">
                </router-link>
            </div>
            <div class="flex-col flex-[50%] gap-9">
                <div class="flex justify-content-between align-items-center mb-2">
                    <router-link :to="`/member/${follower.id}`" class="no-underline text-base text-black">{{ follower.nickname }}</router-link>
                    <!-- <button class="border-1 border-solid bg-primary text-white px-2 py-1 rounded-md hover:bg-[#4e87c3e6]">{{ $t('site.View') }}</button> -->
                    <button v-if="follower?.clubs?.length > 0" @click="followUser(follower.id)" class="btn btn-primary btn-sm">
                        {{ $t('site.Follow') }}
                    </button>
                </div>
                <div class="flex justify-start gap-1  flex-wrap">
                    <button v-if="!follower?.clubs?.length > 0" @click="followUser(follower.id)" class="btn btn-primary btn-sm">
                        {{ $t('site.Follow') }}
                    </button>
                    <router-link v-for="(club, index) in follower?.clubs" :key="index" :to="`/club/${club.id}`" class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-vt-dark rounded-md">
                        <div class="flex">
                            <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                            <span class="">{{ club.title }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>