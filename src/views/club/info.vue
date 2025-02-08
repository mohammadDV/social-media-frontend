<script lang="ts" setup>
 
  import {useApi} from '../../utils/api';
  import { ref, onMounted, watch} from "vue";
  import { useRoute } from 'vue-router';
  import jalaliMoment from 'moment-jalaali';
  import VTButton from '@/elements/VTButton'; 
//   import type { Header, Item, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table";
//   import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";
//   import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
  import { useToast } from "vue-toast-notification";
  import { useI18n } from "vue-i18n";  
  import { useAuthStore } from '../../stores/auth';

  const { t } = useI18n();


const authStore = useAuthStore();
const info = ref([]);
const posts = ref([]);
const videos = ref([]);
const clubs = ref([]);
const matches = ref([]);
const category = ref([]);

const $toast = useToast();

const route = useRoute();
const active = ref(false);

const getData = () => {
useApi().get(`/api/club/${route.params.id}`)
    .then((response) => {
        category.value = response.data?.category;
        info.value = response.data?.info;
        posts.value = response.data?.posts;
        videos.value = response.data?.videos;
        clubs.value = response.data?.clubs;
        matches.value = response.data?.matches;

        window.document.title =   `${info.value?.title} | ${t('site.Website name')}`;
    });
}

const follow = (clubId: Number) => {
    useApi().post(`/api/favorite/clubs/${clubId}`)
        .then((response) => {
            if (response.data?.status == 1) {
                active.value = response.data.active;
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
  }

const followers = ref([]);
const page = ref(1);
const more = ref(false);
const loading = ref(false);

const getFollowers = () => {
    loading.value = true;

    if (page.value == 1) {
        followers.value = [];
    }

    useApi().post(`/api/club/${route.params.id}/followers`)
        .then((response) => {

            followers.value.push(...response.data.data);

            if (response.data.total > page.value * response.data.per_page) {
                more.value = true;
            } else {
                more.value = false;
            }

            page.value++;
        })
        .finally(() => {
            loading.value = false;
        })
}

    watch(() => route.params.id, () => {
        if (route.params.id) {
            page.value = 1;
            getData();
            getFollowers();
        } 
    });

    const getActive = () => {
        useApi().get(`/api/profile/clubs/active/${route.params.id}`)
            .then((response) => {
                active.value = response.data?.active;
            });
        }

    const loginWarning = () => {
        $toast.error(t('site.Please login for follow the club'))
    }

    onMounted(() => {
        getData();
        getFollowers();
        if (authStore?.user?.id) {
            getActive();
        }
    });



</script>

<template>

    <div class="main-gradient-info mb-10 mt-5" >
        <div class="relative container">
            <div class="flex p-3">                
                <div>
                    <p class="mb-2 text-primary">{{ info?.sport?.title }}</p>
                    <h1 class="ml-5 text-white">
                        {{ info?.title }}
                    </h1>
                </div>
                <div class="flex flex-col items-center text-white">
                    <p class="text-md text-white mb-0 p-2 border-gray-300">۸۰۰ نفر </p>
                    <VTButton v-if="authStore?.user?.id > 0"
                        :loading="loading"
                        :disabled="loading"
                        class="w-full justify-center btn-outline-secondary btn-sm" 
                        size="medium"
                        color="primary"  
                        @click="follow(info?.id)">

                        {{ active ? $t('site.Unfollow') : $t('site.Follow') }}
                    </VTButton>
                    <VTButton v-else
                        @click="loginWarning"
                        class="w-full justify-center btn-outline-secondary btn-sm" 
                        size="medium"
                        color="primary">
                        {{ $t('site.Follow') }}
                    </VTButton>
                </div>
            </div>
            <div class="absolute left-0 bottom-0 top-0 m-[20px] flex gap-4 flex-col items-center">
                <img class="w-[150px] h-[150px]" :src="info.image" alt="">
            </div>
        </div>
    </div>
    
  <div class="container">
    <div class="text-lg my-[20px]">
      <p>{{ $t("site.Club latest results") }} {{ info?.title }}</p>
    </div>
    <div class="grid grid-cols-2 grid-flow-row-reverse gap-2 md:grid-cols-6">
        <div v-for="(match, index) in matches" :key="index" class="rounded-md w-full bg-white">
            <div class="flex flex-col bg-vt-dark rounded-md text-white p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img class="w-[20px] h-[20px]" :alt="match?.step?.league?.title" :src="match?.step?.league?.image">
                    <span>{{ match?.step?.league?.title }}</span>
                </div>
            </div>
            <div class="flex flex-col gap-[10px] p-[10px]">
                <div class="flex justify-between">
                    <router-link class="text-gray-500 text-decoration-none flex gap-2 items-center justify-content-center" :to="`/club/${match?.team_home?.id}`" :title="match?.team_home?.title">
                        <img class="rounded-full w-[25px] h-[25px]" :alt="match?.team_home?.title"  :src="match?.team_home?.image">
                        <span>{{ match?.team_home?.title }}</span>
                    </router-link>
                    <div class="">{{ match?.hsc }}</div>
                </div>
                <div class="flex justify-between">
                    <router-link class="text-gray-500 text-decoration-none flex gap-2 items-center justify-content-center" :to="`/club/${match?.team_away?.id}`" :title="match?.team_away?.title">
                        <img class="rounded-full w-[25px] h-[25px]" :alt="match?.team_away?.title" :src="match?.team_away?.image">
                        <span>{{ match?.team_away?.title }}</span>
                    </router-link>
                    <div class="">{{ match?.asc }}</div>
                </div>
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span class="text-xs">{{ jalaliMoment(match.date).format('dddd jD jMMMM - HH:mm') }}</span>            
                </div>
            </div>        
        </div>
    </div>
    <div class="md:flex mt-2 gap-3" :key="info?.id">
        <div class="md:flex-auto md:w-[30%]">
            <div class="bg-white rounded-md mr-2 mb-3 mt-2 sm:flex sm:flex-col xs:flex-col xs:mr-0 sm:mr-0 md:mr-0">
                <h3 class="p-3 m-0 mr-[3px] pr-[3px] text-lg bg-vt-dark text-white rounded-t-md ">جدول رده بندی</h3>
                <div class="m-2 p-2">
                    <table class="w-full">
                        <thead class="w-full">
                            <tr class=" gap-[10px]">
                                <th class="w-[15%] pb-3">{{ $t('site.Row') }}</th>
                                <th class="w-[55%] pb-3">{{ $t('site.Team') }}</th>
                                <th class="w-[20%] pb-3">{{ $t('site.Game count') }}</th>
                                <th class="w-[15%] pb-3">{{ $t('site.Points') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(club, index) in clubs" :key="index" 
                                :class="{'bg-[#d1d5db]' : club.id === info.id}">
                                <td class="px-2 py-2 text-sm ">{{ index + 1 }}</td>
                                <td class="py-2 flex">
                                    <img class="rounded-full w-[25px] h-[25px] mx-1" :alt="club.title" width="30" :src="club.image">
                                    <router-link :title="club.title" :to="`/club/${club.id}`" class="no-underline text-base text-black">
                                        {{ club.title }}
                                    </router-link>
                                </td>
                                <td class="py-2 text-sm ">{{ club?.pivot?.games_count }}</td>
                                <td class="py-2 text-sm ">{{ club?.pivot?.points }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="bg-white rounded-md mr-2 mb-2 mt-2 pb-1 xs:mr-0 sm:mr-0 md:mr-0">
                <h3 class="p-3 m-0 mr-[3px] pr-[3px] text-lg bg-vt-dark text-white rounded-t-md ">{{ $t('site.Fans') }} </h3>
                <div class="p-2 max-h-[600px] overflow-auto">
                    <div v-for="(follower, index) in followers" :key="index" class="mb-2 p-2 bg-[#f0f8ff] rounded-md">
                        <div class="flex gap-6">
                            <div>
                                <router-link v-if="authStore?.user?.id > 0" :to="`/member/${follower.id}`" :title="follower.nickname" class="no-underline">
                                    <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " :src="follower.profile_photo_path" alt="">
                                </router-link>
                                <a v-else @click="loginWarning" class="cursor-pointer no-underline">
                                    <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " :src="follower.profile_photo_path" alt="">
                                </a>
                            </div>
                            <div class="flex-col flex-[50%] gap-9">
                                <div class="flex justify-content-between align-items-center mb-2">
                                    <router-link v-if="authStore?.user?.id > 0" :to="`/member/${follower.id}`"  :title="follower.nickname" class="no-underline text-base text-black">{{ follower.nickname }}</router-link>
                                    <a v-else @click="loginWarning" class="cursor-pointer no-underline text-base text-black">{{ follower.nickname }}</a>
                                    <!-- <button class="border-1 border-solid bg-primary text-white px-2 py-1 rounded-md hover:bg-[#4e87c3e6]">{{ $t('site.View') }}</button> -->
                                </div>
                                <div class="flex justify-start gap-1  flex-wrap">
                                    <router-link v-for="(club, index) in follower?.clubs" :key="index" :to="`/club/${club.id}`" class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-vt-dark rounded-md">
                                        <div class="flex">
                                            <span class="material-symbols-outlined text-[#ff7322]">#</span>
                                            <span class="">{{ club.title }}</span>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full" v-if="more">
                        <VTButton 
                            :loading="loading"
                            :disabled="loading"
                            class="w-full justify-center btn-outline-secondary btn-sm" 
                            size="medium"
                            color="primary"  
                            @click="getFollowers()">
                            {{ $t('site.More post')  }}
                        </VTButton> 
                    </div>
                </div>
            </div>
        </div>
        <div class="search-material md:flex-auto md:w-[70%]">
            <div class="flex-auto flex-wrap mt-2 pb-2">
            <!-- <div class="flex-auto flex-wrap mt-2 border-b-2 border-dotted border-[#afb1b9] pb-2"> -->
                <div class="flex justify-between bg-white rounded-md mb-2">
                    <h3 class="p-4 m-0 text-lg">{{ $t("site.Club news") }} {{ info?.title }}</h3>
                    <router-link :to="`/category/${category?.id}/${category?.slug}`" 
                        class="text-decoration-none p-4 m-0 text-lg text-blue-400 hover:text-blue-600">
                        {{ $t('site.Display all') }}
                    </router-link>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full sm:grid sm:grid-cols-1 xs:grid xs:grid-cols-1">
                    <div class="cursor-pointer" v-for="(post, index) in posts" :key="index">
                        <router-link :to="post?.type == 1 ? `/video/${post.id}/${post.slug}` : `/news/${post.id}/${post.slug}`" class="text-decoration-none flex p-2 flex-nowrap flex-wrap items-center justify-center rounded-md bg-white  hover:bg-gray-200 xs:flex xs:flex-col">
                            <div class="flex-none">
                                <img class="rounded-md h-[100px]" :src="post.image" alt="img">
                            </div>
                            <div class="flex-grow p-2">
                                <h3 class="h-[20px] text-dark overflow-hidden no-underline text-base"  href="">{{ post.title }}</h3>
                                <p class="text-gray-400 text-xs h-[29px] overflow-hidden w-full"> {{ post.summary }} </p>
                                <div id="search-material" class="flex gap-6 justify-between">
                                    <div class="flex gap-2">
                                    <div class="view text-gray-400 text-xs">
                                        <span class="text-primary material-icons text-sm">visibility</span>
                                        {{ post.view }}
                                    </div>
                                    </div>
                                    <div class="time text-gray-400 text-xs">
                                    <span class="text-primary material-icons text-sm">schedule</span>
                                    {{ jalaliMoment(post.created_at).format('dddd jD jMMMM') }}
                                </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- <div class="flex-auto flex-wrap mb-3 mt-2 border-b-2">
                <div class="flex justify-between bg-white rounded-md mb-2">
                    <h3 class="p-4 m-0 text-lg">{{ $t("site.Club videos") }} {{ info?.title }}</h3>
                    <router-link :to="`/category/${category?.id}/${category?.slug}`" 
                        class="text-decoration-none p-4 m-0 text-lg text-blue-400 hover:text-blue-600">
                        {{ $t('site.Display all') }}
                    </router-link>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <router-link :to="post?.type == 1 ? `/video/${post.id}/${post.slug}` : `/news/${post.id}/${post.slug}`" v-for="(post, index) in videos" :key="index" class="text-decoration-none flex-col p-2 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div>
                            <img class="rounded-md w-full h-[150px]" :src="post.image" :alt="post.title">
                        </div>
                        <div class="flex-grow p-2">
                            <h3 class="text-dark h-[20px] overflow-hidden no-underline text-base"  href="">{{ post.title }}</h3>
                            <p class="text-gray-400 text-xs h-[29px] overflow-hidden w-full"> {{ post.summary }} </p>
                            <div id="search-material" class="flex gap-6 justify-between">
                                <div class="flex gap-2">
                                <div class="view text-gray-400 text-xs">
                                    <span class="text-primary material-icons text-sm">visibility</span>
                                    {{ post.view }}
                                </div>
                                </div>
                                <div class="time text-gray-400 text-xs">
                                <span class="text-primary material-icons text-sm">schedule</span>
                                {{ jalaliMoment(post.created_at).format('dddd jD jMMMM') }}</div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div> -->
        </div>
    </div>
  </div>
</template>


<style>

.main-gradient-info {    
    margin-top: 175px;
  border: 1px solid #182848;
  background: linear-gradient(#2c3652, #191e2f);
  color: white;
}

.main-gradient-info:hover {
  transition: .3;
  background: #182848;
  border: 1px solid #515761;
}

</style>
