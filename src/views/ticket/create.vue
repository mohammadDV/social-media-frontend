<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTFile from '@/elements/VTFile.vue'
 import VTButton from '@/elements/VTButton'; 
 import VTTextArea from '@/elements/VTTextArea'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";


const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const initialFormState = {
      message: '',
      subject_id: 1,
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
  
  const subjectList = ref();

  const getSubjects = () => {
    useApi().get(`/api/ticket-subjects/index`)
    .then((response) => {
        subjectList.value = response.data;
    })
  }

  const getTicket = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/tickets/${route.params.id}`)
            .then((response) => {
                Object.assign(form, { ...response.data });
                if (response?.data?.tags?.length > 0) {
                    form.tags = response.data.tags.map((item) => item.title);
                }
            });
    }
  }


  watch(() => route.params.id, () => {
    if (route.params.id) {
        getTicket();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getFileLink = (item) => {
    form.image = item;
    canSubmit.value = true;
  };


  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
  };

  const send = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/tickets/';

    // if (route.params.id) {
    //     url = `/api/profile/tickets/${route.params.id}`;
    // }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'ticket.index'
            })
        }
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

    window.document.title =   `${t('site.Create new ticket')} | ${t('site.Website name')}`;

    if (route.params.id) {
        getTicket();
    }

    getSubjects();
  });

</script>

<template>
    <div class="col-12 col-md-12 col-lg-9 order-1 order-md-2 mb-4 mb-md-0">
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
                            {{ $t('site.Create new ticket') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/tickets" :title="$t('site.Ticket management')">
                        <button class="btn btn-primary">{{ $t('site.Ticket management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
                <VTSelect 
                    :label="$t('site.Subject ticket')"
                    v-model="form.subject_id" 
                    :options="subjectList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="subject_id"/>

                <VTTextArea
                    name="message"
                    class="mt-3"
                    rows="4"
                    v-model="form.message"
                    :disabled="false"
                    request-name="TicketRequest"
                    :placeholder="$t('site.Ticket content')"/>
            
            <div v-if="form.image?.length > 0">
                <img class="thumbnail w-[100px] rounded mt-2" v-lazy="form.image" alt="image">
            </div>

            <VTFile
                class="mt-3"
                :label="$t('site.Choose file')"
                name="image"
                @getFileLink="getFileLink"
                @on-upload-start="onUploadStart"
            />

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