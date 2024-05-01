<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import VTTextArea from '@/elements/VTTextArea';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect";
 import VTSelectMultiple from "@/elements/VTSelectMultiple";
 import { useToast } from "vue-toast-notification";
 import '@vueup/vue-quill/dist/vue-quill.snow.css'
 import DropDownUserSearchBox from '@/components/plugins/dropdown/DropDownUserSearchBox.vue';
 import { useI18n } from "vue-i18n";   

 const { t } = useI18n();

const initialFormState = {
      roles: [],
      users: [],
      has_email: 0,
      has_modal: 0,
      message: '',
      link: '',
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });

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
  
  const videoList = ref();

  const getVideos = () => {
    useApi().get(`/api/profile/videos/index`)
    .then((response) => {
        videoList.value = response.data;
    })
  }

  watch(() => form.type, () => {
    if (form.type == 1) {
        getVideos();
    } 
  });

  const reset = ref(false)

  const resetForm = () => {
    reset.value = true;
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
  };

  const roleList = ref([]);

const getRoles = () => {
  
    useApi().get(`/api/profile/role`)
        .then((response) => {
        roleList.value = response.data;
        });
    }

  const send = () => {

    if (!canSubmit.value) {
        return '';
    }

    const $toast = useToast();
    useApi().post('/api/profile/notifications/send-as-admin', form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm();
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };

  onMounted(() => {

    window.document.title =   `${t('site.Create new notification')} | ${t('site.Website name')}`;
    getRoles();
  });

</script>

<template>
    <div class="col-12 col-md-7 col-lg-9 order-1 order-md-2 mb-4 mb-md-0">
        <div class="card vt-news-card breadcrumb-card mb-3">
            <div class="card-body">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/profile" :title="$t('site.Profile')">
                                {{ $t('site.Profile') }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active">
                            {{ $t('site.Create new notification') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/notifications/list" :title="$t('site.Notification management')">
                        <button class="btn btn-primary">{{ $t('site.Notification management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
        
            <DropDownUserSearchBox :options="dropdownItems"/>

            <VTSelectMultiple
                class="pt-3"
                name="rolees"
                v-model="form.roles"
                :options="roleList"
                :disabled="roleList.length === 0"
                optionsValueKey="id"
                optionsDisplayValueKey="name"
                :placeholder="$t('site.Choose the roles')"
            />

            <div class="">
                <div v-for="(role,index) in form.roles" :key="index" class="flex gap-4 mb-2 mt-1">
                    <div class="last-chater text-gray-500">{{ $t('site.Id') }} : </div>
                    <div class="user-name">
                        {{ index + 1 }}
                    </div>
                    <div class="last-chater text-gray-500">{{ $t('site.Title') }} : </div>
                    <div class="user-name">
                            {{ roleList.find(item => item.id == role).name }}
                    </div>
                </div>
            </div>

            <VTInput
                class="mt-3"
                :is-vt="true"
                name="link"
                v-model="form.link"
                request-name="SendNotificationRequest"
                :placeholder="$t('site.Link')"/>
            
            <VTTextArea
                name="message"
                class="mt-3"
                rows="4"
                v-model="form.message"
                :disabled="false"
                request-name="SendNotificationRequest"
                :placeholder="$t('site.Message')"/>
            
            <div class="flex gap-3 mt-3">
                <div>
                    <VTSelect 
                        :label="$t('site.Has email')"
                        v-model="form.has_email" 
                        :options="statusList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="has_email"/>
                </div>

                <div>
                    <VTSelect 
                    :label="$t('site.Has popup')"
                    v-model="form.has_modal" 
                    :options="statusList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="has_modal"/>
                </div>
            </div>

            <VTButton 
                :loading="!canSubmit"
                :disabled="!canSubmit"
                class="justify-center btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="send()">
                {{ $t('site.Save') }}
            </VTButton> 
        </div>
    </div>
</template>