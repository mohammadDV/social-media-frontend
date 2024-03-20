<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, watch, defineProps } from 'vue';
  import statusCardComponent from './StatusCardComponent.vue'
  import { useRoute } from 'vue-router';
  import VTButton from '@/elements/VTButton';
  import VTModal from '@/elements/VTModal.vue'
  import { useAuthStore } from '@/stores/auth.ts';
  import { useToast } from "vue-toast-notification";
  import VTTextArea from '@/elements/VTTextArea';

  
  const authStore = useAuthStore();

  const isModalVisible = ref(false);
  const message = ref('');
  const showModal = () => {
    isModalVisible.value = true;
  } 

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

    const getStatuses = () => {

        if (props.user?.is_private == 1) {
            return;
        }

        loading.value = true;
        let url = `/api/statuses`;

        if (props.userId > 0) {
            if (props.tab == 3) {
                url = `/api/status/favorite/${props.userId}`;
            } else {
                url = `/api/status/all/${props.userId}`;
            }
        } else if(route?.params?.id?.length > 0) {
            url = `/api/statuses/${route?.params?.id}`;
        }

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
        getStatuses();
    } 
  });

  const updateData = () => {
    page.value = 1;
    getStatuses();
  }


  const closeModal = () => {
    message.value = '';
    isModalVisible.value = false;
  };


  const $toast = useToast();
  const send = () => {
    if (route.params.id) {
        useApi().post(`/api/profile/chats/${route.params.id}`, {
            message: message.value, 
        })
        .then((response) => {
        if (response.data.status) {
            $toast.success(response.data.message);
            closeModal()
        }
        })
        .catch(error => {
            if (error.response.data.status == 0) {
                $toast.error(error.response.data.message);
            }
        });
    }
  };
    
    onMounted(() => {
        getStatuses();
    });

</script>

<template>
    <!-- <div v-if="route?.params?.id?.length > 0" class="card vt-news-card breadcrumb-card mb-3">
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
    </div> -->
    <div v-if="route?.params?.id?.length > 0 && route?.params?.id != authStore.user.id" class="card posting-card">
            <div class="card-body">
                <div class="post-btn-container">
                <button @click="showModal" class="btn input-is-btn">
                    {{ $t('site.Send a private messasge') }}
                </button>
                </div>
            </div>
        </div>
    <div v-if="user?.is_private != 1" class="tweet-reel">
        <div v-for="(status, index) in items" :key="index" class="card tweet-card">
            <statusCardComponent 
                @updateData="updateData"
                :status="status"
                :tab="tab"
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


    <VTModal v-if="isModalVisible" @close="closeModal" :title="$t('site.Send a private messasge')">
        <div class="w-[300px] sm:w-[600px]">
            <div class="mb-3">
                <VTTextArea
                    name="text"
                    rows="4"
                    v-model="message"
                    :disabled="false"
                    request-name="ChatRequest"
                    :placeholder="$t('site.Send a private messasge')"
                    />
            </div>
            <VTButton 
                class="btn btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="send()">
                {{ $t('site.Save') }}
            </VTButton>  
            
        </div>
    </VTModal>
</template>