<script setup>

  import { defineProps } from 'vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import userImage from '@/components/plugins/UserImage.vue';

  const authStore = useAuthStore();

  defineProps({
    followersCount: {
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
                <a class="user-stat" href="#">
                    <div class="user-stat-title">دنبال کنندگان</div>
                    <div class="user-stat-amount">{{ followersCount }}</div>
                </a>
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
                <router-link class="user-link" to="/profile/posts/create">
                    <span class="user-link-icon">
                    <span class="material-icons"> post_add </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Create new post') }} </span>
                </router-link>

                <router-link class="user-link" to="/profile/posts">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Post management') }} </span>
                </router-link>
                <a class="user-link" href="profile.status.create">
                    <span class="user-link-icon">
                    <span class="material-icons"> post_add </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Create new status') }} </span>
                </a>
                <a class="user-link" href="profile.status.index">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Status management') }} </span>
                </a>

                <router-link class="user-link" to="/profile/account">
                    <span class="user-link-icon">
                    <span class="material-icons"> manage_accounts </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Edit profile') }} </span>
                </router-link>
                <router-link class="user-link" to="/profile/users">
                    <span class="user-link-icon">
                    <span class="material-icons"> manage_accounts </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.User management') }} </span>
                </router-link>
                <a class="user-link" href="profile.user.password">
                    <span class="user-link-icon">
                    <span class="material-icons"> manage_accounts </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Change password') }} </span>
                </a>
                <a class="user-link" href="clubs.favorite">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Choose your favorite club') }} </span>
                </a>
                <a class="user-link" href="profile.league.create">
                    <span class="user-link-icon">
                    <span class="material-icons"> post_add </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Create new league') }} </span>
                </a>
                <a class="user-link" href="profile.league.index">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.League management') }} </span>
                </a>
                <a class="user-link" href="profile.club.create">
                    <span class="user-link-icon">
                    <span class="material-icons"> post_add </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Create new club') }} </span>
                </a>
                <a class="user-link" href="profile.club.index">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Club management') }} </span>
                </a>
                <a class="user-link" href="profile.live.create">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Live management') }} </span>
                </a>
                <a class="user-link" href="profile.page.create">
                    <span class="user-link-icon">
                    <span class="material-icons"> post_add </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Create new page') }} </span>
                </a>
                <a class="user-link" href="profile.page.index">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Page management') }} </span>
                </a>
                <a class="user-link" href="profile.advertise.create">
                    <span class="user-link-icon">
                    <span class="material-icons"> post_add </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Create new advertise') }} </span>
                </a>
                <a class="user-link" href="profile.advertise.index">
                    <span class="user-link-icon">
                    <span class="material-icons"> article </span>
                    </span>
                    <span class="user-link-title"> {{ $t('site.Advertise management') }} </span>
                </a>
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