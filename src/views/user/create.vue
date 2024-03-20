<script setup>
 
 import {useApi} from './../../utils/api.ts';
//  import {helper} from '@/utils/helper.ts';
  
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTFile from '@/elements/VTFile.vue'
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";
 import { useAuthStore } from '@/stores/auth.ts';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// const initialFormState = {
//       first_name: '',
//       last_name: '',
//       nickname: '',
//       email: '',
//       mobile: '',
//       status: 0,
//       biography: '',
//       profile_photo_path: '',
//       bg_photo_path: '',
//     };

 const { t } = useI18n();
 const canSubmit = ref(true);
 const form = reactive({ ...authStore.user });

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

  const getUser = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/users/info/${route.params.id}`)
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
        getUser();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getImageLink = (item) => {
    form.profile_photo_path = item;
    canSubmit.value = true;
  };

  const getBackgroundLink = (item) => {
    form.bg_photo_path = item;
    canSubmit.value = true;
  };

//   const resetForm = () => {
//     Object.assign(form, { ...initialFormState });
//     helper().goToTop();
//   };

  const sendPost = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = `/api/profile/users/${form.id}`;

    if (route.params.id) {
        url = `/api/profile/users/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {

        if (!route.params.id) {
            authStore.setUser(authStore.token);
        }
        
        $toast.success(response.data.message);
        // resetForm()
        if (route.params.id && 1 == 2) {
            router.push({
                name: 'users.index'
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
        getUser();
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
                            {{ $t('site.Edit profile') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/users" :title="$t('site.User manage')">
                        <button class="btn btn-primary">{{ $t('site.User management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
                <div class="row mb-3">
                  <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                    <VTInput
                        :is-vt="true"
                        name="first_name"
                        v-model="form.first_name"
                        request-name="PostRequest"
                        :label="$t('site.First name')"/>
                  </div>
                  <div class="col-12 col-lg-6">
                    <VTInput
                        :is-vt="true"
                        name="last_name"
                        v-model="form.last_name"
                        request-name="PostRequest"
                        :label="$t('site.Last name')"/>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                    <VTInput
                        :is-vt="true"
                        name="nickname"
                        v-model="form.nickname"
                        request-name="PostRequest"
                        :label="$t('site.Nickname')"/>
                  </div>
                  <div class="col-12 col-lg-6">
                    <VTInput
                        :is-vt="true"
                        :disabled="true"
                        name="email"
                        v-model="form.email"
                        :label="$t('site.Email')"
                        request-name="PostRequest"/>
                    <div id="EmailHelp" class="form-text px-1 text-primary text-xs">
                    {{ $t('site.If you forget your password, new information will be sent to your email') }}        
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                    <VTInput
                        :is-vt="true"
                        name="mobile"
                        v-model="form.mobile"
                        request-name="PostRequest"
                        :label="$t('site.Mobile')"/>
                  </div>
                  <div class="col-12 col-lg-6">
                    <VTInput
                        :is-vt="true"
                        name="biography"
                        v-model="form.biography"
                        request-name="PostRequest"
                        :label="$t('site.Biography')"/>
                  </div>
                </div>
                <div class="mb-3">
                  <fieldset class="is-fieldset">
                    <legend>{{ $t('site.Image profile') }} :</legend>
                    <div class="d-flex flex-column flex-lg-row">
                      <div class="flex-grow-1 ms-lg-5">
                        <div class="mb-3">
                          <VTFile
                                name="image"
                                @getFileLink="getImageLink"
                                @on-upload-start="onUploadStart"
                            />
                          <div id="profileCoverHelp" class="form-text">
                            تصاویر بزرگتر از 1024x1024 پیکسل کوچک می‌شوند.
                          </div>
                        </div>
                      </div>
                      <div class="">
                        <div class="preview-container">
                          <img
                            :src="form.profile_photo_path"
                            id="profileCoverPreview"
                            class="profile-preview fix-hidden"
                            alt="profile cover preview"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="mb-3">
                  <fieldset class="is-fieldset">
                    <legend>{{ $t('site.Image background') }} :</legend>
                    <div class="d-flex flex-column flex-lg-row">
                      <div class="flex-grow-1 ms-lg-5">
                        <div class="mb-3">
                          <VTFile
                                name="image"
                                @getFileLink="getBackgroundLink"
                                @on-upload-start="onUploadStart"
                            />
                          <div id="profileCoverHelp" class="form-text">
                            تصاویر بزرگتر از 1024x1024 پیکسل کوچک می‌شوند.
                          </div>
                        </div>
                      </div>
                      <div class="">
                        <div class="preview-container-cover">
                          <img
                            :src="form.bg_photo_path"
                            id="profileCoverPreview"
                            class="profile-preview fix-hidden"
                            alt="profile cover preview"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.is_private"
                    id="privateCheck"
                  />
                  <label class="form-check-label" for="privateCheck">
                    {{ $t('site.Private account') }}
                  </label>
                  <div id="privateCheckHelp" class="form-text">
                  {{ $t('site.Only your followers will be able to see your statuses') }}
                  </div>
                </div>
            
            <div class="mt-3">
                <VTSelect 
                    :label="$t('site.Status')"
                    v-model="form.status" 
                    :options="statusList" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="status"/>
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