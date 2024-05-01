<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTFile from '@/elements/VTFile.vue'
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";


const route = useRoute();
const router = useRouter();

const initialFormState = {
      title: '',
      status: 0,
      place_id: 1,
      image: '',
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

  const getAdvertise = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/advertise/${route.params.id}`)
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
        getAdvertise();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getImageLink = (item) => {
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

    let url = '/api/profile/advertise/';

    if (route.params.id) {
        url = `/api/profile/advertise/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'advertise.index'
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

  const places = ref([]);
  const getPlaces = () => {
    useApi().get(`/api/profile/advertise/places`)
    .then((response) => {
        places.value = response.data;
    })
  }


  onMounted(() => {

    window.document.title =   `${t('site.Create new advertise')} | ${t('site.Website name')}`;
    if (route.params.id) {
        getAdvertise();
    }

    getPlaces();
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
                            {{ $t('site.Create new advertise') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/advertises" :title="$t('site.Advertise management')">
                        <button class="btn btn-primary">{{ $t('site.Advertise management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
            
            <VTInput
                :is-vt="true"
                name="title"
                v-model="form.title"
                request-name="AdvertiseRequest"
                :label="$t('site.Title')"/>
                
            <VTInput
                class="mt-2"
                :is-vt="true"
                input-type="url"
                name="link"
                v-model="form.link"
                request-name="AdvertiseRequest"
                :label="$t('site.Link')"/>

                <VTSelect 
                    class="mt-2"
                    :label="$t('site.Sport')"
                    v-model="form.place_id" 
                    :options="places" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="place_id"/>
            
            <div v-if="form.image?.length > 0">
                <img class="thumbnail w-[100px] rounded mt-2" :src="form.image" alt="image">
            </div>

            <VTFile
                class="mt-3"
                :label="$t('site.Choose image')"
                name="image"
                @getFileLink="getImageLink"
                @on-upload-start="onUploadStart"
            />
            
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