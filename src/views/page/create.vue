<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTFile from '@/elements/VTFile.vue'
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useAuthStore } from '@/stores/auth.ts';
 import { useToast } from "vue-toast-notification";
 import { QuillEditor } from '@vueup/vue-quill'
 import '@vueup/vue-quill/dist/vue-quill.snow.css'
 import ImageUploader from 'quill-image-uploader';
 import BlotFormatter from 'quill-blot-formatter';
 import { useI18n } from "vue-i18n";


 const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const initialFormState = {
      title: '',
      status: 0,
      content: '',
      image: '',
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

  const getPage = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/pages/${route.params.id}`)
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
        getPage();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getImageLink = (item) => {
    form.image = item;
    canSubmit.value = true;
  };

  const editor = ref()
  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
    editor.value.setHTML('');
  };

  const sendPage = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/pages/';

    if (route.params.id) {
        url = `/api/profile/pages/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'page.index'
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

  // Editor configuration
const modules = ref([
    {
        name: 'blotFormatter',  
      module: BlotFormatter, 
      options: {/* options */}
    },
    {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
        upload: file => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);

                useApi().post('/api/upload-image', formData, {headers: { 
                            Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : undefined,
                            'Content-Type': 'multipart/form-data' 
                        }
                    })
                .then(res => {
                    resolve(res.data.url);
                })
                .catch(err => {
                    reject("Upload failed");
                    console.error("Error:", err)
                })
                })
            }
        }
    }
])

  onMounted(() => {

    window.document.title =   `${t('site.Create new page')} | ${t('site.Website name')}`;

    if (route.params.id) {
        getPage();
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
                            {{ $t('site.Create new page') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/pages" :title="$t('site.Page management')">
                        <button class="btn btn-primary">{{ $t('site.Page management') }}</button>
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
                request-name="PageRequest"
                :label="$t('site.Title')"/>

                <VTInput
                    class="mt-2"
                    :is-vt="true"
                    name="priority"
                    v-model="form.priority"
                    request-name="LiveRequest"
                    :label="$t('site.Priority')"/>

            <div class="mt-3">
                <label class="text-sm font-medium mb-2">{{ $t('site.Content') }}</label>
                <QuillEditor 
                    ref="editor" 
                    v-model:content="form.content" 
                    contentType="html" 
                    theme="snow" 
                    toolbar="full" 
                    :modules="modules" />
            </div>

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
                @click="sendPage()">
                {{ $t('site.Save') }}
            </VTButton> 
        </div>
    </div>
</template>