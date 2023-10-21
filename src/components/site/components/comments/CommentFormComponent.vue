<script setup>

  import {useApi} from '@/utils/api.ts';
  import { defineProps, computed, ref, defineEmits } from 'vue';
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 
  import { useAuthStore } from '@/stores/auth.ts';
  import { useRoute, useRouter } from 'vue-router';
  import { useToast } from "vue-toast-notification";

  const emit = defineEmits(['updateComments'])

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();

  const props = defineProps({
    parentId: {
        type: Number,
        default: 0
    }
  })

  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const parent = computed(() => props.parentId);

  const comment = ref('');

  const goToRoute = (routeName) => {
    router.push({
        name: routeName
    })
  }

  const sendComment = () => {
    useApi().post(`/api/comment/post/${route.params.id}`, {
        comment: comment.value, 
        parent_id: parent.value
    })
    .then(() => {
        const $toast = useToast();
        $toast.success('You did it!');
        comment.value = '';
        emit('updateComments');
    })
  };

</script>

<template>

    <template v-if="isAuthenticated">
        <VTTextArea
        name="comment"
        rows="4"
        v-model="comment"
        :disabled="false"
        :placeholder="$t('site.Add your comment')"/>

            <VTButton class="mt-3 w-100" color="primary" size="medium"
                        @click="sendComment()">
                {{ $t('site.Submit') }}
            </VTButton>
    </template>
    <template v-else>
        <VTButton class="mt-3 w-100" color="primary" size="medium"
                    @click="goToRoute('login')">
            {{ $t('site.Login') }}
        </VTButton>
    </template>
        
</template>