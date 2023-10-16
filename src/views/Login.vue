<template>
    <div class="container">
        <div class="flex items-center">
            <div class="flex-1 text-center">
                <div class="p-[100px]">
                    <VTInput
                        class="my-3"
                        name="username"
                        rows="4"
                        v-model="username"
                        :placeholder="$t('site.Email')"/>
                    <VTInput
                        class="my-3"
                        name="password"
                        rows="4"
                        v-model="password"
                        :placeholder="$t('site.Password')"/>

                    <VTButton class="mt-3 w-100" color="primary" size="medium"
                                @click="submitLogin()">
                        {{ $t('site.Login') }}
                    </VTButton>
                </div>
            </div>
            <div class="flex-1 text-center">
                <div class="w-100 p-[20px]">
                    <img src="../assets/site/images/login.png" alt="login">
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import VTButton from '@/elements/VTButton'; 
  import VTInput from '@/elements/VTInput'; 
  import { useRouter } from 'vue-router';
//   import {useApi} from '@/utils/api.ts';
  
  const authStore = useAuthStore();

  const router = useRouter();

    const token = computed(() => authStore.token)


    console.log(token.value);

    const username = ref('');
    const password = ref('');

    const submitLogin = function() {
        authStore.login(username.value, password.value)
        .then(() => {
            router.push({
                name: 'home'
            })
        })
    }

</script>