<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch, defineProps } from 'vue';
  import postsCardComponent from './PostCardComponent.vue'
  import { useRoute } from 'vue-router';
  import VTButton from '@/elements/VTButton';

    const props = defineProps({
        userId: {
            type: Number,
            default: 0
        },
        tab: {
            type: Number,
            default: 1
        },
        user: {
            type: Object
        }
    });
    const items = ref([]);
    const page = ref(1);
    const more = ref(false);
    const loading = ref(false);
    const route = useRoute();

    const getPosts = () => {

        if (props.user?.is_private == 1) {
            return;
        }

        loading.value = true;
        let url = `/api/post/all/${route?.params?.id}`;

        if (page.value == 1) {
            items.value = [];
        }

        let pageQuery = `?page=${page.value}`;


         useApi().get(url + pageQuery)
            .then((response) => {

                if (response.data?.data) {

                    items.value.push(...response.data.data);
    
                    if (response.data.total > page.value * response.data.per_page) {
                        more.value = true;
                    } else {
                        more.value = false;
                    }
    
                    page.value++;
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }

    watch(() => route.params.id, () => {
    if (route.params.id) {
        page.value = 1;
        getPosts();
    } 
  });

    
    onMounted(() => {
        getPosts();
    });

</script>

<template>

    <div v-if="user?.is_private != 1" class="tweet-reel">
        <div v-for="(post, index) in items" :key="index" class="card tweet-card">
            <postsCardComponent :post="post"></postsCardComponent>
        </div>
        <div class="w-full pt-2" v-if="more">
            <VTButton 
                :loading="loading"
                :disabled="loading"
                class="w-full justify-center btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="getPosts()">
                {{ $t('site.More post')  }}
            </VTButton> 
        </div>
    </div>
</template>