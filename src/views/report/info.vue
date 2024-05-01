<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
//  import jalaliMoment from 'moment-jalaali';
 import { ref, onMounted, watch } from 'vue';
 import { useRoute } from 'vue-router';
 import { useToast } from "vue-toast-notification";
 import VTButton from '@/elements/VTButton'; 
  // import { useAuthStore } from '../../stores/auth';

  // const authStore = useAuthStore();
 import { useI18n } from "vue-i18n";

const route = useRoute();
// const router = useRouter();
const { t } = useI18n();


 const report = ref([]);
 const isDelete = ref(false);
 const type = ref([]);
  

  const getReport = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/reports/${route.params.id}`)
            .then((response) => {
                report.value = response.data;
                isDelete.value = response.data.is_delete;
                type.value = report.value?.model?.commentable_id > 0 ? 'Comment' : report.value?.model?.nickname?.length > 0 ? 'User' : 'Status post';
            });
    }
  }


  watch(() => route.params.id, () => {
    if (route.params.id) {
      getReport();
    } 
  });

  const $toast = useToast();
  const changeStatus = async () => {
    if(confirm(t('site.Are you sure you want to do it?'))) {
        useApi().post(`/api/profile/reports/${route.params.id}`, {is_delete :isDelete.value})
        .then((response) => {
          if (response?.data?.status) {
              $toast.success(response.data.message);
          } else {
            $toast.error(response.data.message);
          }
        })
        .catch(error => {
            if (error.response.data.status == 0) {
                $toast.error(error.response.data.message);
            }
        }).finally(() => {
            getReport();
        })
    }
  };


  onMounted(() => {

    window.document.title =   `${t('site.Report management')} | ${t('site.Website name')}`;
    if (route.params.id) {
        getReport();
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
                          <router-link to="/profile/reports" :title="$t('site.Profile')">
                                {{ $t('site.Report management') }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active">
                            {{ $t('site.Report') }} - {{ report.id }}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="item">
                      <div class="user-info">
                        <div class="flex gap-4 mb-3">
                          <div class="last-chater text-gray-500">{{ $t('site.Status') }} : </div>
                          <div class="user-name">{{ $t('site.' + report?.status) }}</div>
                        </div>
                        <div class="flex gap-4 mb-3">
                          <div class="last-chater text-gray-500">{{ $t('site.Type') }} : </div>
                          <div class="user-name">{{ $t(`site.${type}`) }}</div>
                        </div>
                        <div class="flex gap-4">
                          <div class="flex-none last-chater text-gray-500">{{ $t("site.User message") }}: </div>
                          <div class="user-name">{{ report?.message }}</div>
                        </div>
                        <div class="w-full border border-gray-100 my-3"></div>
                        <div v-if="type == 'User'" class="flex gap-4 mb-3">
                          <div class="last-chater text-gray-500">{{ $t('site.Id') }} : </div>
                          <div class="user-name">
                            <a :href="`/profile/users/edit/${report?.model?.id}`" target="_black">
                              {{ report?.model?.id }}
                            </a>
                          </div>
                            <div class="last-chater text-gray-500">{{ $t('site.Nickname') }} : </div>
                            <div class="user-name">
                              <a :href="`/profile/users/edit/${report?.model?.id}`" target="_black">
                                {{ report?.model?.nickname }}
                              </a>
                            </div>
                            <div class="last-chater text-gray-500">{{ $t('site.Email') }} : </div>
                            <div class="user-name">{{ report?.model?.email }}</div>
                          </div>
                        <div v-else-if="type == 'Comment'" class="flex gap-4 mb-3">
                          <div class="user-name">{{ report?.model?.text }}</div>
                        </div>
                        <div v-else class="flex gap-4 mb-3">
                          <div class="last-chater text-gray-500">
                              <img class="w-[200px]" v-if="report?.model?.file?.length > 0" :src="report?.model?.file" :alt="report?.model?.text">
                          </div>
                          <div class="user-name">{{ report?.model?.text }}</div>
                        </div>

                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :checked="isDelete"
                            v-model="isDelete"
                            id="privateCheck"
                          />
                          <label class="form-check-label" for="privateCheck">
                            {{ $t('site.Delete') }}
                          </label>
                          <div id="privateCheckHelp" class="form-text text-primary">
                          {{ $t('site.by activating; deleting; The type reported (status - user - comment) will be deleted from public view forever') }}
                          </div>
                        </div>
                          <VTButton v-if="report?.status == 'pending'"
                                class="justify-center btn-outline-secondary btn-sm mt-5" 
                                size="medium"
                                color="danger"  
                                @click="changeStatus()">
                                {{ $t('site.Close report') }}
                            </VTButton> 
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>

    
</template>