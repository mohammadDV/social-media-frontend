<script setup>
 
 import {useApi} from './../../utils/api.ts';
//  import {helper} from '@/utils/helper.ts';
  
 import jalaliMoment from 'moment-jalaali';
 import { ref, onMounted, watch, reactive } from 'vue';
 import { useRoute } from 'vue-router';
 import { useToast } from "vue-toast-notification";
 import VTFile from '@/elements/VTFile'; 
 import VTButton from '@/elements/VTButton'; 
//  import { useI18n } from "vue-i18n";

const route = useRoute();
// const router = useRouter();
// const { t } = useI18n();

const initialFormState = {
      message: '',
      file: '',
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
 const ticket = ref([]);
  

  const getTicket = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/tickets/${route.params.id}`)
            .then((response) => {
                ticket.value = response.data;
            });
    }
  }

  const onUploadStart = () => {
    canSubmit.value = false;
  }
  const getFileLink = (item) => {
    form.file = item;
    canSubmit.value = true;
  };

  watch(() => route.params.id, () => {
    if (route.params.id) {
        getTicket();
    } 
  });

  const reset = ref(false)

  const resetForm = () => {
    reset.value = true;
    Object.assign(form, { ...initialFormState });
  };



  const send = () => {

    console.log("xasxasx");
    if (!canSubmit.value) {
        return '';
    }

    const $toast = useToast();
    useApi().post(`/api/profile/tickets/${route.params.id}`, form)
    .then((response) => {
      if (response.data.status) {
            $toast.success(response.data.message);
            resetForm();
            getTicket();
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
        getTicket();
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
                            {{ $t('site.Ticket') }}
                        </li>
                        <li class="breadcrumb-item active">
                            {{ ticket?.subject?.title }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/tickets" :title="$t('site.Ticket management')">
                        <button class="btn btn-primary">{{ $t('site.Ticket management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-7 col-lg-8 order-2 order-md-2">
              <div class="chater-body overflow-scroll max-h-[500px]">
                <template v-for="(message, index) in ticket?.messages" :key="index">
                    <div :class="{
                        'chat-item': true,
                        'is-inline-end': message.user_id != ticket.user_id,
                        'is-inline-start': message.user_id == ticket.user_id
                        }">
                        <div class="card">
                            <div :class="{'card-body': true, 'bg-green-light': message.user_id == ticket.user_id}">
                                {{ message.message }}
                            <br>
                            <div class="my-4">
                                <a v-if="message?.file?.length > 0" :href="message?.file" target="_black" 
                                    class="bg-vt text-white rounded p-3 text-decoration-none cursor-pointer">
                                    دانلود فایل
                                </a>
                            </div>
                            <div class="chat-item-date">
                                <span>{{ jalaliMoment(message.created_at).format('jYYYY-jMM-jDD - HH:mm') }}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </template>
              </div>
              <div>
                <div class="bg-white w-full mt-2 input-group d-none d-lg-flex">
                    <span @click="send" class="bg-white input-group-text-profile cursor-pointer">
                        <span class="material-icons size-font-ahalf"> send </span>
                    </span>
                    <VTFile 
                    icon="link"
                    name="file"
                    @getFileLink="getFileLink"
                    @on-upload-start="onUploadStart"
                    />
                    <input v-model="form.message" class="v-full bg-white form-control navbar-search p-2" type="text" placeholder="پیام خود را بنویسید...">
                </div>

                <input type="file" ref="inputElement" class="hidden"  />
              </div>
            </div>
            <div
              class="col-12 col-md-5 col-lg-4 order-1 order-md-3 chater-list-wrap"
            >
              <div class="chater-list">
                <div class="card is-chater">
                  <div class="card-body">
                    <div class="item">
                      <div class="user-info">
                          <div class="last-chater">{{ $t('site.Status') }}</div>
                          <div class="user-name">{{ $t('site.' + ticket?.status) }}</div>
                          <VTButton v-if="ticket?.status == 'active'"
                                class="justify-center btn-outline-secondary btn-sm mt-3" 
                                size="medium"
                                color="danger"  
                                @click="closeTicket()">
                                {{ $t('site.Close Ticket') }}
                            </VTButton> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>

    
</template>