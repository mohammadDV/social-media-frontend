<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import statusCardCOmponent from './StatusCardComponent.vue'

    const statuses = ref([]);

    const getStatuses = () => {
         useApi().get('/api/statuses')
            .then((response) => {
                console.log(statuses);
                statuses.value = response.data.data;
            })
    }
    
    onMounted(() => {
        getStatuses();
    });

</script>

<template>
    <div class="tweet-reel">
        <div v-for="(status, index) in statuses" :key="index" class="card tweet-card">
            <statusCardCOmponent 
                :status="status"
            ></statusCardCOmponent>
        </div>
    </div>
</template>