<script setup>
 
 import {useApi} from '@/utils/api.ts';
  import { ref, onMounted } from 'vue';
  import VTFile from '@/elements/VTFile.vue'
  import VTTextArea from '@/elements/VTTextArea';
  import VTButton from '@/elements/VTButton'; 
  import VTInput from '@/elements/VTInput'; 
  import VTSelect from "@/elements/VTSelect.vue";
//   import { useAuthStore } from '@/stores/auth.ts';
  import { useToast } from "vue-toast-notification";

//   const authStore = useAuthStore();

import { useI18n } from "vue-i18n";
    const { t } = useI18n();

  const isModalVisible = ref(false);
  const status = ref(0);
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
  const type = ref(0);
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
  const special = ref(0);
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
  const category = ref(1);
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


  const image = ref('');
  const video = ref('');
  const content = ref('');

  const resetForm = () => {
    image.value = '';
    video.value = '';
    content.value = '';
  }

  const closeModal = () => {
    resetForm()
    isModalVisible.value = false;
  };
  const getImageLink = (item) => {
    image.value = item;
  };
  const getVideoLink = (item) => {
    video.value = item;
  };


  const sendStatus = () => {
    const $toast = useToast();
    useApi().post(`/api/profile/status/`, {
        content: content.value, 
        image: video.value,
        video: video.value,
        status: 1
    })
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        closeModal()
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
                v-model="title"
                request-name="PostRequest"
                :placeholder="$t('site.Title')"/>
            <VTInput
                :is-vt="true"
                class="mt-3"
                name="pre_title"
                rows="4"
                v-model="preTitle"
                request-name="PostRequest"
                :placeholder="$t('site.Pre title')"/>

                <VTSelect 
                    :label="$t('site.Category')"
                    v-model="category" 
                    :options="categoryList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="category"/>
            
            <VTTextArea
                name="summary"
                class="mt-3"
                rows="4"
                v-model="summary"
                :disabled="false"
                request-name="StatusRequest"
                :placeholder="$t('site.Summary')"/>

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
                        v-model="status" 
                        :options="statusList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="status"/>
                </div>

                <div>
                    <VTSelect 
                    :label="$t('site.Special')"
                    v-model="special" 
                    :options="specialList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="special"/>
                </div>

                <div>
                    <VTSelect 
                    :label="$t('site.Type')"
                    v-model="type" 
                    :options="typeList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="type"/>
                </div>
            </div>

            <div v-if="type == 1" class="w-100 mt-3">
                    <VTFile
                        :label="$t('site.Choose video')"
                        name="image"
                        @getFileLink="getVideoLink"
                    />
               </div>

            <VTButton 
                class="btn btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="sendStatus()">
                {{ $t('site.Save') }}
            </VTButton> 
        </div>
    </div>
</template>