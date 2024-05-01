<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
 import {helper} from '@/utils/helper.ts';
 import { ref, onMounted, reactive, defineProps } from 'vue';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import { useToast } from "vue-toast-notification";
 import { useRoute } from 'vue-router';
 import userImage from '@/components/plugins/UserImage.vue';
 import { useI18n } from "vue-i18n";
  
 const { t } = useI18n();

 const props = defineProps({
    user: {
        type: Object
    }
 })
 
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
//  const $toast = useToast(); 

  const follow = (userId, status) => {

    useApi().post(`/api/follow-chaneg-status/${userId}`, {
        status: status
    })
        .then((response) => {
            if (response.data.status == 1) {
                if (response.data.active == 0) {
                    items.value = items.value.filter(item => item.id != userId);
                }
                getFollowings();
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
    }

  
  const getFollowings = (pageId = false) => {

    if (props.user?.is_private == 1) {
        return;
    }
    
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

    window.document.title =   `${t('site.Followers')} | ${t('site.Website name')}`;
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
                        <li class="breadcrumb-item active">
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
                <div v-for="(item, index) in items" :key="index" class='card'>
                    <div class='card-body is-listItem items-center'>
                        <router-link class="text-decoration-none" :to="`/member/${item.follower.id}`" :title="item.follower.nickname">
                            <userImage :item="item.follower" addclass="rounded-full w-[120px] h-[120px]"/>
                        </router-link>
                    <span class='item-title'>{{ item.follower.nickname }}</span>
                        <div v-if="item.status == 'pending'" class="flex gap-2 w-full">
                            <div @click="follow(item.follower.id, 'accepted')" class='w-full btn btn-success text-white'>{{ $t('site.Accept') }}</div>
                            <div @click="follow(item.follower.id, 'rejected')" class='w-full btn btn-danger text-white'>{{ $t('site.Reject') }}</div>
                        </div>
                        <router-link v-else class="w-100 btn btn-info text-white" :to="`/member/${item.follower.id}`" :title="item.follower.nickname">
                            {{ $t('site.View') }}
                        </router-link>
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