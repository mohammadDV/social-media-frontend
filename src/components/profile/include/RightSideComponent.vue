<script setup>

  import userImage from '@/components/plugins/UserImage.vue';
  import { onMounted, defineProps } from 'vue';


  defineProps({
        followersCount: {
            type: Number,
            default: 0
        },
        followingsCount: {
            type: Number,
            default: 0
        },
        followers: {
            type: Array,
            default: null
        },
        followings: {
            type: Array,
            default: null
        },
        memeberId: {
            type: Number,
            default: 0
        },
        myClubs: {
            type: Array,
        },
        user: {
            type: Array,
        },
    });

  
    onMounted(() => {

    });

</script>

<template>
    <div v-if="user?.is_private != 1" class="card list-card mb-3">
        <div class="card-header-profile">
            <div class="card-header-title">
                <span>{{ $t('site.Following') }}</span>
            </div>
            <router-link class="user-link" :to="memeberId.length > 0 ? `/member/${memeberId}/followings` : '/profile/followings'">
                <button type="button" class="btn btn-primary">
                    {{ $t('site.All') }} <span class="badge bg-secondary">{{ followingsCount }}</span>
                </button>
            </router-link>
        </div>
        <div class="card-body">
            <div class="card-itemlist is-horizon">
                <div v-for="(item, index) in followings" :key="index" class="item">
                    <router-link :to="`/member/${item.user.id}`" :title="item.user.nickname">
                        <div class="item-avatar">
                            <userImage :item="item.user" />
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <div v-if="user?.is_private != 1" class="card list-card mb-3">
        <div class="card-header-profile">
            <div class="card-header-title">
                <span>{{ $t('site.Followers') }}</span>
            </div>
            <router-link class="user-link" :to="memeberId.length > 0 ? `/member/${memeberId}/followers` : '/profile/followers'">
                <button type="button" class="btn btn-primary">
                    {{ $t('site.All') }} <span class="badge bg-secondary">{{ followersCount }}</span>
                </button>
            </router-link>
        </div>
        <div class="card-body">
            <div class="card-itemlist is-horizon">
                <div v-for="(item, index) in followers" :key="index" class="item">
                    <router-link :to="`/member/${item.follower.id}`" :title="item.follower.nickname">
                        <div class="item-avatar">
                            <userImage :item="item.follower" />
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>


    <div class="card list-card mb-3">
        <div class="card-header-profile">
            <div class="card-header-title">
                <span>{{ $t('site.Favorite clubs') }}</span>
            </div>
            <router-link v-if="memeberId == 0" class="user-link" to="/profile/clubs/favorite">
                <button type="button" class="btn btn-primary">
                    {{ $t('site.All') }} <span class="badge bg-secondary">{{ myClubs.length }}</span>
                </button>
            </router-link>
        </div>
        <div class="card-body">
            <div class="card-itemlist is-horizon">
                <div v-for="(item, index) in myClubs" :key="index" class="item">
                    <div class="item-avatar club-avatar">
                        <router-link class="user-link" :to="`/club/${item.id}`" :title="item.title">
                            <img
                                :src="item.image"
                                :alt="item.title"
                            />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.club-avatar img {
    border-radius: 0 !important;
}
</style>