<script setup>

    import { defineProps, defineEmits} from 'vue';
    import {useApi} from '@/utils/api.ts';
    import userImage from '@/components/plugins/UserImage.vue';

    const emit = defineEmits(['updateMembers']);

    defineProps({
        members: {
            type: Array,
            require: true
        }
    });

    const followUser = (id) => {
        console.log('followUser')
        useApi().post(`/api/follow/${id}`)
        .then(() => {
            emit('updateMembers');
        })
    };

</script>


<template>
    <div class="card-body">
        <div class="card-itemlist">
            <div v-for="(item, index) in members" :key="index" class="item">
                <a href="">
                    <div class="item-avatar">
                        <userImage :item="item" />
                    </div>
                </a>
                <div class="user-info">
                    <div class="user-name">{{ item.nickname }}</div>
                    <div class="user-likes">
                        <span v-for="(club, key) in item.clubs" :key="key" class="badge bg-secondary like-item m-1">{{ club.title }}</span>
                    </div>
                    <div class="user-exes d-grid gap-2">
                        <button @click="followUser(item.id)" class="btn btn-outline-secondary btn-sm">
                            {{ $t('site.Follow') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>