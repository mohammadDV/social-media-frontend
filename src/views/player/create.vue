<script setup>
 
 import {useApi} from './../../utils/api.ts';
 import {helper} from '@/utils/helper.ts';
 import { ref, onMounted, reactive, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import VTFile from '@/elements/VTFile.vue'
 import VTButton from '@/elements/VTButton'; 
 import VTInput from '@/elements/VTInput'; 
 import VTSelect from "@/elements/VTSelect.vue";
 import { useToast } from "vue-toast-notification";
 import { useI18n } from "vue-i18n";

 const route = useRoute();
 const router = useRouter();
 const initialFormState = {
      title: '',
      alias_title: '',
      position: '',
      foot: '',
      height: '',
      age: '',
      number: '',
      sport_id: 1,
      country_id: 1,
      club_id: 0,
      image: '',
    };

 const { t } = useI18n();
 const canSubmit = ref(true);
 const form = reactive({ ...initialFormState });

 const positionList = ref([
    {
        id:'Goalkeeper',
        title: t('site.Goalkeeper')
    },
    {
        id:'Defender',
        title: t('site.Defender')
    },
    {
        id:'Midfielder',
        title: t('site.Midfielder')
    },
    {
        id:'Forward',
        title: t('site.Forward')
    }
  ]);

  const footList = ref([
    {
        id:'Right',
        title: t('site.Right')
    },
    {
        id:'Left',
        title: t('site.Left')
    }
  ]);
  
  const sportList = ref();

  const getSports = () => {
    useApi().get(`/api/sport/index`)
    .then((response) => {
        sportList.value = response.data;
    })
  }
  const countryList = ref();

  const getCountries = () => {
    useApi().get(`/api/country/index`)
    .then((response) => {
        countryList.value = response.data;
    })
  }

  const getplayer = () => {
    
    if (route.params.id != undefined) {
        useApi().get(`/api/profile/players/${route.params.id}`)
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
        getplayer();
    } 
  });

  const onUploadStart = () => {
    canSubmit.value = false;
  }

  const getImageLink = (item) => {
    form.image = item;
    canSubmit.value = true;
  };

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    helper().goToTop();
  };

  const send = () => {

    if (!canSubmit.value) {
        return '';
    }

    let url = '/api/profile/players/';

    if (route.params.id) {
        url = `/api/profile/players/${route.params.id}`;
    }

    const $toast = useToast();
    useApi().post(url, form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm()
        if (route.params.id) {
            router.push({
                name: 'player.index'
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
        getplayer();
    }

    window.document.title =   `${t('site.Create new player')} | ${t('site.Website name')}`;

    getCountries();
    getSports();
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
                            {{ $t('site.Create new player') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/players" :title="$t('site.Player management')">
                        <button class="btn btn-primary">{{ $t('site.Player management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="flex items-end md:flex-nowrap gap-3 mb-3">
                <div class="w-full md:w-1/3">
                    <VTInput
                        :is-vt="true"
                        name="title"
                        v-model="form.title"
                        request-name="playerRequest"
                        :label="$t('site.Title')"/>
                </div>
                <div class="w-full md:w-1/3">
                    <VTInput
                        :is-vt="true"
                        name="alias_title"
                        v-model="form.alias_title"
                        request-name="playerRequest"
                        :label="$t('site.English title')"/>
                </div>
                <div class="w-full md:w-1/3">
                    <VTInput
                        :is-vt="true"
                        name="age"
                        v-model="form.age"
                        request-name="playerRequest"
                        :label="$t('site.Age')"/>
                </div>
            </div>
            <div class="flex items-end md:flex-nowrap gap-3 mb-3">
                <div class="w-full md:w-1/3">
                    <VTInput
                        :is-vt="true"
                        name="height"
                        v-model="form.height"
                        request-name="playerRequest"
                        :label="$t('site.Height')"/>
                </div>
                <div class="w-full md:w-1/3">
                    <VTSelect 
                        :label="$t('site.Foot')"
                        v-model="form.foot" 
                        :options="footList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="foot"/>
                </div>
                <div class="w-full md:w-1/3">
                    <VTInput
                        :is-vt="true"
                        name="number"
                        v-model="form.number"
                        request-name="playerRequest"
                        :label="$t('site.Tshirt number')"/>
                </div>
            </div>
            <div class="flex items-end md:flex-nowrap gap-3 mb-3">
                <div class="w-full md:w-1/3">
                    <VTSelect 
                        :label="$t('site.Sport')"
                        v-model="form.sport_id" 
                        :options="sportList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="sport_id"/>
                </div>
                <div class="w-full md:w-1/3">
                    <VTSelect 
                        :label="$t('site.Country')"
                        v-model="form.country_id" 
                        :options="countryList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="country_id"/>
                </div>
                <div class="w-full md:w-1/3">
                    <VTSelect 
                        :label="$t('site.Position')"
                        v-model="form.position" 
                        :options="positionList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="position"/>
                </div>
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

            <VTButton 
                :loading="!canSubmit"
                :disabled="!canSubmit"
                class="justify-center btn-outline-secondary btn-sm mt-3" 
                size="medium"
                color="primary"  
                @click="send()">
                {{ $t('site.Save') }}
            </VTButton> 
        </div>
    </div>
</template>