<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
 import { ref, onMounted, reactive, defineEmits } from 'vue';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
//  import { useToast } from "vue-toast-notification";
 import userImage from '@/components/plugins/UserImage.vue';

const initialFormState = {
      search: '',
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
 const items = ref([]);
 const more = ref(false);
 const page = ref(1); 
//  const $toast = useToast();
 const emit = defineEmits(['setFollowings']);  
 const follow = (userId) => {
    console.log(userId)
    // useApi().post(`/api/follow/${userId}`)
    //     .then((response) => {
    //         if (response.data.status == 1) {
    //             if (response.data.active == 0) {
    //                 items.value = items.value.filter(item => item.id != userId);
    //             }
    //             getFollowings();
    //             $toast.success(response.data.message);
    //         } else {
    //             $toast.error(response.data.message);
    //         }
    //     });
  }
  
  const getFollowings = (pageId = false) => {
    
    if (!pageId) {
        page.value = 1
        items.value = [];
    }

    useApi().get(`/api/followers?page=${page.value}`, form)
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
                if (!pageId) {
                    emit('setFollowings', items.value, response.data.total);
                }
                page.value++;
            }
        });
    };

  onMounted(() => {
    getFollowings();
  });

</script>

<template>
    <div class="col-12 col-md-7 col-lg-9 order-1 order-md-2 mb-4 mb-md-0">
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
                            {{ $t('site.Choose favorite clubs') }}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card p-3">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 items-end mb-3">
                <div >
                    <VTInput
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
            <div class='grid grid-cols-4 gap-4 my-3'>
                <div v-for="(user, index) in items" :key="index" class='card'>
                    <div class='card-body is-listItem items-center'>
                    <userImage :item="user" />
                    <span class='item-title'>{{ user.nickname }}</span>
                        <a @click="follow(user.id)" class='w-100 btn btn-info text-white'  >{{ $t('site.View') }}</a>
                    </div>
                </div>
            </div>
        </div>


        <div class="card p-3" v-if="more">
            <VTButton 
                :loading="!canSubmit"
                :disabled="!canSubmit"
                class="justify-center btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="getFollowings(true)">
                {{ $t('site.More post')  }}
            </VTButton> 
        </div>
    </div>
</template>