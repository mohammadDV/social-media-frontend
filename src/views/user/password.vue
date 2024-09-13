<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
 import { ref, reactive, onMounted } from 'vue';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import { useToast } from "vue-toast-notification"; 
 import { useI18n } from "vue-i18n";
 
 const { t } = useI18n();

const initialFormState = {
      current_password: '',
      password: '',
      confirm_password: ''
    };

 const canSubmit = ref(true);
 const form = reactive({});


  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
  };

  const sendPost = () => {

    if (!canSubmit.value) {
        return '';
    }

    const $toast = useToast();
    useApi().patch(`/api/profile/users/password`, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };

  onMounted(() => {
    window.document.title =   `${t('site.Edit profile')} | ${t('site.Website name')}`;

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
                            {{ $t('site.Edit profile') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/users" :title="$t('site.User manage')">
                        <!-- <button class="btn btn-primary">{{ $t('site.User management') }}</button> -->
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
            
            <VTInput
                class="m-2"
                :is-vt="true"
                name="current_password"
                v-model="form.current_password"
                input-type="password"
                request-name="UpdatePasswordRequest"
                :label="$t('site.Current password')"/>
            <VTInput
                class="m-2"
                :is-vt="true"
                name="password"
                v-model="form.password"
                input-type="password"
                request-name="UpdatePasswordRequest"
                :label="$t('site.New password')"/>
            <VTInput
                class="m-2"
                :is-vt="true"
                name="confirm_password"
                v-model="form.confirm_password"
                input-type="password"
                :label="$t('site.New password Confirmation')"/>


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