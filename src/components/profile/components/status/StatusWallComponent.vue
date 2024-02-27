<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch, defineProps } from 'vue';
  import statusCardComponent from './StatusCardComponent.vue'
  import { useRoute } from 'vue-router';
  import VTButton from '@/elements/VTButton'; 

    const props = defineProps({
        userId: {
            type: Number,
            default: 0
        }
    });
    const items = ref([]);
    const page = ref(1);
    const more = ref(false);
    const loading = ref(false);
    const route = useRoute();

    const getStatuses = () => {

        loading.value = true;
        let url = `/api/statuses?page=${page.value}`;

        if (props.userId > 0) {
            url = `/api/status/all/${props.userId}?page=${page.value}`;
        } else if(route?.params?.id?.length > 0) {
            url = `/api/statuses/${route?.params?.id}?page=${page.value}`;
        }

        if (page.value == 1) {
            items.value = [];
        }

         useApi().get(url)
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

    watch(() => route.params.id, () => {
    if (route.params.id) {
        page.value = 1;
        getStatuses();
    } 
  });

  const updateData = () => {
    page.value = 1;
    getStatuses();
  }
    
    onMounted(() => {
        getStatuses();
    });

</script>

<template>
    <div v-if="route?.params?.id?.length > 0" class="card vt-news-card breadcrumb-card mb-3">
        <div class="card-body">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/profile" :title="$t('site.Profile')">
                            {{ $t('site.Profile') }}
                        </router-link>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="tweet-reel">
        <div v-for="(status, index) in items" :key="index" class="card tweet-card">
            <statusCardComponent @updateData="updateData"
                :status="status"
            ></statusCardComponent>
        </div>
        <div class="w-full pt-2" v-if="more">
            <VTButton 
                :loading="loading"
                :disabled="loading"
                class="w-full justify-center btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="getStatuses()">
                {{ $t('site.More post')  }}
            </VTButton> 
        </div>
    </div>
</template>