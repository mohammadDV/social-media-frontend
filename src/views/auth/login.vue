<script setup>

  import { onMounted, ref } from 'vue';
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

    onMounted(() => {
        window.document.title =   `${t('site.Login to site')} | ${t('site.Website name')}`;
    });
    

</script>

<template>
<div class="flex relative min-h-screen">
        <div
            class="flex flex-1 flex-col justify-center px-8 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 pb-40 bg-white"
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
                        class="mt-10 text-2xl text-gray-700"
                    >
                       ورود به سایت    
                    </h2>
                    <p class="mt-2 text-sm leading-6 text-gray-400">
                        آیا در ورزش تایمز حساب کاربری دارید؟ لطفا وارد شوید و یا به عنوان عضو جدید ثبت نام کنید.
                    </p>
                </div>

                <div class="mt-10">
                    <form @submit.prevent="submitLogin" method="post" class="space-y-6">
                        <VTInput
                            :is-vt="true"
                            requestName="LoginRequest"
                            class="my-3"
                            name="email"
                            v-model="username"
                            :placeholder="$t('site.Email')"/>

                            <VTInput
                                requestName="LoginRequest"
                                inputType="password"
                                class="my-3"
                                :is-vt="true"
                                name="password"
                                v-model="password"
                                :placeholder="$t('site.Password')"/>
                            <VTButton class="mt-4 w-100" color="dark" size="medium" type="submit">
                                {{ $t('site.Login') }}
                            </VTButton>
                            <div >
                                <div class="h-4 mt-4 relative">
                                    <div class="flex items-center justify-center">
                                        <div class="text-gray-700 bg-white text-md font-bold px-2 z-10">
                                            <span>یا با اکانت گوگل ادامه دهید.</span>
                                        </div>
                                    </div>
                                    <div
                                        class="absolute left-0 top-3 w-full border-b border-gray-300"
                                    ></div>
                                </div>

                                <div class="mt-3 text-center">
                                    <a href="" class="no-underline m-auto w-[200px] rounded p-2 gap-2 bg-blue-500 hover:bg-blue-700 flex justify-center items-between">
                                        <div class="logo-wrapper">
                                            <img class="bg-white rounded-full w-[30px]" src="../../assets/site/images/g-logo.png" alt="">
                                        </div>
                                        <div class="text-white mt-1">
                                            ورود با گوگل
                                        </div>
                                    </a>
                                </div>
                            </div>
                        <div>
                            <h2 class="mt-2 text-sm text-gray-400">
                                در ورزش تامیز حساب ندارم!
                                <router-link to="/register" class="hover:text-blue-500">
                                    ثبت نام
                                </router-link>
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
