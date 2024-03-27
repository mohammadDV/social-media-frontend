<script setup>

import {useApi} from '@/utils/api.ts';
import { onMounted, ref, watch, defineProps, reactive } from 'vue';
import userImage from '@/components/plugins/UserImage.vue'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toast-notification";
import { useAuthStore } from '@/stores/auth.ts';
import DropDown from '@/components/plugins/dropdown/DropDown.vue'
import { useI18n } from "vue-i18n";
import VTModal from '@/elements/VTModal.vue'  
import VTTextArea from '@/elements/VTTextArea';  
import VTButton from '@/elements/VTButton'; 


const router = useRouter();

const parentSelectedOption = ref(null);
    const { t } = useI18n();
    const accountMenu = ref([
        {
            id: 1,
            title: t('site.Follow'),
            func: 'follow',
            icon: 'check',
        },
        {
            id: 2,
            title: t('site.Block'),
            func: 'blockUser',
            icon: 'block'
        }, 
        {
            id: 3,
            title: t('site.Report'),
            func: 'reportUser',
            icon: 'report'
        },      
    ]
    );

const authStore = useAuthStore();
const $toast = useToast();  
const route = useRoute();
const active = ref(false);
const block = ref(false);

defineProps({
    user: {
        type: Object,
        required: true
    }
})

const isFollower = () => {
    useApi().get(`/api/is-follower/${route.params.id}`)
        .then((response) => {
            active.value = response.data.active;
            block.value = response.data.block;

            if (response.data.notfound) {
                router.push({
                    path: '/profile'
                })
            }
        })
}

const follow = () => {

    if (!route?.params?.id?.length) {
        return;
    }

    useApi().post(`/api/follow/${route.params.id}`)
        .then((response) => {
            if (response.data.status == 1) {
                active.value = response.data.active;
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
}

const blockUser = () => {

    if (!route?.params?.id?.length) {
        return;
    }

    useApi().post(`/api/block/${route.params.id}`)
        .then((response) => {
            if (response.data.status == 1) {
                block.value = response.data.block;
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
}

const initialReportFormState = {
    message: '',
    type: 'user',
    id: 0,
}

const reportForm = reactive({ ...initialReportFormState });
const reportId = ref(0);
const isReportModalVisible = ref(false);
const resetForm = () => {
    Object.assign(reportForm, { ...initialReportFormState });
    reportId.value = 0;
    isReportModalVisible.value = false;
  };

const reportUser = () => {
    reportId.value = route?.params?.id;
    isReportModalVisible.value = true;
}

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

  onMounted(() => {
    isFollower();
  });

  watch(() => route.params.id, () => {
    if (route.params.id) {
      isFollower();
    } 
  });

  watch(() => active.value, () => {
    if (route.params.id) {
        let followItem = accountMenu.value.find(item => item.id == 1);
        followItem.title = active.value ? t('site.Unfollow') : t('site.Follow');
        followItem.icon = active.value ? 'block' : 'check';
    } 
  });
  
  watch(() => block.value, () => {
    if (route.params.id) {
        let blockItem = accountMenu.value.find(item => item.id == 2);
        blockItem.title = block.value ? t('site.Unblock') : t('site.Block');
        blockItem.icon = block.value ? 'check' : 'block';
    } 
  });

</script>

<template>
   <div class="bg-white profile-card mb-3">
        <div class="card-body">
            <div class="user-info" style="border-bottom:0;">
                <div class="user-cover ratio ratio-21x3 h-75"
                    :style="`background-image: url(${user?.bg_photo_path})`"
                ></div>
                <div class="user-avatar-profile">
                    <userImage  :item="user"/>
                </div>
                <div class="user-name">{{ user?.nickname }}</div>
                <div v-if="authStore.user?.id != route.params.id" class="user-exes d-grid gap-2 m-auto w-[200px]">
                    <DropDown
                        menuClass="min-w-[170px]"
                        icon="list"
                        :name="$t('site.Activities')"
                        @follow="follow"
                        @blockUser="blockUser"
                        @reportUser="reportUser"
                        :options="accountMenu"
                        v-model="parentSelectedOption"/>
                    <button @click="follow" class="btn btn-outline-secondary btn-sm">
                        {{ active ? $t('site.Unfollow') : $t('site.Follow') }}
                    </button>
                </div>
                <div class="bg-blue-100 border text-blue-900 py-2 px-5 w-[250px] mt-3 border-gray-10 text-center m-auto" v-if="user?.is_private == 1">
                    {{ $t('site.This account is private') }}
                </div>
            </div>
        </div>
    </div>

    <VTModal v-if="isReportModalVisible" v-model="isReportModalVisible" :title="$t('site.Report')">
        <div class="w-[300px] sm:w-[600px]">
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
