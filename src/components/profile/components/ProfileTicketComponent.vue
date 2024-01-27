<script setup>

  import { defineProps, onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import userImage from '@/components/plugins/UserImage.vue';

  const authStore = useAuthStore();

  const menu = ref([]);

  onMounted(() => {
    authStore.menu.map((item) => {
        
        console.log(item.permission);
        if(!item?.permission || authStore.permissions.includes(item.permission)){
            menu.value.push(item);
        }
    }) 
    
  });
  
  defineProps({
    followersCount: {
        type: Number,
        default: 0
    },
    followingsCount: {
        type: Number,
        default: 0
    }
  });

</script>

<template>
    <div class="card profile-card mb-3">
        <div class="card-body">
            <div class="user-info">
                <template v-if="authStore.isAuthenticated && authStore.user?.bg_photo_path?.length > 0">
                    <div class="user-cover ratio ratio-21x9"
                    :style="`background-image: url(${authStore.user?.bg_photo_path})`"
                    ></div>
                </template>
                <template v-else>
                    <div class="user-cover ratio ratio-21x9"
                    :style="`background-image: url(/profile/images/cover.png)`"
                    ></div>
                </template>
                <div class="user-avatar">
                    <userImage :item="authStore?.user" />
                </div>
                <div class="user-name">{{ authStore?.user?.nickname }}</div>
                <div class="user-description">
                    {{ authStore?.user?.biography }}
                </div>
            </div>
            <div class="user-stats">
                <router-link class="user-stat" to='/profile/followings'>
                    <div class="user-stat-title">{{ $t('site.Following') }}</div>
                    <div class="user-stat-amount">{{ followingsCount }}</div>
                </router-link>
                <router-link class="user-stat" to='/profile/followers'>
                    <div class="user-stat-title">{{ $t('site.Followers') }}</div>
                    <div class="user-stat-amount">{{ followersCount }}</div>
                </router-link>
                <a class="user-stat" href="#">
                    <div class="user-stat-title">بازدید از صفحه ی شما</div>
                    <div class="user-stat-amount">19</div>
                </a>
                <a class="user-stat" href="#">
                    <div class="user-stat-title">بازدید از پست های شما</div>
                    <div class="user-stat-amount">159</div>
                </a>
            </div>
            <div class="user-links">
                <router-link v-for="(item, index) in menu" :key="index" class="user-link" :to="item.route">
                    <span class="user-link-icon">
                    <span class="material-icons"> {{ item.icon }} </span>
                    </span>
                    <span class="user-link-title"> {{ $t(item.name) }} </span>
                </router-link>
                <a class="user-link" href="#">
                    <span class="user-link-icon">
                    <span class="material-icons"> block </span>
                    </span>
                    <span class="user-link-title"> مسدود شده ها </span>
                </a>
                <a class="user-link" href="#">
                    <span class="user-link-icon">
                    <span class="material-icons"> bookmark </span>
                    </span>
                    <span class="user-link-title">پست های ذخیره شده من</span>
                </a>

                <a class="user-link" href="#">
                    <span class="user-link-icon">
                    <span class="material-icons"> group_add </span>
                    </span>
                    <span class="user-link-title"> درخواست های دنبال کردن </span>
                </a>
                <a class="user-link" href="#">
                    <span class="user-link-icon">
                    <span class="material-icons"> chat </span>
                    </span>
                    <span class="user-link-title"> پیام های خصوصی </span>
                </a>
                <a class="user-link" href="#">
                    <span class="user-link-icon">
                    <span class="material-icons"> verified_user </span>
                    </span>
                    <span class="user-link-title"> تایید حساب کاربری </span>
                </a>
                <a class="user-link" href="#">
                    <span class="user-link-icon">
                    <span class="material-icons"> paid </span>
                    </span>
                    <span class="user-link-title"> ارتقاع حساب کاربری </span>
                </a>
            </div>
        </div>
    </div>
</template>