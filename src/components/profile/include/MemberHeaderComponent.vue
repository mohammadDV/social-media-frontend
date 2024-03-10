<script setup>

import {useApi} from '@/utils/api.ts';
import { onMounted, ref, watch } from 'vue';
import userImage from '@/components/plugins/UserImage.vue'
import { useRoute } from 'vue-router';
import { useToast } from "vue-toast-notification";
import { useAuthStore } from '@/stores/auth.ts';

const authStore = useAuthStore();
const $toast = useToast();  
const route = useRoute();
const active = ref(false);

const getUser = () => {
    useApi().get(`/api/user/info/${route.params.id}`)
        .then((response) => {
            user.value = response.data;
        })
}

const isFollower = () => {
    useApi().get(`/api/is-follower/${route.params.id}`)
        .then((response) => {
            active.value = response.data.active;
        })
}

const follow = () => {

    if (!route?.params?.id?.length) {
        return;
    }

    useApi().post(`/api/follow/${route.params.id}`)
        .then((response) => {
            if (response.data.status == 1) {
                active.value = response.data.active;
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
}

const user = ref([]);
  onMounted(() => {
    getUser();
    isFollower();
  });

  watch(() => route.params.id, () => {
    if (route.params.id) {
      getUser();
      isFollower();
    } 
  });

</script>

<template>
   <div class="bg-white profile-card mb-3">
        <div class="card-body">
            <div class="user-info" style="border-bottom:0;">
                <div class="user-cover ratio ratio-21x3 h-75"
                    :style="`background-image: url(${user?.bg_photo_path})`"
                ></div>
                <div class="user-avatar-profile">
                    <userImage  :item="user"/>
                </div>
                <div class="user-name">{{ user.nickname }}</div>
                <div v-if="authStore.user?.id != route.params.id" class="user-exes d-grid gap-2 m-auto w-[200px]">
                    <button @click="follow" class="btn btn-outline-secondary btn-sm">
                        {{ active ? $t('site.Unfollow') : $t('site.Follow') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
