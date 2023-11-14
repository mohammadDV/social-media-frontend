<script setup>
 
 import {useApi} from '@/utils/api.ts';
  
 import { ref, onMounted, reactive } from 'vue';
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

 const { t } = useI18n();

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
                    console.log(res)
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


  const form = reactive({
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
  });

//   const tags = ref([]);
//   const preTitle = ref('');
//   const title = ref('');
//   const summary = ref('');
//   const status = ref(0);
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
//   const type = ref(0);
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
//   const special = ref(0);
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
//   const category = ref(1);
  const categoryList = ref();

  const getCategories = () => {
    useApi().get(`/api/active-categories`)
    .then((response) => {
        categoryList.value = response.data;
    })
  }

  onMounted(() => {
    getCategories();
});


//   const image = ref('');
//   const video = ref('');
//   const content = ref('');

//   const resetForm = () => {
//     image.value = '';
//     video.value = '';
//     content.value = '';
//   }

  const getImageLink = (item) => {
    form.image = item;
  };
  const getVideoLink = (item) => {
    form.video = item;
  };
//   const updateContent = ({ editor }) => {
//     console.log(editor.getHTML());
// };


  const sendPost = () => {
    const $toast = useToast();
    useApi().post(`/api/profile/posts/`, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    });
  };

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
                        <li class="breadcrumb-item">
                            {{ $t('site.Create new post') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/posts/create" :title="$t('site.Post management')">
                        <button class="btn btn-primary">{{ $t('site.Post management') }}</button>
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
                request-name="StatusRequest"
                :placeholder="$t('site.Summary')"/>

            <div class="mt-3">
                <label class="text-sm font-medium mb-2">{{ $t('site.Content') }}</label>
                <QuillEditor  v-model:content="form.content" contentType="html" theme="snow" toolbar="full" :modules="modules" />
            </div>
            <div class="mt-3">
                <VTTagsInput
                    :label="$t('site.Tags')"
                    v-model="form.tags"
                    :add-on-key="[13, ':', ';', ' ']"
                    :placeholder="$t('site.Please insert your tags')" :multiple="true"/>
            </div>
    

            <VTFile
                class="mt-3"
                :label="$t('site.Choose image')"
                name="image"
                @getFileLink="getImageLink"
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

            <div v-if="form.type == 1" class="w-100 mt-3">
                    <VTFile
                        :label="$t('site.Choose video')"
                        name="video"
                        @getFileLink="getVideoLink"
                    />
               </div>

            <VTButton 
                class="btn btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="sendPost()">
                {{ $t('site.Save') }}
            </VTButton> 
        </div>
    </div>
</template>