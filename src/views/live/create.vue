<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import CustomDatePicker from "@/components/plugins/date/CustomDatePicker.vue";
 import CustomTimePicker from "@/components/plugins/date/CustomTimePicker.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();

const initialFormState = {
      title: '',
      teams: '',
      date: '1707284234',
      hour: '',
      info: '',
      link: '',
      priority: '',
      status: 0,
    };

 const { t } = useI18n();
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

  const getItem = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/lives/${route.params.id}`)
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
        getItem();
    } 
  });
  watch(() => form.date, () => {
    console.log(form.date)
  });

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
  };

  const send = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/lives/';

    if (route.params.id) {
        url = `/api/profile/lives/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'live.index'
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
        getItem();
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
                            {{ $t('site.Create new live') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/lives" :title="$t('site.Live management')">
                        <button class="btn btn-primary">{{ $t('site.Live management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
        
            <div class="md:flex gap-2">
                <VTInput
                class="w-full"
                :is-vt="true"
                name="title"
                v-model="form.title"
                request-name="LiveRequest"
                :label="$t('site.Title')"
                placeholder="فوتبال - لیگ برتر"
                />
                <VTInput
                    class="w-full"
                    :is-vt="true"
                    name="teams"
                    v-model="form.teams"
                    request-name="LiveRequest"
                    :label="$t('site.Teams')"
                    placeholder="پرسپولیس - استقلال"
                    />
                    <!-- <VTInput

                        class="w-full"
                        :is-vt="true"
                        name="date"
                        v-model="form.date"
                        request-name="LiveRequest"
                        :label="$t('site.Date')"
                        placeholder="دوشنبه 11 تير"
                    /> -->
                    <!-- <VTInput
                        class="w-full"
                        :is-vt="true"
                        name="hour"
                        v-model="form.hour"
                        request-name="LiveRequest"
                        :label="$t('site.Hour')"
                        placeholder="ساعت 15:00"
                        /> -->

                        <CustomDatePicker class="w-full" v-model="form.date"/>
                        <CustomTimePicker class="w-full" v-model="form.hour"/>
            </div>
            
            <div class="md:flex gap-2 mt-3">
                <VTInput

                class="w-full"
                :is-vt="true"
                name="info"
                v-model="form.info"
                request-name="LiveRequest"
                :label="$t('site.Info')"/>
                <VTInput
                    class="w-full"
                    :is-vt="true"
                    name="link"
                    v-model="form.link"
                    request-name="LiveRequest"
                    :label="$t('site.Link')"
                    />
                <VTInput
                    class="w-full"
                    :is-vt="true"
                    name="priority"
                    v-model="form.priority"
                    request-name="LiveRequest"
                    :label="$t('site.Priority')"/>
            </div>
            
        
                <VTSelect 
                    class="w-full mt-3"
                    :label="$t('site.Status')"
                    v-model="form.status" 
                    :options="statusList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="status"/>


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