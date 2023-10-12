<template>
    <div class="container">
        <div class="flex items-center">
            <div class="flex-1">
                <span class="material-icons text-9xl"> login </span>
            </div>
            <div class="flex-1">
                <VTInput
                    name="username"
                    rows="4"
                    v-model="username"
                    :placeholder="$t('site.Email')"/>
                <VTInput
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
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
//   import { computed, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import VTButton from '@/elements/VTButton'; 
  import VTInput from '@/elements/VTInput'; 
//   import {useApi} from '@/utils/api.ts';
  
  const authStore = useAuthStore();

    // const token = computed(() => authStore.token)



    const username = ref('');
    const password = ref('');

    const submitLogin = function() {
        authStore.login(username.value, password.value)
        .then((response) => {
            console.log(response);
        })
    }

</script>