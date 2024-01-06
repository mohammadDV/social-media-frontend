<script setup>

    
//   import {useApi} from '@/utils/api.ts';
  import userImage from '@/components/plugins/UserImage.vue';
import { onMounted, defineProps } from 'vue';
//   import { useAuthStore } from '@/stores/auth.ts';

defineProps({
    followersCount: {
        type: Number,
        default: 0
    },
    followingCount: {
        type: Number,
        default: 0
    },
    followingsCount: {
        type: Array,
        default: null
    },
    followings: {
        type: Array,
        default: null
    },
    myClubs: {
        type: Array,
    },
});
//   const authStore = useAuthStore();
//   const followersCount = ref(0);
//   const followers = ref([]);

  onMounted(() => {
//     useApi().get('/api/follow-info')
//         .then((response) => {
//             followersCount.value = response.data.followersCount;
//             followers.value = response.data.followers;
//         })
  });

</script>

<template>
    <div class="card list-card mb-3">
        <div class="card-header">
            <div class="card-header-title">
                <span>{{ $t('site.Following') }}</span>
            </div>
            <!-- <a
            @isset($user)
                href="{{ route('profile.followings',['user' => $user->id]) }}"
                @else
                href="{{ route('profile.followings') }}"
            @endisset
            title="{{ $t('site.Following') }}"> -->
                <button type="button" class="btn btn-primary">
                    {{ $t('site.All') }} <span class="badge bg-secondary">{{ followingsCount }}</span>
                </button>
            <!-- </a> -->
        </div>
        <div class="card-body">
            <div class="card-itemlist is-horizon">
                <div v-for="(item, index) in followings" :key="index" class="item">
                    <div class="item-avatar">
                        <userImage :item="item" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card list-card mb-3">
        <div class="card-header">
            <div class="card-header-title">
                <span>{{ $t('site.Followers') }}</span>
            </div>

            <!-- <a
            @isset($user)
                href="{{ route('profile.followers',['user' => $user->id]) }}"
                @else
                href="{{ route('profile.followers') }}"
            @endisset

             title="{{ $t('site.Followers') }}"> -->
                <button type="button" class="btn btn-primary">
                    {{ $t('site.All') }} <span class="badge bg-secondary">{{ followerCount }}</span>
                </button>
            <!--  </a> -->
        </div>
        <div class="card-body">
            <div class="card-itemlist is-horizon">
                <div v-for="(item, index) in followers" :key="index" class="item">
                    <div class="item-avatar">
                        <!-- <a href="{{ route('profile.member',['user' => $user["id"]]) }}"> -->
                            <userImage :item="item" />
                        <!-- </a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="card list-card mb-3">
        <div class="card-header">
            <div class="card-header-title">
                <span>{{ $t('site.Favorite clubs') }}</span>
            </div>
            <router-link class="user-link" to="/profile/clubs/favorite">
                <button type="button" class="btn btn-primary">
                    {{ $t('site.All') }} <span class="badge bg-secondary">{{ myClubs.length }}</span>
                </button>
            </router-link>
        </div>
        <div class="card-body">
            <div class="card-itemlist is-horizon">
                <div v-for="(item, index) in myClubs" :key="index" class="item">
                    <div class="item-avatar">
                        <router-link class="user-link" to="/profile/clubs/favorite" :title="item.title">
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