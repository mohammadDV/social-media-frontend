<script setup>

  import { defineProps } from 'vue';

  defineProps({
    followersCount: {
        type: Number,
        default: 0
    },
    followingsCount: {
        type: Number,
        default: 0
    },
    memeberId: {
        type: Number,
        default: 0
    }
  });

</script>

<template>
    <div class="card profile-card mb-3">
        <div class="card-body">
            <div class="user-stats">
                <router-link class="user-stat" :to="memeberId.length > 0 ? `/member/${memeberId}/followings` : '/profile/followings'">
                    <div class="user-stat-title">{{ $t('site.Following') }}</div>
                    <div class="user-stat-amount">{{ followingsCount }}</div>
                </router-link>
                <router-link class="user-stat" :to="memeberId.length > 0 ? `/member/${memeberId}/followers` : '/profile/followers'">
                    <div class="user-stat-title">{{ $t('site.Followers') }}</div>
                    <div class="user-stat-amount">{{ followersCount }}</div>
                </router-link>
                <a class="user-stat" href="#">
                    <div class="user-stat-title">تعداد بازدید</div>
                    <div class="user-stat-amount">19</div>
                </a>
                <a class="user-stat" href="#">
                    <div class="user-stat-title">تعداد پست</div>
                    <div class="user-stat-amount">159</div>
                </a>
            </div>
        </div>
    </div>
</template>