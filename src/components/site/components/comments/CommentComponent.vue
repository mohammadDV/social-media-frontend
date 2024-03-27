<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, defineProps, defineEmits, reactive, ref } from 'vue';
  import CommentFormComponent from './CommentFormComponent';
  import userImage from '@/components/plugins/UserImage.vue';
  import jalaliMoment from 'moment-jalaali';
  import { useToast } from "vue-toast-notification";
  import VTModal from '@/elements/VTModal.vue'
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 

  const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
  });
 
  const $toast = useToast();

  const emit = defineEmits(['updateComments'])


  const updateComments = () => {
    emit('updateComments')
  }

  onMounted(() => {
    useApi().get('/api/active-categories')
        .then((response) => {
            response.data;
        })
  });

  const setReply = (commentId) => {
    let comment = props.comments.find(item => item.id == commentId);
    comment.reply = !comment?.reply;
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
    };

</script>
<template>

    <div v-if="comments?.length > 0" class="comment-section">
        <div class="comment-section--header">
            <div class="comment-section--title-wrap">
                <span class="font-medium m-2">{{ $t('site.Comments') }}</span>
                <span class="comment-section--number">{{ comments?.length }} {{ $t('site.Comment') }}</span>
            </div>
            <div class="comment-section--divider"></div>
        </div>
        <div class="comment-form">
            <div id="replay-close" class="replay-close hidden">
                {{ $t('site.Reply') }}
                <button class="btn btn-sm btn-warning"><span class="material-icons size-font text-primary"> close </span></button>
            </div>
        </div>
        <div class="comment-wrap" v-for="(comment, index) in comments" :key="index">
            <div class="comment">
                <div class="comment--body">
                    <div class="commenter-avatar-wrap">
                        <div class="commenter-avatar">
                            <userImage :item="comment?.user" />
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                    <div class="comment-text">
                        <p class="comment-text-pragraph">
                            <a class="comment-user-text-link" href="#">
                                <span class="user-name"> {{ comment?.user?.nickname }} </span>
                            </a>
                            <br>
                            <span class="comment-text-span">{{ comment?.message }}</span>
                        </p>
                    </div>
                </div>
                <div class="comment--footer">
                    <div class="comment--date">
                    {{ jalaliMoment(comment.created_at).fromNow() }}
                    </div>
                    <div class="comment--reactions">
                        <button @click="setReply(comment.id)" class="reply-btn btn vt-btn-white">
                            <span class="material-icons size-font"> reply </span>
                            <span>{{ $t('site.Reply') }}</span>
                        </button>
                        <button @click="showReport(comment.id)" class="mx-2 reply-btn btn vt-btn-white">
                            <span class="material-icons size-font"> report </span>
                            <span>{{ $t('site.Report') }}</span>
                        </button>
                    </div>
                </div>
            </div>
            <CommentFormComponent v-if="comment.reply" :parentId="comment.id" @updateComments="updateComments"/>
            <template v-if="comment?.parents?.length > 0">
                <div v-for="(parent, index) in comment.parents" :key="index" class="comment">
                    <div class="comment--body">
                        <div class="commenter-avatar-wrap">
                            <div class="commenter-avatar">
                                <userImage :item="parent?.user" />
                                <a href="#" class="stretched-link"></a>
                            </div>
                        </div>
                        <div class="comment-text">
                            <p class="comment-text-pragraph">
                                <a class="comment-user-text-link" href="#">
                                    <span class="user-name"> {{ parent.user.nickname }} </span>
                                </a>
                                <br>
                                <span class="comment-text-span">{{ parent.message }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="comment--footer">
                        <div class="comment--date">
                            {{ jalaliMoment(parent.created_at).fromNow() }}
                        </div>
                        <div class="comment--reactions">
                            <button @click="showReport(parent.id)" class="mx-2 reply-btn btn vt-btn-white">
                                <span class="material-icons size-font"> report </span>
                                <span>{{ $t('site.Report') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
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