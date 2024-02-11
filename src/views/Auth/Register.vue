
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import VTButton from '@/elements/VTButton'; 
import VTInput from '@/elements/VTInput'; 
import { useRouter } from 'vue-router';
import { useToast } from "vue-toast-notification";
import { useI18n } from "vue-i18n";   
import {useApi} from '@/utils/api.ts'; 

const { t } = useI18n();    
const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();  
const data = ref({
    name: '',
    email: '',
    password: '',
});
  
const register = async function() {

    if (data.value?.name?.length < 3 || data.value.email?.length < 3 || data.value.password?.length < 3) { 
        $toast.error(t('site.Please fill in the necessary fields'));
        return;
    }

    await useApi().post('/api/register/', data.value)
        .then((response) => {
            if (response.data?.token?.length > 0) {
                $toast.success(t('site.Welcome'));
                    authStore.setToken(response.data.token);
                    router.push({
                    name: 'home'
                })
            }
        })
        .catch(() => {
            $toast.error(t('site.Eror'));
        })
  };

</script>
<template>
    <div class="pt-[100px] bg-dark vh-100 bg-auth">
        <div class="container flex justify-center">
            <div class="flex items-center bg-blur-box w-[80%]">
                <div class="flex-1 text-center rounded-[40px]  ">
                    <div class=" pt-[40px] pr-[80px] pb-[60px] pl-[50px]">
                        <div class="my-3">
                            <p class="text-white text-xl">ثبت نام در سایت ورزش تایمز</p>
                        </div>
                        <VTInput
                            class="my-3"
                            requestName="RegisterRequest"
                            :blur="true"
                            name="name"
                            rows="4"
                            v-model="data.name"
                            :placeholder="$t('site.Fullname')"/>
                    <VTInput
                        class="my-3"
                        requestName="RegisterRequest"
                        :blur="true"
                        name="email"
                        rows="4"
                        v-model="data.email"
                        :placeholder="$t('site.Email')"/>
                    <VTInput
                        inputType="password"
                        class="my-3"
                        requestName="RegisterRequest"
                        :blur="true"
                        name="password"
                        rows="4"
                        v-model="data.password"
                        :placeholder="$t('site.Password')"/>
                       
                        <VTButton class="mt-4 w-100" color="dark" size="medium"
                                    @click="register()">
                            {{ $t('site.Register') }}
                        </VTButton>
                        <div class="border-t-[1px] my-4 border-slate-200"></div>
                        <div class="g-sign-in-button">
                            <div class="content-wrapper">
                                <div class="logo-wrapper">
                                    <img  class="p-2 " src="../../assets/site/images/g-logo.png" alt="">
                                </div>
                                <span class="text-container">
                                    <span>ورود با گوگل</span>
                                </span>
                            </div>
                        </div>
                        <div class="flex my-4 items-baseline text-blue-300">
                            در صورتیکه قبلا در سایت ثبت نام کرده اید 
                            <router-link to="/login" class="no-underline text-red-300 mx-1">
                                از اینجا
                            </router-link>
                            وارد شوید
                        </div>
                        <div class="mb-2">
                            <router-link to="/" class="no-underline text-red-300 mx-1 mb-5">
                                بازگشت به سایت
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="flex-1 text-center my-8">
                    <div class="register-moreDetail text-right">
                        <p class="text-md mb-2 text-blue-300">* نام کامل شامل نام و نام خانوادگی شما می باشد.</p>
                        <p class="text-md mb-2 text-blue-300">* رمز عبور باید شامل حروف و اعداد به صورت ترکیبی باشد.</p>
                        <p class="text-md mb-2 text-blue-300">* لطفا از ایمیل معتبر استفاده نمایید (جهت بازیابی رمز عبور) .</p>
                    </div>
                    <div class="w-[80%] text-center">
                        <img src="../../assets/site/images/register1.png" alt="login">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
 