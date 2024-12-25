<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref, reactive, computed } from 'vue';
  import FullSliderComponent from '@/components/plugins/slider/FullSliderComponent';
  import HorizontalAdvertiseComponent from '@/components/site/components/advertise/HorizontalAdvertiseComponent';
  import VerticalAdvertiseComponent from '@/components/site/components/advertise/VerticalAdvertiseComponent';
  import LatestNewsComponent from '@/components/site/include/LatestNewsComponent';
  import VTButton from '@/elements/VTButton'; 
  import VTInput from '@/elements/VTInput'; 
  import VTTextArea from '@/elements/VTTextArea'; 
  import { useToast } from "vue-toast-notification";
  import { useI18n } from "vue-i18n";    
  import  {useReCaptcha} from 'vue-recaptcha-v3';
  import { useHead } from '@unhead/vue';
  

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
  const { t } = useI18n(); 
  const advertises = ref([]);
  const latest = ref([]);
  const challenged = ref([]);
  const popular = ref([]);
  const specialPosts = ref([]);
  const specialVideos = ref([]);
  
  const initialFormState = {
      first_name: '',
      last_name: '',
      phone: '',
      content: '',
      token: '',
    };
 
  const canSubmit = ref(true);
  const form = reactive({ ...initialFormState });

  const getAdvertises = () => {
    useApi().get('/api/advertise')
        .then((response) => {
            advertises.value = response.data;
        });
  }

  const getPosts = () => {
    useApi().get('/api/suggested-posts')
        .then((response) => {
            latest.value = response?.data?.latest;
            challenged.value = response?.data?.challenged;
            popular.value = response?.data?.popular;
            specialPosts.value = response?.data?.specialPosts;
            specialVideos.value = response?.data?.specialVideos;
        });
  }

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
  };

  const send = async () => {
    
    if (!canSubmit.value) {
        return '';
    }

    await recaptchaLoaded();
    form.token = await executeRecaptcha('login');

    const $toast = useToast();
    useApi().post('/api/advertise-form', form)
    .then((response) => {
      if (response.data.status) {
        $toast.success(response.data.message);
        resetForm();
      }
    })
    .catch(error => {
        if (error.response.data.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };

  const removeCircularReferences = () => {
  const seen = new Set();
  return function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

  onMounted(() => {
    getAdvertises();
    getPosts();

    const jsonld = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t('site.Advertising order') + ` | ` + t('site.Website name'),
        "url": computed(() => window.location.href),
        "description": `ارسال درخواست برای تبلیغات در سایت ورزش پاد` 
    };

    useHead({
        script: [
            {
                hid: "dynamic-json-ld",
                type: "application/ld+json",
                textContent: JSON.stringify(jsonld, removeCircularReferences())
            }
        ],
        title: t('site.Advertising order') + ` | ` + t('site.Website name'),
        link: [
            {
            rel: 'canonical',
            href: computed(() => window.location.href)
            }
        ],
        meta: [
            {
                name: `description`,
                content: `ارسال درخواست برای تبلیغات در سایت ورزش پاد`
            },
            {
                property: `og:title`,
                content: 'تبلیغات ورزش پاد'
            },
            {
                property: `og:description`,
                content: `ارسال درخواست برای تبلیغات در سایت ورزش پاد`
            },
            {
                property: `og:url`,
                content: computed(() => window.location.href)
            },
            {
                name: `twitter:title`,
                content: 'تبلیغات ورزش پاد'
            },
            {
                name: `twitter:description`,
                content: `ارسال درخواست برای تبلیغات در سایت ورزش پاد`
            },
            {
                name: `twitter:url`,
                content: computed(() => window.location.href)
            },
        ]
    })
  });

</script>

<template>
    <div class="container-xxl">
        <main class="mb-4">
            <horizontal-advertise-component :advertises="advertises[1]"/>
            <div class="row">
                <div class="col-12 col-lg-2 ads-column item-column">
                    <vertical-advertise-component v-if="advertises[7]?.length > 0" :advertises="advertises[7]"/>
                </div>
                <div class="col-12 col-lg-7 flex-grow-1">
                    <!-- <div class="card vt-news-card breadcrumb-card mb-3">
                        <div class="card-body">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/" :title="$t('site.Main page')">{{ $t('site.Main page') }}</router-link>
                                    </li>
                                    <li class="breadcrumb-item">
                                        {{ $t('site.Advertising order') }}
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ $t('site.You are here') }}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div> -->
                    <div class="card vt-news-card mb-3">
                        <div class="card-body">
                            <div class="post">
                                <!-- <div class="post--header">
                                    <div class="post--cover ratio ratio-16x9"
                                    :style="`background-image: url('../assets/site/images/register1.png')`">
                                    </div>
                                </div> -->
                                <div class="post--body">
                                    <div class="post--lead">
                                        <h4>{{ $t('site.Advertising order') }}</h4>
                                    </div>
                                    <div class="bg-gray-100 p-5 border mx-5 my-5 rounded">
                                        <form @submit.prevent="send">
                                            <VTInput
                                                :is-vt="true"
                                                name="first_name"
                                                v-model="form.first_name"
                                                request-name="PostRequest"
                                                :placeholder="$t('site.First name')"/>
                                            <VTInput
                                                :is-vt="true"
                                                class="mt-3"
                                                name="last_name"
                                                v-model="form.last_name"
                                                request-name="PostRequest"
                                                :placeholder="$t('site.Last name')"/>

                                            <VTInput
                                                :is-vt="true"
                                                class="mt-3"
                                                name="phone"
                                                max="11"
                                                v-model="form.phone"
                                                request-name="PostRequest"
                                                :placeholder="$t('site.Phone')"/>

                                            <VTTextArea
                                                name="content"
                                                class="mt-3"
                                                rows="4"
                                                v-model="form.content"
                                                :disabled="false"
                                                request-name="PostRequest"
                                                :placeholder="$t('site.Description')"/>
                                                <!-- <Checkbox class="pt-2"
                                                    v-model="checkboxResponse"
                                                    v-model:widget-id="checkboxWidgetID"
                                                /> -->
                                            <VTButton 
                                                :submit="true"
                                                :loading="!canSubmit"
                                                :disabled="!canSubmit"
                                                class="justify-center btn-outline-secondary btn-sm mt-3" 
                                                size="medium"
                                                color="primary"  >
                                                {{ $t('site.Save') }}
                                            </VTButton> 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 flex-grow-1">
                    
                    <div class="mb-75">
                        <full-slider-component :slides="specialPosts"></full-slider-component>
                    </div>

                    <LatestNewsComponent 
                            :latest="latest"
                            :challenged="challenged"
                            :popular="popular"
                        />
                    <!-- specialVideos -->
                    <full-slider-component :slides="specialVideos"></full-slider-component>
                </div>
            </div>
        </main>
    </div>
  </template>


  