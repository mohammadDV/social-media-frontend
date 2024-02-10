<template>
    <div class="pt-[200px] bg-dark vh-100 bg-auth">
        <div class="container flex justify-center">
            <div class="flex items-center bg-blur-box w-[70%]">
                <div class="flex-1 text-center rounded-[40px]  ">
                    <div class=" pt-[40px] pr-[80px] pb-[60px] pl-[50px]">
                        <div class="my-3">
                            <p class="text-white text-xl">ورود به سایت</p>
                        </div>
                        <VTInput
                            class="my-3"
                            :blur="true"
                            name="username"
                            rows="4"
                            v-model="username"
                            :placeholder="$t('site.Email')"/>
                        <VTInput
                            class="my-3"
                            :blur="true"
                            name="password"
                            rows="4"
                            v-model="password"
                            :placeholder="$t('site.Password')"/>
                        <!-- <div class="flex my-4 items-baseline ">
                            <input class="ml-2.5 w-4 h-4" type="checkbox" name="site-rules" id="" >
                            <p class="text-white mb-0">قوانین و مقررات سایت را میپذیرم</p>
                        </div> -->
                       
                        <VTButton class="mt-4 w-100" color="dark" size="medium"
                                    @click="submitLogin()">
                            {{ $t('site.Login') }}
                        </VTButton>
                        <div class="mt-3 ">
                            <div class="flex my-2 items-baseline ">
                                <a class="no-underline text-blue-300" href="">رمز عبور خود را فراموش کرده ام</a>
                            </div>
                            <div class="flex my-2 items-baseline ">
                                <a class="no-underline text-blue-300" href=""> در ورزش تامیز حساب ندارم! </a>
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
                    <div class=" ">
                        <img src="../../assets/site/images/login.png" alt="login">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import VTButton from '@/elements/VTButton'; 
  import VTInput from '@/elements/VTInput'; 
  import { useRouter } from 'vue-router';
//   import {useApi} from '@/utils/api.ts';
  
  const authStore = useAuthStore();

  const router = useRouter();

    const token = computed(() => authStore.token)


    console.log(token.value);

    const username = ref('');
    const password = ref('');

    const submitLogin = function() {
        authStore.login(username.value, password.value)
        .then(() => {
            router.push({
                name: 'home'
            })
        })
    }

</script>