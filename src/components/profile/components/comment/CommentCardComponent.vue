<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, defineProps, ref, defineEmits, reactive } from 'vue';
  import userImage from '@/components/plugins/UserImage.vue';
  import CommentWallComponent from './CommentWallComponent.vue';
  import CommentWallFormComponent from './CommentWallFormComponent.vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import jalaliMoment from 'moment-jalaali';
  import { useToast } from "vue-toast-notification";
  import VTModal from '@/elements/VTModal.vue'
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 


 const $toast = useToast();
    const authStore = useAuthStore();
    const emit = defineEmits(['updateComments'])
    
    const props =  defineProps({
        comment: {
            type: Object,
            require: true
        },
        modelId: {
            type: Number,
            require: true
        },
        modelType: {
            type: String,
            default: 'post'
        },
        hasReply: {
            type: Boolean,
            default: true
        }
    });

    const isActive = ref(false)
    const replyActive = ref(false)
    const likeCount = ref(props.comment?.likes?.length)

    const updateComments = () => {
        emit('updateComments')
    }

    const likeComment = (id) => {
        useApi().post('/api/like', {
            id: id,
            type: 'comment'
        })
        .then((response) => {
            if (response.data.status == 1) {
                isActive.value = response.data.active;
                likeCount.value = response.data.count;
            }
        })
    }
    const replyToggle = () => {
        replyActive.value = !replyActive.value
    }

    const checkLike = () => {
        if (props.comment?.likes?.length > 0) {
            let user = props.comment?.likes.find(item => item.user_id == authStore.user.id);
            if (user) {
                isActive.value = true;
            }
        }
    }

    const initialReportFormState = {
        message: '',
        type: 'comment',
        id: 0,
    };

 
    const reportForm = reactive({ ...initialReportFormState });

  
    const resetForm = () => {
    Object.assign(reportForm, { ...initialReportFormState });
    reportId.value = 0;
    isReportModalVisible.value = false;
    emit('updateData');
  };

  const sendReport = () => {

    if (!reportId.value) {
        return '';
    } else {
        reportForm.id = reportId.value;
    }

    useApi().post(`/api/profile/reports`, reportForm)
    .then((response) => {
        if (response.data.status) {
            $toast.success(response.data.message);
            resetForm()
        } else {
            $toast.error(response.data.message);
        }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };


    const reportId = ref(0);
    const isReportModalVisible = ref(false);

    const showReport = (id) => {
        reportId.value = id;
        showReportModal();

    }

    const showReportModal = () => {
        isReportModalVisible.value = true;
    }
    
    onMounted(() => {
        checkLike();
    });
</script>

<template>
    <div class="commenter-avatar">
        <userImage :item="comment?.user" />
    </div>
    <div class="comment-body">
        <div class="comment-container">
            <div class="comment-info">
                <span class="commenter-name">{{ comment?.user?.nickname }}</span>
                <span class="comment-date">
                    {{ jalaliMoment(comment.created_at).fromNow() }}
                </span>
            </div>
            <div class="comment-text">{{ comment?.text }}</div>
        </div>
        <div class="comment-exes">
            <div class="comment-like">
                <button @click="likeComment(comment.id)"  
                :class="{
                    'btn btn-xs btn-light': true,
                    'is-active': isActive
                    }">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" class="svg-inline--fa fa-thumbs-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path>
                    </svg>
                </button>
                <span class="badge text-primary"> {{ likeCount }}</span>
            </div>
            <div v-if="hasReply" class="comment-Reply">
                <button @click="replyToggle(comment.id)" class="btn btn-xs btn-light">{{ $t('site.Reply') }}</button>
                <span >
                    {{ comment?.parents?.length }}
                </span>
            </div>
            <div class="comment-Reply">
                <button @click="showReport(comment.id)" class="btn btn-xs border border-gray-100 mx-2 mb-2">
                    <span class="material-icons"> report </span>
                    {{ $t('site.Report') }}
                </button>
            </div>
        </div>
        <CommentWallFormComponent @updateComments="updateComments" v-if="hasReply && replyActive" :parent-id="comment.id" :model-id="modelId" :model-type="modelType" />
        <CommentWallComponent :has-reply="false" class="mt-1" v-if="comment?.parents?.length > 0" :comments="comment.parents"/>
    </div>

    <VTModal v-if="isReportModalVisible" v-model="isReportModalVisible" :title="$t('site.Report')">
        <div class="w-[350px] sm:w-[600px]">
            <div class="mb-3">
                <VTTextArea
                    name="message"
                    rows="4"
                    v-model="reportForm.message"
                    :disabled="false"
                    request-name="ReportRequest"
                    :placeholder="$t('site.Please Write your report')"/>
            </div>

            <VTButton 
                class="btn btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="sendReport()">
                {{ $t('site.Save') }}
            </VTButton>  
            
        </div>
    </VTModal>
</template>