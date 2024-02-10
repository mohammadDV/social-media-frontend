<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const initialFormState = {
      title: '',
      status: 0,
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

  const getTicket = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/ticket-subjects/${route.params.id}`)
            .then((response) => {
                Object.assign(form, { ...response.data });
            });
    }
  }

  watch(() => route.params.id, () => {
    if (route.params.id) {
        getTicket();
    } 
  });

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
  };

  const send = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/ticket-subjects/';

    if (route.params.id) {
        url = `/api/profile/ticket-subjects/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'subject.index'
            })
        }
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };

  onMounted(() => {

    if (route.params.id) {
        getTicket();
    }
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
                            {{ $t('site.Create new ticket subject') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/subjects" :title="$t('site.Ticket subjects management')">
                        <button class="btn btn-primary">{{ $t('site.Ticket subjects management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <VTInput
                :is-vt="true"
                name="title"
                rows="4"
                v-model="form.title"
                request-name="SubjectRequest"
                :label="$t('site.Title')"/>
            
            <div class="flex gap-3 mt-3">
                <div>
                    <VTSelect 
                        :label="$t('site.Status')"
                        v-model="form.status" 
                        :options="statusList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="status"/>
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