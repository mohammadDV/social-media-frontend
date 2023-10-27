<script setup>

  import {useApi} from '@/utils/api.ts';
  import { defineProps, ref, defineEmits } from 'vue';

  import userImage from '@/components/plugins/UserImage.vue';
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 
  import { useAuthStore } from '@/stores/auth.ts';
  import { useToast } from "vue-toast-notification";

  const emit = defineEmits(['updateComments'])
  const authStore = useAuthStore();

  

  const props = defineProps({
    parentId: {
        type: Number,
        defaul: 0
    },
    modelId: {
        type: Number,
        require: true
    },
    modelType: {
        type: String,
        default: 'post'
    }
  })

  const comment = ref('');

  const sendComment = () => {

    const $toast = useToast();
    useApi().post(`/api/comment/${props.modelType}/${props.modelId}`, {
        comment: comment.value, 
        parent_id: props.parentId
    })
    .then((response) => {
        if (response.data.status) {
            $toast.success(response.data.message);
            comment.value = '';
            emit('updateComments');
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
     <div class="tweet-comments">
            <div class="comment-input-container">
                <div class="row">
                    <div class="user-avatar">
                        <userImage :item="authStore.user" />
                    </div>
                    <div class="col">
                        <div class="comment-form">
                            <div class="mb-3">
                                <VTTextArea
                                    name="comment"
                                    rows="4"
                                    v-model="comment"
                                    :disabled="false"
                                    :placeholder="$t('site.Add your comment')"/>
                            </div>
                            <VTButton class="btn btn-outline-secondary btn-sm" size="medium"
                                        @click="sendComment()">
                                {{ $t('site.Submit comment') }}
                            </VTButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>