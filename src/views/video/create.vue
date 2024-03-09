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
 import '@vueup/vue-quill/dist/vue-quill.snow.css'
 import { useI18n } from "vue-i18n";


const route = useRoute();
const router = useRouter();

const initialFormState = {
      title: '',
      status: 0,
      type: 0,
      image: '',
      file: '',
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

  const getVideo = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/videos/${route.params.id}`)
            .then((response) => {
                Object.assign(form, { ...response.data });
                console.log(form)
            });
    }
  }


  watch(() => route.params.id, () => {
    if (route.params.id) {
        getVideo();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getFileLink = (item) => {
    form.file = item;
    canSubmit.value = true;
  };

  const reset = ref(false);

  const resetForm = () => {
    reset.value = true;
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
  };

  const send = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/videos/';

    if (route.params.id) {
        url = `/api/profile/videos/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'video.index'
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
        getVideo();
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
                            {{ $t('site.Create new video') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/videos" :title="$t('site.Video management')">
                        <button class="btn btn-primary">{{ $t('site.Video management') }}</button>
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
                request-name="VideoFormRequest"
                :placeholder="$t('site.Title')"/>

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
            

            <video class="mt-3" v-if="form.file" width="100" height="240" controls>
                <source :src="form.file" type="video/mp4">
                <source :src="form.file" type="video/ogg">
            </video>

            <div class="w-100 mt-3">
                <VTFile
                    :label="$t('site.Choose video')"
                    name="video"
                    @getFileLink="getFileLink"
                    @on-upload-start="onUploadStart"
                />
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