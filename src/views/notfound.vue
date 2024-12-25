<script setup>

  import { onMounted, computed } from 'vue';

  import { useI18n } from "vue-i18n";  

  import { useHead } from '@unhead/vue';

  const { t } = useI18n();  
  
  onMounted(() => {
    useHead({
        title: `${t('site.Main page')} | صفحه پیدا نشد`,
        meta: [
            {
                name: `description`,
                content: 'صفحه پیدا نشد'
            },
            {
                property: `og:title`,
                content: `${t('site.Main page')} | صفحه پیدا نشد`
            },
            {
                property: `og:description`,
                content: 'صفحه پیدا نشد'
            },
            {
                property: `og:url`,
                content: computed(() => window.location.href)
            },
            {
                name: `twitter:title`,
                content: `${t('site.Main page')} | صفحه پیدا نشد`
            },
            {
                name: `twitter:description`,
                content: 'صفحه پیدا نشد'
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
                <div class="row">
                    <div class="flex items-center justify-center min-h-screen bg-gray-100">
                    <div class="text-center">
                    <h1 class="text-8xl font-extrabold text-primary">404</h1>
                    <p class="text-xl text-gray-700 mt-4">متأسفیم! صفحه‌ای که به دنبال آن هستید پیدا نشد</p>
                    <p class="text-md text-gray-500 mt-2">ممکن است حذف شده باشد یا آدرس آن اشتباه وارد شده باشد. لطفاً به صفحه اصلی بازگردید یا با پشتیبانی تماس بگیرید.</p>
                    <div class="mt-8">
                        <a 
                        href="/" title="صفحه اصلی"
                        class="text-decoration-none px-6 py-3 ml-2 text-white bg-primary rounded-md shadow hover:bg-gray-300 hover:text-primary"
                        >
                        صفحه اصلی
                        </a>
                        <a 
                        href="/login" title="ورود با سایت"
                        class="text-decoration-none px-6 py-3 ml-2 text-white bg-primary rounded-md shadow hover:bg-gray-300 hover:text-primary"
                        >
                        ورود به سایت
                        </a>
                    </div>
                    <div class="mt-10">
                        <img 
                        src="https://cdn.varzeshpod.com/uploads/images/default/user-1/2024/09/13/1gmbvPupCcYelTwe8blMh3239k56ERG0gAistTF6.jpg" 
                        alt="ورزش پاد" 
                        class="mx-auto max-w-sm rounded-lg shadow-lg"
                        />
                    </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
  </template>
  