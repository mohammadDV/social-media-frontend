<script setup>
 
 import {useApi} from './../../utils/api.ts';  
 import {helper} from '@/utils/helper.ts';
 import { ref, onMounted, reactive, watch, defineEmits, defineProps } from 'vue';
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";

 defineProps({
    myClubs: {
        type: Array,
        require: true
    }
});

const initialFormState = {
      sport_id: 1,
      country_id: 0,
      search: '',
    };

 const { t } = useI18n();
 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });

 
 const emit = defineEmits(['updateMembers']); 

  const sportList = ref();

  const getSports = () => {
    useApi().get(`/api/sport/index`)
    .then((response) => {
        sportList.value = response.data;
    })
  }
  const countryList = ref([]);

  const getCountries = () => {
    useApi().get(`/api/country/index`)
    .then((response) => {
        countryList.value.push({
            id: 0,
            title: t('site.All')
        }, ...response.data);
    })
  }

  const follow = (clubId) => {
    useApi().post(`/api/favorite/clubs/${clubId}`)
        .then((response) => {
            if (response.data.status == 1) {
                if (response.data.active == 1) {
                    items.value = items.value.filter(item => item.id != clubId);
                }
                getClubs();
                $toast.success(response.data.message);
            } else {
                $toast.error(response.data.message);
            }
        });
  }
  
  const getClubs = () => {
    emit('getMyClubs');
  }

  const items = ref([]);
  const more = ref(false);
  const page = ref(1);
  watch(() => form.sport_id, () => {
        // items.value = [];
        // page.value = 1;
  });
  
//   const resetForm = () => {
//     Object.assign(form, { ...initialFormState });
//     helper().goToTop();
//   };


const $toast = useToast();

  const send = (pagination = false) => {

    if (!canSubmit.value) {
        return '';
    }

    if (!pagination) {
        page.value = 1
        items.value = [];
    }

    useApi().post(`/api/favorite/clubs/search?page=${page.value}`, form)
    .then((response) => {
      if (response.data) {
        // $toast.success(response.data.message);

        if (response.data.data?.length > 0) {
            items.value.push(...response.data.data);
        }

        if (response.data.total > page.value * response.data.per_page) {
            more.value = true;
        } else {
            more.value = false;
        }

        page.value++;
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };


  onMounted(() => {
    helper().goToTop();
    send();
    getClubs();
    getCountries();
    getSports();
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
                            {{ $t('site.Choose favorite clubs') }}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div>
            <div class='grid grid-cols-4 gap-4 my-3'>
                <div v-for="(myClub, index) in myClubs" :key="index" class='card'>
                    <div class='card-body is-listItem items-center'>
                    <img class='rounded-full w-[150px] h-[150px]' :src='myClub.image'/>
                    <span class='item-date'>{{ myClub.sport.title }}</span>
                    <span class='item-title'>{{ myClub.title +  ' ' + myClub.country.title }}</span>
                        <a @click="follow(myClub.id)" class='w-100 btn btn-danger text-white'  >{{ $t('site.Unfollow') }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 items-end mb-3">
                <div >
                    <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="search"
                        v-model="form.search"
                        :label="$t('site.Search')"
                        :placeholder="$t('site.Search of club')"/>
                </div>
                <div >
                    <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Sport')"
                        v-model="form.sport_id" 
                        :options="sportList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="sport_id"/>
                </div>
                <div >
                    <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Country')"
                        v-model="form.country_id" 
                        :options="countryList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="country_id"/>
                </div>
                <div >
                    <VTButton 
                        :loading="!canSubmit"
                        :disabled="!canSubmit"
                        class="justify-center btn-outline-secondary btn-sm mt-3" 
                        size="medium"
                        color="primary"  
                        @click="send()">
                        {{ $t('site.Search') }}
                    </VTButton> 
                </div>
            </div>
        </div>

        <div>
            <div class='grid grid-cols-4 gap-4 my-3'>
                <div v-for="(club, index) in items" :key="index" class='card'>
                    <div class='card-body is-listItem items-center'>
                    <img class='rounded-full w-[150px]' :src='club.image'/>
                    <span class='item-date'>{{ club.sport.title }}</span>
                    <span class='item-title'>{{ club.title +  ' ' + club.country.title }}</span>
                        <a @click="follow(club.id)" class='w-100 btn btn-info text-white'  >{{ $t('site.Follow') }}</a>
                    </div>
                </div>
            </div>
        </div>


        <div class="card p-3" v-if="more">
            <VTButton 
                :loading="!canSubmit"
                :disabled="!canSubmit"
                class="justify-center btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="send(true)">
                {{ $t('site.More post')  }}
            </VTButton> 
        </div>
    </div>
</template>