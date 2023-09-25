<template>
    <div>
        token : {{ token }}
        <div class="flex">

        <input class="border mr-5" placeholder="username..." type="text" name="username" v-model="username">
        <input class="border" placeholder="password..." type="text" name="password" v-model="password">
        
        </div>
        <button class="p-2 border rounded m-2 bg-gray" @click="submitLogin">
            send
        </button>
    </div>
</template>
  
<script setup>
  import { computed, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  
  const authStore = useAuthStore();

    const token = computed(() => authStore.token)



    const username = ref('');
    const password = ref('');

    const submitLogin = function() {
        authStore.login(username.value, password.value)
        .then((response) => {
            console.log(response);
        })
    }

</script>