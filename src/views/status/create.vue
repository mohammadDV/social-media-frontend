<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTFile from '@/elements/VTFile.vue'
 import VTTextArea from '@/elements/VTTextArea';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import VTTagsInput from "@/elements/VTTagsInput.vue";
 import { useAuthStore } from '@/stores/auth.ts';
 import { useToast } from "vue-toast-notification";
 import { QuillEditor } from '@vueup/vue-quill'
 import '@vueup/vue-quill/dist/vue-quill.snow.css'
 import ImageUploader from 'quill-image-uploader';
 import BlotFormatter from 'quill-blot-formatter'
 import { useI18n } from "vue-i18n";


const route = useRoute();
const router = useRouter();

const initialFormState = {
      title: '',
      pre_title: '',
      summary: '',
      status: 0,
      type: 0,
      special: 0,
      tags: [],
      category_id: 1,
      content: '',
      image: '',
      video: '',
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

  const typeList = ref([
    {
        id:0,
        title: t('site.Common')
    },
    {
        id:1,
        title: t('site.Video')
    }
  ]);

  const specialList = ref([
    {
        id:0,
        title: t('site.Common')
    },
    {
        id:1,
        title: t('site.Special')
    }
  ]);
  
  const categoryList = ref();

  const getCategories = () => {
    useApi().get(`/api/active-categories`)
    .then((response) => {
        categoryList.value = response.data;
    })
  }

  const getPost = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/posts/${route.params.id}`)
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
        getPost();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getImageLink = (item) => {
    form.image = item;
    canSubmit.value = true;
  };

  const getVideoLink = (item) => {
    form.video = item;
    canSubmit.value = true;
  };

  const editor = ref()
  const reset = ref(false)

  const resetForm = () => {
    reset.value = true;
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
    editor.value.setHTML('');
  };

  const sendPost = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/posts/';

    if (route.params.id) {
        url = `/api/profile/posts/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'post.index'
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

    window.document.title =   `${t('site.Create new status')} | ${t('site.Website name')}`;
    if (route.params.id) {
        getPost();
    }

    getCategories();
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
                            {{ $t('site.Create new status') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/posts" :title="$t('site.Status management')">
                        <button class="btn btn-primary">{{ $t('site.Status management') }}</button>
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
                request-name="PostRequest"
                :placeholder="$t('site.Title')"/>
            <VTInput
                :is-vt="true"
                class="mt-3"
                name="pre_title"
                rows="4"
                v-model="form.pre_title"
                request-name="PostRequest"
                :placeholder="$t('site.Pre title')"/>

                <VTSelect 
                    :label="$t('site.Category')"
                    v-model="form.category_id" 
                    :options="categoryList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="category_id"/>
            
            <VTTextArea
                name="summary"
                class="mt-3"
                rows="4"
                v-model="form.summary"
                :disabled="false"
                request-name="PostRequest"
                :placeholder="$t('site.Summary')"/>

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
            <div class="mt-3">
                <VTTagsInput
                    :label="$t('site.Tags')"
                    v-model="form.tags"
                    :add-on-key="[13, ':', ';']"
                    :placeholder="$t('site.Please insert your tags')" :multiple="true"/>
            </div>


            <div v-if="form.image?.length > 0">
                <img class="thumbnail w-[100px] rounded mt-2" v-lazy="form.image" alt="image">
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

                <div>
                    <VTSelect 
                    :label="$t('site.Special')"
                    v-model="form.special" 
                    :options="specialList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="special"/>
                </div>

                <div>
                    <VTSelect 
                    :label="$t('site.Type')"
                    v-model="form.type" 
                    :options="typeList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="type"/>
                </div>
            </div>

            <video class="mt-3" v-if="form.type == 1 && form.video" width="100" height="240" controls>
                <source v-lazy="form.video" type="video/mp4">
                <source v-lazy="form.video" type="video/ogg">
                Your browser does not support the video tag.
            </video>

            <div v-if="form.type == 1" class="w-100 mt-3">
                <VTFile
                    :label="$t('site.Choose video')"
                    name="video"
                    @getFileLink="getVideoLink"
                    @on-upload-start="onUploadStart"
                />
            </div>

            <VTButton 
                :loading="!canSubmit"
                :disabled="!canSubmit"
                class="justify-center btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="sendPost()">
                {{ $t('site.Save') }}
            </VTButton> 
        </div>
    </div>
</template>