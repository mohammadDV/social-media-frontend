<template>
    <div class="pt-[200px] bg-dark vh-100 bg-auth">
        <div class="container flex justify-center">
            <div class="flex items-center bg-blur-box w-[80%]">
                <div class="flex-1 text-center rounded-[40px]  ">
                    <div class=" pt-[40px] pr-[80px] pb-[60px] pl-[50px]">
                        <div class="my-3">
                            <p class="text-white text-xl">ثبت نام در سایت ورزش تایمز</p>
                        </div>
                        <div class="register-moreDetail text-right my-8">
                            <p class="text-md mb-2 text-blue-300">* نام کامل شامل نام و نام خانوادگی شما می باشد.</p>
                            <p class="text-md mb-2 text-blue-300">* رمز عبور باید شامل حروف و اعداد به صورت ترکیبی باشد.</p>
                            <p class="text-md mb-2 text-blue-300">* لطفا از ایمیل معتبر استفاده نمایید (جهت بازیابی رمز عبور) .</p>
                         
                            
                        </div>
                        <VTInput
                        class="my-3"
                        :blur="true"
                        name="name"
                        rows="4"
                        v-model="data.name"
                        :placeholder="$t('site.Fullname')"/>
                    <VTInput
                        class="my-3"
                        :blur="true"
                        name="email"
                        rows="4"
                        v-model="data.email"
                        :placeholder="$t('site.Email')"/>
                    <VTInput
                        class="my-3"
                        :blur="true"
                        name="password"
                        rows="4"
                        v-model="data.password"
                        :placeholder="$t('site.Password')"/>
                       
                        <VTButton class="mt-4 w-100" color="dark" size="medium"
                                    @click="register()">
                            {{ $t('site.Register') }}
                        </VTButton>
                        <div class="flex my-4 items-baseline text-blue-300">
                            
                            در صورتیکه قبلا در سایت ثبت نام کرده اید 

                            <a class="no-underline text-red-300 mx-1" href="">  از اینجا  </a>

                            وارد شوید
                        </div>
                    </div>
                </div>
                <div class="flex-1 text-center">
                    <div class="w-[80%] mr-[40px]">
                        <img src="../../assets/site/images/register1.png" alt="login">
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

const authStore = useAuthStore();

const router = useRouter();

const token = computed(() => authStore.token)


  console.log(token.value);

  const data = ref({
      name: '',
      email: '',
      password: '',
  });

  const register = function() {
      authStore.register(data.value)
      .then(() => {
          router.push({
              name: 'home'
          })
      })
  }

</script>