<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import FollowListComponent from '../components/FollowListComponent.vue';

  const newMembers = ref([]);
  const congenialMembers = ref([]);
  
  // Get the new members
  const getNewMembers = () => {
    useApi().get('/api/new-members')
        .then((response) => {
            newMembers.value = response.data;
        })
  };

  // Update the new members
  const updateNewMembers = () => {
    getNewMembers()
  };

  // Get the congenial members
  const getCongenialMembers = () => {
    useApi().get('/api/congenial-members')
        .then((response) => {
            congenialMembers.value = response.data;
        })
  };

  // Update the congenial members
  const updateCongenialMembers = () => {
    getCongenialMembers()
  };

  onMounted(() => {
    getNewMembers();
    getCongenialMembers();
  });

</script>

<template>
    <div class="col-3 d-none d-xl-block">
        <div class="card list-card mb-3">
            <div class="card-header">
                <div class="card-header-title">
                    <span>{{ $t('site.New users') }}</span>
                </div>
            </div>
            <FollowListComponent :members="newMembers" @updateMembers="updateNewMembers" />
        </div>
        <div class="card list-card mb-3">
            <div class="card-header">
                <div class="card-header-title">
                    <span>هم سلیقه های شما</span>
                </div>
            </div>
            <FollowListComponent :members="congenialMembers" @updateMembers="updateCongenialMembers" />
        </div>
    </div>
</template>