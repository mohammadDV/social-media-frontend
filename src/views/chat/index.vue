<script setup>
 
 import {useApi} from './../../utils/api.ts';
  
 import jalaliMoment from 'moment-jalaali';
 import { ref, onMounted, onBeforeUnmount, reactive, watch } from 'vue';
 import { useRoute } from 'vue-router';
 import { useToast } from "vue-toast-notification";
 import VTFile from '@/elements/VTFile'; 
 import VTButton from '@/elements/VTButton'; 
 import { useAuthStore } from '../../stores/auth';import 
 DropDown from '@/components/plugins/dropdown/DropDown.vue'
import { useI18n } from "vue-i18n";

const block = ref(false);  
const banned = ref(false);

const parentSelectedOption = ref(null);
    const { t } = useI18n();
    const accountMenu = ref([
        {
            id: 1,
            title: t('site.Delete All messages'),
            func: 'deleteMessages',
            icon: 'delete',
        },
        {
            id: 2,
            title: t('site.Block'),
            func: 'blockUser',
            icon: 'block'
        },      
    ]
    );

    const blockUser = () => {

      if (!chat.value.target_id) {
          return;
      }

      useApi().post(`/api/block/${chat.value.target_id == authStore?.user?.id ? chat.value.user_id : chat.value.target_id}`)
          .then((response) => {
              if (response.data.status == 1) {
                  block.value = response.data.block;
                  $toast.success(response.data.message);
              } else {
                  $toast.error(response.data.message);
              }
          });
    }

  watch(() => block.value, () => {
    if (chatId.value) {
        let blockItem = accountMenu.value.find(item => item.id == 2);
        blockItem.title = block.value ? t('site.Unblock') : t('site.Block');
        blockItem.icon = block.value ? 'check' : 'block';
    } 
  });

  const authStore = useAuthStore();

const route = useRoute();

const initialFormState = {
      message: '',
      file: '',
    };

 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });
 const itemMessage = ref([]);
 const pageMessage = ref(1);
 const moreMessage = ref(false);

 const chat = ref([]);
 const items = ref([]);
 const more = ref(false);
 const showAlert = ref(false);
 const page = ref(1);
 const chatId = ref(0);
 const searchQuery = ref('');

 const getChats = (pageId = false) => {
    
    if (!pageId) {
        page.value = 1
        items.value = [];
        scrollToDown();
    }

    useApi().post(`/api/profile/chats?page=${page.value}`, {query : searchQuery.value} )
        .then((response) => {
            if (response.data) {

                if (response.data.data?.length > 0) {
                    if (pageId) {
                        items.value.push(...response.data.data);
                    } else {
                        items.value = response.data.data;
                    }
                }

                if (response.data.total > page.value * response.data.per_page) {
                    more.value = true;
                } else {
                    more.value = false;
                }
                
                page.value++;
            }
        })
        .finally (() => {
          if (page.value == 2 && items.value.length < 1) {
            showAlert.value = true;
          }
        })
    };

  const temp = ref([]);
  

  const getMessages = (id, pageId = false) => {

    chatId.value = id;
    
    resetForm();

    if (!pageId) {
        updateChat(id);
        getChat(id);
        pageMessage.value = 1
        itemMessage.value = [];
    }

      useApi().get(`/api/profile/chats/${id}?page=${pageMessage.value}`)
          .then((response) => {
            if (response.data) {

              if (response.data.data?.length > 0) {
                  if (pageId) {
                    temp.value.push(...response.data.data);
                    itemMessage.value = temp.value.reverse();
                  } else {
                    temp.value = response.data.data;
                    itemMessage.value = response.data.data.reverse();
                  }
              }

              if (response.data.total > pageMessage.value * response.data.per_page) {
                  moreMessage.value = true;
              } else {
                moreMessage.value = false;
              }

              pageMessage.value++;
            }
          })
          .finally(() => {
            if (!pageId) {
              setTimeout(() => {
                scrollToDown();
                }, 100)
            }
          });
  }

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const deleteFile = () => {
    form.file = '';
  }

  const getFileLink = (item) => {
    form.file = item;
    canSubmit.value = true;
  };

  const getErrors = (error) => {
    if (error?.response?.data?.message) {
      $toast.error(error?.response?.data?.message);
    }
  };

  const $toast = useToast();
  const deleteMessages = async () => {

    if (chatId.value < 1) {
      return;
    }

    if(confirm(t('site.Are you sure you want to do it?'))) {
        useApi().post(`/api/profile/chats/delete/${chatId.value}`)
        .then((response) => {
          if (response?.data?.status) {
              $toast.success(response.data.message);
          }
        })
        .catch(error => {
            if (error.response.data.status == 0) {
                $toast.error(error.response.data.message);
            }
        }).finally(() => {
            getMessages(chatId.value);
            updateChat(chatId.value);
        })
    }
  };

  const getChat = async (id) => {
        useApi().get(`/api/profile/chats/info/${id}`)
        .then((response) => {
          chat.value = response?.data;
          block.value = response?.data?.block;
          banned.value = response?.data?.banned;
        })
  };

  const reset = ref(false)

  const resetForm = () => {
    reset.value = true;
    Object.assign(form, { ...initialFormState });
  };

  const send = (id) => {
    if (!canSubmit.value || !chat.value?.id) {
        return '';
    }

    const $toast = useToast();
    useApi().post(`/api/profile/chats/${id}`, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);

        itemMessage.value.push({
          message: form.message,
          file: form.file,
          user_id: authStore.user.id,
        });
        resetForm();
        setTimeout(() => {
            scrollToDown();
        }, 100)
        
      } else {
        $toast.error(response.data.message);
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };

  watch(searchQuery, () => {
      getChats();
  });

  const updateChat = (id) => {
    let chatRow = items.value.find(item => item.id == id);
    
    if (chatRow) {
      chatRow.messages_count = 0;
    }
  } 

  const scrollableDiv = ref(null);

  const scrollToDown = () => {
      scrollableDiv.value.scrollTo({ top: scrollableDiv.value.scrollHeight});
    };


  onMounted(() => {
        getChats();
        if (route.params.id) {
          getMessages(route.params.id);
        }

      window.document.title =   `${t('site.Private messages')} | ${t('site.Website name')}`;
    });

    onBeforeUnmount(() => {
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
                            {{ $t('site.Private messages') }}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-7 col-lg-8 order-2 order-md-2">
              
              <div v-show="showAlert" class="alert alert-info">
                کاربر گرامی،
                <br>
                شما میتوانید از طریق مراجعه به پروفایل افراد برای آنها پیام شما می‌توانید از طریق مراجعه به پروفایل افراد، برای آن‌ها پیام خصوصی ارسال کنید و برای ادامه‌ی مکالمه به این صفحه بازگردید. (از نوار جستجوی بالا می‌توانید فرد مورد نظر خود را پیدا کنید.)
            </div>
              <div class="flex gap-3 p-2 mb-3 rounded-t bg-white" v-if="chat?.user_id == authStore.user?.id || chat?.target_id == authStore.user?.id">
                  <div>
                     
                    <router-link class="text-black text-decoration-none" :to="chat.target_id == authStore?.user?.id ? `/member/${chat?.user?.id}` : `/member/${chat?.target?.id}`">
                      <img class="w-[50px] h-[50px] rounded-full"
                            :src="chat.target_id == authStore?.user?.id ? chat?.user.profile_photo_path : chat?.target.profile_photo_path"
                            :alt="authStore?.user?.nickname"
                          />
                    </router-link>
                  </div>
                  <div class="flex-1 mt-3">
                      <div class="tweet-user-name">
                          <router-link class="text-black text-decoration-none" :to="chat.target_id == authStore?.user?.id ? `/member/${chat?.user?.id}` : `/member/${chat?.target?.id}`">
                            {{ chat.target_id == authStore?.user?.id ? chat?.user.nickname : chat?.target.nickname }}
                          </router-link>
                      </div>
                  </div>
                  <div>
                    <DropDown
                        menuClass="min-w-[170px]"
                        color="white"
                        float="left"
                        @deleteMessages="deleteMessages"
                        @blockUser="blockUser"
                        :options="accountMenu"
                        v-model="parentSelectedOption"/>
                    <!-- <a @click="deleteMessages(chatId)" :title="$t('site.Delete All messages')"
                        class="bg-danger rounded text-white p-2 hover:text-white hover:bg-red-700 flex justify-center mx-auto justify-center m-2 text-decoration-none cursor-pointer">
                      {{ $t('site.Delete All messages') }}
                    </a> -->
                  </div>
                  <!-- <div class="">
                      <div :class="`relative cursor-pointer max-w-[200px]`" ref="dropDown">
                          <div :class="`border border-gray-200 rounded-[5px] p-[5px] flex justify-between items-center gap-[5px]`" 
                          @click="toggleDropDown">
                              <span class="px-2 py-1">
                                  ...
                              </span>   
                          </div>
                          <Transition name="slide-fade">
                              <div :class=" `mt-[5px] w-[200px] left-0 border border-gray-100 bg-white rounded-md shadow-[1px_1px_4px_1px_rgba(40, 68, 120 ,0.59)] absolute z-50 p-[0.5rem]`"
                                  v-if="isDropDownVisible"
                              >
                                  <div v-if="status.user.id === authStore.user.id" class="p-2 border-b option hover:bg-gray-100" @click="showEditStatus(status.id)">
                                      <span class="material-icons"> edit </span>
                                      {{ $t('site.Edit') }}
                                  </div>
                                  <div class="p-2 option hover:bg-gray-100"  @click="saveStatus(status.id)">
                                      <template v-if="isSave">
                                          <span class="material-icons"> bookmark_remove </span>
                                          {{ $t('site.Unsave') }}
                                      </template>
                                      <template v-else>
                                          <span class="material-icons"> bookmark </span>
                                          {{ $t('site.Save') }}
                                      </template>
                                  </div>
                              </div>
                          </Transition>
                      </div>
                  </div> -->
              </div>

              <div ref="scrollableDiv" class="chater-body overflow-scroll h-[500px]">
                <div class="text-center">
                  <a class="p-2 cursor-pointer text-primary text-decoration-none" v-if="moreMessage" @click="getMessages(chatId, true)">پیام های قدیمی تر</a>
                </div>
                <template v-for="(message, index) in itemMessage" :key="index">
                    <div :class="{
                        'chat-item': true,
                        'is-inline-end': message?.user_id != authStore.user?.id,
                        'is-inline-start': message?.user_id == authStore.user?.id
                        }">
                        <div class="card">
                            <div :class="{'card-body': true, 'bg-green-light': message?.user_id == authStore.user?.id}">
                                {{ message.message }}
                            <br>
                            <div class="my-4">
                                <a v-if="message?.file?.length > 0" :href="message?.file" target="_black" 
                                    class="bg-vt text-white hover:bg-blue-900 hover:text-white rounded p-3 text-decoration-none cursor-pointer">
                                    {{ $t('site.Download file') }}
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
              <div class="relative" v-if="!banned && (chat?.user_id == authStore.user?.id || chat?.target_id == authStore.user?.id)">
                <div class="flex gap-2 absolute top-[-75px] right-0 my-4">
                    <a v-if="form?.file?.length > 0" 
                        class="bg-vt text-white hover:text-white hover:bg-blue-900 rounded p-3 text-decoration-none cursor-pointer">
                        {{ $t('site.File') }}
                    </a>
                    <a v-if="form?.file?.length > 0" @click="deleteFile" 
                        class="bg-danger text-white hover:text-white hover:bg-red-700 rounded p-3 text-decoration-none cursor-pointer">
                        {{ $t('site.Delete file') }}
                    </a>
                </div>
                <div class="bg-white w-full mt-2 input-group d-none d-lg-flex">
                    <span 
                    @click="send(authStore.user?.id == chat?.user_id ? chat?.target_id : chat?.user_id)" 
                    class="bg-white input-group-text-profile cursor-pointer">
                        <span class="material-icons size-font-ahalf"> send </span>
                    </span>
                    <VTFile 
                    icon="link"
                    name="file"
                    @getFileLink="getFileLink"
                    @getErrors="getErrors"
                    @on-upload-start="onUploadStart"
                    />
                    <input @keydown.enter.prevent="send(authStore.user?.id == chat?.user_id ? chat?.target_id : chat?.user_id)" v-model="form.message" class="v-full bg-white form-control navbar-search p-2" type="text" placeholder="پیام خود را بنویسید...">
                </div>

                <input type="file" ref="inputElement" class="hidden"  />
              </div>
              
            </div>
            <div
              class="col-12 col-md-5 col-lg-4 order-1 order-md-3 chater-list-wrap"
            >
              <div class="pr-4 mb-3">
                <input v-model.lazy="searchQuery" name="search" class="v-full bg-white form-control navbar-search p-2" type="text" :placeholder="$t('site.Search')">
              </div>
              <div class="chater-list">
                <div v-for="(chat, index) in items" :key="index" class="card is-chater">
                  <div @click="getMessages(chat.id)" :class="{ 'card-body' : true, 'bg-green-light': chat.id == chatId}">
                    <!-- {{ chat.messages_count }} -->
                    <div class="relative item">
                      <span v-if="chat?.messages_count" class="absolute -right-1 top-0 flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
                      </span>
                      <!-- <p v-if="chat?.messages_count" class="z-10 absolute text-center m-auto bg-green rounded-full p-2 w-5 h-5 text-dark"></p> -->
                      <div class="z-0 relative item-avatar">
                        <!-- <router-link :to="`/member/${ chat.target_id == authStore?.user?.id ? chat?.user.id : chat?.target.id}`"> -->
                          <img
                            :src="chat.target_id == authStore?.user?.id ? chat?.user.profile_photo_path : chat?.target.profile_photo_path"
                            :alt="authStore?.user?.nickname"
                          />
                        <!-- </router-link> -->
                      </div>
                      <div class="user-info">
                        <div class="user-name">{{ chat.target_id == authStore?.user?.id ? chat?.user.nickname : chat?.target.nickname }}</div>
                        <div class="last-chater">{{ jalaliMoment(chat.updated_at).fromNow() }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full pt-2 mb-2" v-if="more">
                    <VTButton 
                        :loading="!canSubmit"
                        :disabled="!canSubmit"
                        class="w-full justify-center btn-outline-secondary btn-sm" 
                        size="medium"
                        color="primary"  
                        @click="getChats(true)">
                        {{ $t('site.More post')  }}
                    </VTButton> 
                </div>
              </div>
            </div>
        </div>
    </div>

    
</template>