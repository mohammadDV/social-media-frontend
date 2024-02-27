<script setup>

  import {useApi} from '@/utils/api.ts';
  import { ref } from 'vue';

  import userImage from '@/components/plugins/UserImage.vue';
  import VTModal from '@/elements/VTModal.vue'
  import VTFile from '@/elements/VTFile.vue'
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 
  import { useAuthStore } from '@/stores/auth.ts';
  import { useToast } from "vue-toast-notification";

  const authStore = useAuthStore();

  const isModalVisible = ref(false);
  const file = ref('');
  const content = ref('');

  const showModal = () => {
    isModalVisible.value = true;
  }
  const resetForm = () => {
    file.value = '';
    content.value = '';
  }

  const closeModal = () => {
    resetForm()
    isModalVisible.value = false;
  };
  const getFileLink = (item) => {
    file.value = item;
  };


  const sendStatus = () => {
    const $toast = useToast();
    useApi().post(`/api/profile/status/`, {
        text: content.value, 
        file: file.value,
        status: 1
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
  };

</script>

<template>
     <div class="card posting-card">
        <div class="card-body">
            <div class="user-avatar-profile">
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
                    name="text"
                    rows="4"
                    v-model="content"
                    :disabled="false"
                    request-name="StatusRequest"
                    :placeholder="$t('site.Please share your post')"/>
            </div>
            <VTFile
                class="mb-5"
                label="Upload image"
                name="image"
                @getFileLink="getFileLink"
            ></VTFile>

            <VTButton 
                class="btn btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="sendStatus()">
                {{ $t('site.Submit post') }}
            </VTButton>  
            
        </div>
    </VTModal>
</template>