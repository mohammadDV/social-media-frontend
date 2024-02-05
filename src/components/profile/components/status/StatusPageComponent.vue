<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch } from 'vue';
  import statusCardComponent from './StatusCardComponent.vue'
  import { useRoute } from 'vue-router';

    const item = ref([]);
    const loading = ref(false);
    const notFound = ref(false);
    const route = useRoute();

    const getStatus = () => {

        loading.value = true;
         useApi().get(`/api/status/preview/${route.params.id}`)
            .then((response) => {
                item.value = response.data;
            })
            .catch(() => {
                notFound.value = true;
            })
            .finally(() => {
                loading.value = false;
            })
    }

    watch(() => route.params.id, () => {
    if (route.params.id) {
        getStatus();
    } 
  });
    
    onMounted(() => {
        getStatus();
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
    <div v-if="notFound">
        <H2 class="text-center text-blue">{{ $t('site.nothing here') }}</H2>
    </div>
    <div v-else class="tweet-reel">
        <div class="card tweet-card">
            <statusCardComponent :status="item"></statusCardComponent>
        </div>  
    </div>
</template>