<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, defineProps, ref, onBeforeUnmount, reactive, defineEmits } from 'vue';
  import userImage from '@/components/plugins/UserImage.vue';
  import CommentWallComponent from '../comment/CommentWallComponent.vue';
  import CommentWallFormComponent from '../comment/CommentWallFormComponent.vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import jalaliMoment from 'moment-jalaali';
 import { useToast } from "vue-toast-notification";
  import { useI18n } from "vue-i18n";
  import VTModal from '@/elements/VTModal.vue'
  import VTFile from '@/elements/VTFile.vue'
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 
 import VTSelect from "@/elements/VTSelect.vue";
  const { t } = useI18n();


const emit = defineEmits(['updateData'])

const initialFormState = {
    text: '',
    file: '',
    status: '',
};
const initialReportFormState = {
    message: '',
    type: 'status',
    id: 0,
};

const statusList = ref([
    {
        id:0,
        title: t('site.Inactive')
    },
    {
        id:1,
        title: t('site.Active')
    }
  ]);

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
 const reportForm = reactive({ ...initialReportFormState });

 const $toast = useToast();
 const updateStatus = () => {

    if (!canSubmit.value) {
        return '';
    }

    useApi().post(`/api/profile/status/${editId.value}`, form)
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

const editId = ref(0)
const reportId = ref(0)

const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    Object.assign(reportForm, { ...initialReportFormState });
    editId.value = 0;
    reportId.value = 0;
    isModalVisible.value = false;
    isReportModalVisible.value = false;
    emit('updateData');
  };

  const isModalVisible = ref(false);
  const isReportModalVisible = ref(false);
  const isDropDownVisible = ref('');

  const showModal = () => {
    isModalVisible.value = true;
  }
  const showReportModal = () => {
    isReportModalVisible.value = true;
  }

    const authStore = useAuthStore();

    const props =  defineProps({
        status: {
            type: Object,
            require: true
        },
        tab: {
            type: Number,
            default: 1
        }
    });

    const isActive = ref(false)
    const commentActive = ref(false)
    const comments = ref([])
    const likeCount = ref(props.status?.likes?.length)

    const likeStatus = (id) => {
        useApi().post('/api/like', {
            id: id,
            type: 'status'
        })
        .then((response) => {
            if (response.data.status == 1) {
                isActive.value = response.data.active;
                likeCount.value = response.data.count;
            }
        })
    }

    const commentToggle = (id) => {
        commentActive.value = !commentActive.value

        if (commentActive.value && comments.value.length == 0) {

            page.value = 1;
            getComments(id);
        }
    }

    const checkLike = () => {
        if (props.status?.likes?.length > 0) {
            let user = props.status?.likes.find(item => item.user_id == authStore.user.id);
            if (user) {
                isActive.value = true;
            }
        }
    }

    const checkFavorite = () => {
        if (props.status?.favorites?.length > 0) {
            let user = props.status?.favorites.find(item => item.user_id == authStore.user.id);
            if (user) {
                isSave.value = true;
            }
        }
    }

    const updateComments = (id) => {
        page.value = 1;
        getComments(id);
    }

    const showEditStatus = (id) => {
        editId.value = id;
        useApi().get(`/api/status/preview/${id}`)
            .then((response) => {
                Object.assign(form, { ...response.data });
            });
        showModal();

    }

    const showReport = (id) => {
        reportId.value = id;
        showReportModal();

    }

    const isSave = ref(false);

    const saveStatus = (id) => {
        useApi().post(`/api/status/favorite/${id}`)
            .then((response) => {
                if (response.data.status) {
                    isSave.value = response.data.active;
                    $toast.success(response.data.message);
                } else {
                    $toast.error(response.data.message);
                }
            });

        if (props.tab == 3) {
            emit('updateData');
        }    
    }

    const dropDown = ref(null)

    const toggleDropDown = () => {
        isDropDownVisible.value = !isDropDownVisible.value
    }

    const closeDropDown = (element) => {
        if(!dropDown.value.contains(element.target)){
        isDropDownVisible.value = false
        }
    }

    const onUploadStart = () => {
        canSubmit.value = false;
    }

    const getFileLink = (item) => {
        form.file = item;
        canSubmit.value = true;
    };

    const page = ref(1);
    const more = ref(false);
    const loading = ref(false);

    const getComments = (statusId) => {

        loading.value = true;

        if (page.value == 1) {
            comments.value = [];
        }

         useApi().get(`/api/comment/status/${statusId}?page=${page.value}`)
            .then((response) => {

                if (response.data?.data) {

                    comments.value.push(...response.data.data);
    
                    if (response.data.total > page.value * response.data.per_page) {
                        more.value = true;
                    } else {
                        more.value = false;
                    }
    
                    page.value++;
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }

    // watch(() => route.params.id, () => {
    //     if (route.params.id) {
    //         page.value = 1;
    //         getStatuses();
    //     } 
    // });
    
    onMounted(() => {
        window.addEventListener('click',closeDropDown) 
        checkLike();
        checkFavorite();
    });

    onBeforeUnmount(() => {
        window.removeEventListener('click',closeDropDown) 
    });
    
</script>

<template>
    <div class="p-3">
        <div class="flex gap-3">
            <div class="">
                <userImage addclass="w-[50px] h-[50px] rounded-full" :item="status?.user" />
            </div>
            <div class="flex-1 mt-2">
                <div class="tweet-user-name">
                    <router-link class="text-black text-decoration-none" :to="`/member/${status?.user?.id}`">{{ status?.user?.nickname }}</router-link>
                </div>
                <div class="tweet-date">
                    {{ jalaliMoment(status.created_at).fromNow() }}
                </div>
            </div>
            <div class="">
                <div :class="`relative cursor-pointer max-w-[200px]`" ref="dropDown">
                    <div :class="`border border-gray-200 rounded-[5px] p-[5px] flex justify-between items-center gap-[5px]`" 
                    @click="toggleDropDown">
                        <span class="px-2 py-1">
                            ...
                        </span>   
                    </div>
                    <Transition name="slide-fade">
                        <div :class=" `mt-[5px] w-[200px] left-0 border border-gray-100 bg-white rounded-md shadow-[1px_1px_4px_1px_rgba(40, 68, 120 ,0.59)] absolute z-50 p-[0.5rem]`"
                            v-if="isDropDownVisible"
                        >
                            <div v-if="status.user.id === authStore.user.id && status.is_report == 0" class="p-2 border-b option hover:bg-gray-100" @click="showEditStatus(status.id)">
                                <span class="material-icons text-gray-400"> edit </span>
                                {{ $t('site.Edit') }}
                            </div>
                            <div v-if="status.user.id != authStore.user.id" class="p-2 border-b option hover:bg-gray-100" @click="showReport(status.id)">
                                <span class="material-icons text-gray-400"> report </span>
                                {{ $t('site.Report') }}
                            </div>
                            <div class="p-2 option hover:bg-gray-100"  @click="saveStatus(status.id)">
                                <template v-if="isSave">
                                    <span class="material-icons text-gray-400"> bookmark_remove </span>
                                    {{ $t('site.Unsave') }}
                                </template>
                                <template v-else>
                                    <span class="material-icons text-gray-400"> bookmark </span>
                                    {{ $t('site.Save') }}
                                </template>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="tweet-body mt-2 p-2">
            {{ status?.text }}
            <img v-if="status?.file?.length > 0" v-lazy="status.file"/>
        </div>
        <div class="tweet-exes">
            <button @click="likeStatus(status.id)" :class="{
                'btn btn-light': true,
                'is-active': isActive
                }">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" class="svg-inline--fa fa-thumbs-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path>
                </svg>
                <span>{{ likeCount }}</span>
            </button>
            <button class="btn btn-light" @click="commentToggle(status.id)">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comment" class="svg-inline--fa fa-comment fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                </svg>
                <span>{{ status?.comments }}</span>
            </button>
        </div>
        <div v-if="commentActive" class="tweet-comments">
            <CommentWallFormComponent @updateComments="updateComments(status.id)" :model-id="status.id" model-type="status" />
            <CommentWallComponent @updateComments="updateComments(status.id)" :comments="comments" :model-id="status.id" model-type="status"/>
            <div class="text-center">
                <button v-if="more" class="btn btn-light" @click="getComments(status.id)">
                    <span>{{ $t('site.More post') }}</span>
                </button>
            </div>
        </div>

        
    </div>
    <VTModal v-if="isModalVisible" v-model="isModalVisible" :title="$t('site.Please share your post')">
        <div class="w-[300px] sm:w-[600px]">
            <div class="alert alert-danger">
                کاربر گرامی،
                <br>
                از شما درخواست می‌کنیم که از ارسال هرگونه محتوای نامناسب، ناهنجار یا سیاسی خودداری نمایید. تمام محتواها بررسی می‌شوند و در صورت عدم تطابق با قوانین، ابتدا تذکر داده شده و در صورت ادامه، مطابق با <span class="text-gray-500">
                    <a
                        class="text-intellivy-600"
                        href="/page/privacy-policy"
                        target="_blank"
                        >مقررات پلتفرم</a
                    >
                </span> اقدام خواهد شد.
                <br>
                با تشکر از همکاری شما!
            </div>
            <div class="mb-3">
                <VTTextArea
                    name="text"
                    rows="4"
                    v-model="form.text"
                    :disabled="false"
                    request-name="StatusRequest"
                    :placeholder="$t('site.Please share your post')"/>
            </div>
            <div v-if="form.file?.length > 0">
                <img class="thumbnail w-[100px] rounded mt-2" v-lazy="form.file" alt="image">
            </div>
            <VTFile
                class="mb-1"
                :label="$t('site.Choose image')"
                name="image"
                @getFileLink="getFileLink"
                @on-upload-start="onUploadStart"
            ></VTFile>

            <VTSelect 
                class="mb-3"
                :label="$t('site.Status')"
                v-model="form.status" 
                :options="statusList" 
                optionsValueKey="id"
                optionsDisplayValueKey="title"
                name="status"/>

            <VTButton 
                class="btn btn-outline-secondary btn-sm" 
                size="medium"
                color="primary"  
                @click="updateStatus()">
                {{ $t('site.Submit post') }}
            </VTButton>  
            
        </div>
    </VTModal>
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