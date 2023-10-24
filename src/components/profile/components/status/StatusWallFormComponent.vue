<script setup>

//   import {useApi} from '@/utils/api.ts';
  import { ref } from 'vue';

  import userImage from '@/components/plugins/UserImage.vue';
  import VTModal from '@/elements/VTModal.vue'
  import VTFile from '@/elements/VTFile.vue'
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 
//   import VTTextArea from '@/elements/VTTextArea';
//   import VTButton from '@/elements/VTButton'; 
  import { useAuthStore } from '@/stores/auth.ts';
//   import { useToast } from "vue-toast-notification";

//   const emit = defineEmits(['updateComments'])
  const authStore = useAuthStore();

  const isModalVisible = ref(false);

  const showModal = () => {
    isModalVisible.value = true;
  }

  const closeModal = () => {
    isModalVisible.value = false;
  };


//   const sendComment = () => {
//     useApi().post(`/api/comment/${props.modelType}/${props.modelId}`, {
//         comment: comment.value, 
//         parent_id: props.parentId
//     })
//     .then(() => {
//         const $toast = useToast();
//         $toast.success('You did it!');
//         comment.value = '';
//         emit('updateComments');
//     })
//   };

</script>

<template>
     <div class="card posting-card">
        <div class="card-body">
            <div class="user-avatar">
            <userImage :item="authStore.user" />
            </div>
            <div class="post-btn-container">
            <button @click="showModal" class="btn input-is-btn">
                {{ $t('site.Please share your post') }}
            </button>
            </div>
        </div>
    </div>

    <VTModal v-if="isModalVisible" @close="closeModal" :title="$t('site.Please share your post')">
        <div class="w-[300px] sm:w-[600px]">
            <div class="mb-3">
                <VTTextArea
                    name="comment"
                    rows="4"
                    v-model="comment"
                    :disabled="false"
                    :placeholder="$t('site.Add your comment')"/>
            </div>
            <VTFile
                label="Upload image"
                name="video"
                :multiple="true"
                @change="changedPicture"
            ></VTFile>
            <VTButton 
                class="btn btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="sendComment()">
                {{ $t('site.Submit post') }}
            </VTButton>    
        </div>
    </VTModal>
</template>