<script setup>

  import { onMounted, ref, defineEmits } from 'vue';
  import LeftSideComponent from "@/components/profile/include/LeftSideComponent.vue";
  import {useApi} from '@/utils/api.ts';
  import VTButton from '@/elements/VTButton'; 
  import jalaliMoment from 'moment-jalaali';

  const emit = defineEmits(['updateFollowings']); 

  const updateFollowings = () => {
    emit('updateFollowings')
  }

  const items = ref([]);
  const page = ref(1);
  const more = ref(false);
  const loading = ref(false);
  const getItems = () => {

    loading.value = true;

    if (page.value == 1) {
        items.value = [];
    }

    useApi().get(`/api/notifications?page=${page.value}`)
        .then((response) => {

            items.value.push(...response.data.data);

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
    
  onMounted(() => {
    getItems();
  });

</script>

<template>
    <div class="col-12 col-lg-8 col-xl-6">
        <div class="tab-content" id="feedTypeContent">
            <div class="tab-pane fade show active" id="tweet-pane" role="tabpanel" aria-labelledby="tweet-tab">
                <div class="card vt-news-card breadcrumb-card mb-3">
                    <div class="card-body">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/profile" :title="$t('site.Profile')">
                                        {{ $t('site.Profile') }}
                                    </router-link>
                                </li>
                                <li class="breadcrumb-item">
                                    {{ $t('site.Notification') }}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div class="tweet-reel">
                    <div v-for="(item, index) in items" :key="index" class="card tweet-card">
                        <div class="card-body">
                            <div class="tweet-user-avatar">
                                <router-link v-if="item?.model?.profile_photo_path?.length > 0 && !item.is_admin" class="text-black text-decoration-none" :to="`/member/${item?.model?.id}`">
                                    <img class="rounded-full w-[120px] h-[120px]" :src="item.model.profile_photo_path" :alt="item.nickname" />
                                </router-link>
                                <a v-else>
                                    <img class="rounded-full w-[120px] h-[120px]" src="/assets/site/images/user-icon.png" :alt="$t('site.Admin')" />
                                </a>
                            </div>
                            <div class="tweet-info">
                                <div class="flex tweet-info-head">
                                    <span v-if="item?.model?.nickname?.length > 0 && !item.is_admin" class="tweet-user-name">
                                        <router-link class="text-black text-decoration-none" :to="`/member/${item?.model?.id}`">{{ item?.model?.nickname }}</router-link>
                                    </span>
                                    <span v-else class="tweet-user-name">
                                        <a class="text-black text-decoration-none">{{ $t('site.Admin') }}</a>
                                    </span>
                                    <span class="tweet-date">{{ jalaliMoment(item.created_at).fromNow() }}</span>
                                </div>
                                <div class="tweet-body pt-2">
                                    <router-link v-if="item?.link?.length > 0" class="mt-2 text-black text-decoration-none" :to="item?.link">
                                        {{ item?.message }}
                                        <img v-if="item?.file?.length > 0" :src="item.file"/>
                                    </router-link>
                                    <template v-else>
                                        <p>
                                            {{ item?.message }}
                                        </p>
                                        <br>
                                        <div class="mx-5 p-2 border-t">
                                            <p class="truncate">
                                                {{  item?.model?.text }}
                                            </p>
                                            <img v-if="item?.model?.file?.length > 0" :src="item?.model?.file"/>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full pt-2" v-if="more">
                        <VTButton 
                            :loading="loading"
                            :disabled="loading"
                            class="w-full justify-center btn-outline-secondary btn-sm" 
                            size="medium"
                            color="primary"  
                            @click="getItems()">
                            {{ $t('site.More post')  }}
                        </VTButton> 
                    </div>
                </div>
            </div>
            <div class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news-pane">
            </div>
        </div>
    </div>
    <LeftSideComponent @updateFollowings="updateFollowings"/>
</template>