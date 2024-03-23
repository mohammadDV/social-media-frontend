<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
 import {helper} from '@/utils/helper.ts';
 import { ref, onMounted, reactive } from 'vue';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import { useToast } from "vue-toast-notification";
 import { useRoute } from 'vue-router';
 import userImage from '@/components/plugins/UserImage.vue';

 
 const $toast = useToast();

 const initialFormState = {
      search: '',
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
 const items = ref([]);
 const more = ref(false);
 const page = ref(1); 
 const route = useRoute();

  const block = (userId) => {

    useApi().post(`/api/block/${userId}`)
        .then((response) => {
            if (response.data.status == 1) {
                if (response.data.block == 0) {
                    items.value = items.value.filter(item => item.id != userId);
                }
                getUsers();
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
    }

  
  const getUsers = (pageId = false) => {
    
    if (!pageId) {
        page.value = 1
        items.value = [];
    }

    let url = `/api/block-users?page=${page.value}`;

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
    getUsers();
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
                        <li class="breadcrumb-item active">
                            {{ $t('site.Blocked users') }}
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
                        @click="getUsers()">
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
                <div v-for="(item, index) in items" :key="index" class='card'>
                    <div class='card-body is-listItem items-center'>
                        <router-link class="text-decoration-none" :to="`/member/${item.id}`" :title="item.nickname">
                            <userImage :item="item" addclass="rounded-full w-[120px] h-[120px]"/>
                        </router-link>
                    <span class='item-title'>{{ item.nickname }}</span>
                        <div class="flex gap-2 w-full">
                            <div @click="block(item.id, 'accepted')" class='w-full btn btn-success text-white'>{{ $t('site.Unblock') }}</div>
                        </div>
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
</template>../../utils/api.js