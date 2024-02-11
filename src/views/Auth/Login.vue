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
  const username = ref('');  
  const password = ref('');  
  const submitLogin = async function() {

    if (username.value?.length < 3 || password.value?.length < 3) { 
        $toast.error(t('site.Please fill in the necessary fields'));
        return;
    }

    await useApi().post('/api/login/', { email : username.value, password : password.value })
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
            $toast.error(t('site.There is no such user with this specification'));
        })
    };
    

</script>

<template>
    <div class="pt-[150px] bg-dark vh-100 bg-auth">
        <div class="container flex justify-center">
            <div class="flex items-center bg-blur-box w-[70%]">
                <div class="flex-1 text-center rounded-[40px]  ">
                    <div class=" pt-[40px] pr-[80px] pb-[60px] pl-[50px]">
                        <div class="my-3">
                            <p class="text-white text-xl">ورود به سایت</p>
                        </div>
                        <VTInput
                            requestName="LoginRequest"
                            class="my-3"
                            :blur="true"
                            name="username"
                            rows="4"
                            v-model="username"
                            :placeholder="$t('site.Email')"/>
                        <VTInput
                            requestName="LoginRequest"
                            inputType="password"
                            class="my-3"
                            :blur="true"
                            name="password"
                            rows="4"
                            v-model="password"
                            :placeholder="$t('site.Password')"/>
                       
                        <VTButton class="mt-4 w-100" color="dark" size="medium"
                                    @click="submitLogin()">
                            {{ $t('site.Login') }}
                        </VTButton>
                        <div class="mt-3 ">
                            <div class="flex my-2 items-baseline ">
                                <a class="no-underline text-blue-300" href="">رمز عبور خود را فراموش کرده ام</a>
                            </div>
                            <div class="flex my-2 items-baseline">
                                <router-link to="/register" class="no-underline text-blue-300">
                                    در ورزش تامیز حساب ندارم!
                                </router-link>
                            </div>
                        </div>
                       
                        <div class="border-t-[1px] my-4 border-slate-200">

                        </div>
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
                    </div>
                </div>
                <div class="flex-1 text-center">
                    <router-link to="/" class="no-underline text-red-300 mx-1">
                        بازگشت به سایت
                    </router-link>
                    <div class=" ">
                        <img src="../../assets/site/images/login.png" alt="login">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>