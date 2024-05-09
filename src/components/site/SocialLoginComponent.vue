<script setup>

  import { useAuthStore } from '@/stores/auth.ts';
  import { useRouter } from 'vue-router';
  import { useToast } from "vue-toast-notification";
  import { useI18n } from "vue-i18n"; 
  import {useApi} from '@/utils/api.ts'; 

  const { t } = useI18n();  
  const $toast = useToast();
  const authStore = useAuthStore();
  const router = useRouter();  
  const callback = async (response) => {

    await useApi().post('/api/google/verify', { 
        token: response?.credential
    })
        .then((response) => {
            if (response.data?.token?.length > 0) {
                $toast.success(t('site.Welcome'));
                authStore.setToken(response.data.token);
                    router.push({
                    name: 'profile'
                })
            }
        })
        .catch((error) => {
            if (error.response.data) {
                $toast.error(error.response.data.message);
            } else {
                $toast.error(t('site.There is no such user with this specification'));
            }
        });
  }

</script>

<template>
    <GoogleLogin :callback="callback"/>
</template>
