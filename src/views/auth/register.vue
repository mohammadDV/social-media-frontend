
<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import VTButton from '@/elements/VTButton'; 
import VTInput from '@/elements/VTInput'; 
import { useRouter } from 'vue-router';
import { useToast } from "vue-toast-notification";
import { useI18n } from "vue-i18n";   
import {useApi} from '@/utils/api.ts';     
import  {useReCaptcha} from 'vue-recaptcha-v3'
// import SocialLoginComponent from '../../components/site/SocialLoginComponent.vue'

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
const { t } = useI18n();    
const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();  
const data = ref({
    first_name: '',
    last_name: '',
    nickname: '',
    email: '',
    password: '',
    token: '',
});
  
const register = async function() {

    if (data.value?.name?.length < 3 || data.value.email?.length < 3 || data.value.password?.length < 3) { 
        $toast.error(t('site.Please fill in the necessary fields'));
        return;
    }

    await recaptchaLoaded()
    data.value.token = await executeRecaptcha('login')

    await useApi().post('/api/register/', data.value)
        .then((response) => {
            if (response.data?.token?.length > 0) {
                $toast.success(t('site.Welcome'));
                    authStore.setToken(response.data.token);
                    router.push({
                    name: 'profile'
                })
            }
        })
        .catch(error => {
            if (error.response.data) {
                $toast.error(error.response.data.message);
            }
        })
  };

  onMounted(()=> {
    window.document.title =   `${t('site.Register to site')} | ${t('site.Website name')}`;
  });

</script>
<template>
<div class="flex relative min-h-screen">
        <div
            class="flex flex-1 flex-col justify-center px-8 py-1 sm:px-6 lg:flex-none lg:px-20 xl:px-24 pb-40 bg-white"
        >
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <router-link to="/" class="no-underline text-red-300 mx-1">
                        <img
                            class="w-[200px] m-auto"
                            src="/site/images/logo.png"
                        />
                    </router-link>
                    
                    <h2
                        v-show="!twoFaLogin"
                        class="mt-2 text-2xl text-gray-700"
                    >
                       ثبت نام در سایت    
                    </h2>
                    <div class="register-moreDetail text-right">
                        <p class="text-md mb-2 text-gray-400">* نام مستعار نامیست که شما را در اپلیکیشن با آن میشناسند.</p>
                        <p class="text-md mb-2 text-gray-400">* {{ $t('site.For nickname just use english words and underline') }}</p>
                        <p class="text-md mb-2 text-gray-400">* رمز عبور باید شامل حروف و اعداد به صورت ترکیبی باشد.</p>
                        <p class="text-md mb-2 text-gray-400">* لطفا از ایمیل معتبر استفاده نمایید (جهت بازیابی رمز عبور) .</p>
                    </div>
                </div>

                <div class="mt-2">
                    <form @submit.prevent="register" method="post" class="space-y-6">
                        <div class="flex gap-2">
                            <VTInput
                                class="mt-3"
                                requestName="RegisterRequest"
                                :is-vt="true"
                                name="first_name"
                                v-model="data.first_name"
                                :placeholder="$t('site.First name')"/>
                            <VTInput
                                class="mt-3"
                                requestName="RegisterRequest"
                                :is-vt="true"
                                name="last_name"
                                v-model="data.last_name"
                                :placeholder="$t('site.Last name')"/>
                       </div>
                            <VTInput
                                    requestName="RegisterRequest"
                                    :is-vt="true"
                                    name="nickname"
                                    v-model="data.nickname"
                                    :placeholder="$t('site.Nickname')"/>
                            <VTInput
                                requestName="RegisterRequest"
                                :is-vt="true"
                                name="email"
                                v-model="data.email"
                                :placeholder="$t('site.Email')"/>
                            <VTInput
                                requestName="RegisterRequest"
                                :is-vt="true"
                                name="mobile"
                                v-model="data.mobile"
                                :placeholder="'09...'"/>
                            <VTInput
                                inputType="password"
                                requestName="RegisterRequest"
                                :is-vt="true"
                                name="password"
                                v-model="data.password"
                                :placeholder="$t('site.Password')"/>

                                <!-- <Checkbox
                                    v-model="checkboxResponse"
                                    v-model:widget-id="checkboxWidgetID"
                                /> -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <input
                                            id="privacy_policy"
                                            v-model="data.privacy_policy"
                                            class="h-4 w-4 rounded border-gray-300 mx-2"
                                            name="privacy_policy"
                                            type="checkbox"
                                        />
                                        <label class="ml-2 block text-sm text-gray-900" for="privacy_policy">
                                            من با
                                            <span class="text-gray-500">
                                                <a
                                                    class="text-intellivy-600"
                                                    href="/page/privacy-policy"
                                                    target="_blank"
                                                    >قوانین و مقررات</a
                                                >
                                            </span>
                                            سایت موافقم
                                        </label>
                                    </div>
                                </div>
                            <VTButton class="mt-4 w-100" color="dark" size="medium" type="submit">
                                {{ $t('site.Register') }}
                            </VTButton>
                            <!-- <div >
                                <div class="h-4 mt-4 relative">
                                    <div class="flex items-center justify-center">
                                        <div class="text-gray-700 bg-white text-md font-bold px-2 z-10">
                                            <span>یا با اکانت گوگل ادامه دهید.</span>
                                        </div>
                                    </div>
                                    <div
                                        class="absolute left-0 top-3 w-full border-b border-gray-300"
                                    ></div>
                                </div> -->
                                <!-- <div class="mt-3 text-center">
                                    <SocialLoginComponent />
                                </div> -->
                            <!-- </div> -->
                        <div>
                            <h2 class="mt-2 text-sm text-gray-400">
                                در صورتیکه قبلا در سایت ثبت نام کرده اید 
                                <router-link to="/login" class="hover:text-blue-500">
                                    از اینجا
                                </router-link>
                                وارد شوید
                            </h2>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <img
                class="absolute inset-0 h-full w-full object-cover object-top"
                src="../../assets/site/images/login-3.jpeg"
                alt=""
            />
            <div class="fixed social-proof bottom-0 z-10">
                <div
                    id="bg-footer"
                    class="flex justify-center py-1 items-between"
                >
                </div>
            </div>
        </div>
    </div>
    
</template>
 
