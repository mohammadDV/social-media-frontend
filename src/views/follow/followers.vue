<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
 import {helper} from '@/utils/helper.ts';
 import { ref, onMounted, reactive } from 'vue';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
//  import { useToast } from "vue-toast-notification";

import { useRoute, useRouter } from 'vue-router';
 import userImage from '@/components/plugins/UserImage.vue';

const initialFormState = {
      search: '',
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
 const items = ref([]);
 const more = ref(false);
 const page = ref(1); 
 const route = useRoute();
 const router = useRouter();
//  const $toast = useToast(); 
 const follow = (userId) => {
    router.push({ name: 'member', params: { id: userId } })
  }
  
  const getFollowings = (pageId = false) => {
    
    if (!pageId) {
        page.value = 1
        items.value = [];
    }

    let url = `/api/followers?page=${page.value}`;
    if (route?.params?.id?.length > 0) {
        url = `/api/followers/${route?.params?.id}?page=${page.value}`;
    }

    useApi().get(url, form)
        .then((response) => {
            if (response.data) {

                if (response.data.data?.length > 0) {
                    if (pageId) {
                        items.value.push(...response.data.data);
                    } else {
                        items.value = response.data.data;
                    }
                }

                if (response.data.total > page.value * response.data.per_page) {
                    more.value = true;
                } else {
                    more.value = false;
                }
                page.value++;
            }
        });
    };

  onMounted(() => {

    helper().goToTop();
    getFollowings();
  });

</script>

<template>
    <div :class="{
        'col-12 col-md-7 order-1 order-md-2 mb-4 mb-md-0' : true,
        'col-lg-8' : route?.params?.id?.length > 0,
        'col-lg-9' : !route?.params?.id?.length,
    }"  >
        <div class="card vt-news-card breadcrumb-card mb-3">
            <div class="card-body">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/profile" :title="$t('site.Profile')">
                                {{ $t('site.Profile') }}
                            </router-link>
                        </li>
                        <li v-if="!route?.params?.id?.length" class="breadcrumb-item active">
                            {{ $t('site.Followers') }}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card p-3">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 items-end mb-3">
                <div >
                    <VTInput
                        required
                        class="mt-2"
                        :is-vt="true"
                        name="search"
                        v-model="form.search"
                        :label="$t('site.Search')"/>
                </div>
                <div >
                    <VTButton 
                        :loading="!canSubmit"
                        :disabled="!canSubmit"
                        class="justify-center btn-outline-secondary btn-sm mt-3" 
                        size="medium"
                        color="primary"  
                        @click="getFollowings()">
                        {{ $t('site.Search') }}
                    </VTButton> 
                </div>
            </div>
        </div>

        <div>
            <div :class="{
                'grid gap-3 grid-cols-4 my-3' : true,
                'grid-cols-3' : route?.params?.id?.length > 0,
                '' : !route?.params?.id?.length,
            }">
                <div v-for="(user, index) in items" :key="index" class='card'>
                    <div class='card-body is-listItem items-center'>
                    <userImage :item="user" addclass="rounded-full w-[120px] h-[120px]"/>
                    <span class='item-title'>{{ user.nickname }}</span>
                        <a @click="follow(user.id)" class='w-100 btn btn-info text-white'  >{{ $t('site.View') }}</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full pt-2" v-if="more">
            <VTButton 
                :loading="!canSubmit"
                :disabled="!canSubmit"
                class="w-full justify-center btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="getFollowings(true)">
                {{ $t('site.More post')  }}
            </VTButton> 
        </div>
    </div>
</template>