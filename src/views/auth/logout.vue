<template>
    <div class="pt-[200px] bg-dark vh-100 bg-auth">
    </div>
</template>
  
<script setup>
  import { onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const authStore = useAuthStore();

  onMounted(() => {
    authStore.logout();

    router.push({
        name: 'home'
    })
  });

</script>
