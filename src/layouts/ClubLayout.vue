<script setup>
// import { onMounted, ref, watch } from 'vue'
// import { useApi } from '@/utils/api'
// import { useRoute } from 'vue-router';
import HeaderComponent from '@/components/profile/include/HeaderComponent'
// import FooterComponent from '@/components/profile/include/FooterComponent'
// import MemberTicketComponent from "@/components/profile/components/MemberTicketComponent"
// import RightSideComponent from "@/components/profile/include/RightSideComponent"

  // const followersCount = ref(0);
  // const followingsCount = ref(0);
  // const followers = ref([]);
  // const followings = ref([]);
  // const myCLubs = ref([]);
  // const route = useRoute();

  // const getMyClubs = () => {
    
  //   useApi().get(`/api/favorite/clubs/${route.params.id}`)
  //       .then((response) => {
  //           myCLubs.value = response.data;
  //       });
  // };

  // const updateFollowings = () => {
  //   useApi().get(`/api/follow-info/${route.params.id}`)
  //       .then((response) => {
  //           followersCount.value = response.data.followersCount;
  //           followingsCount.value = response.data.followingsCount;
  //           followers.value = response.data.followers;
  //           followings.value = response.data.followings;
  //       });
  // };

  // const setFollowings = (items, followersCount) => {
  //   followingsCount.value = followersCount;
  //   followings.value = items;
  // };

  // watch(() => route.params.id, () => {
  //   if (route.params.id) {
  //     updateFollowings()
  //     getMyClubs();
  //   } 
  // });

  // onMounted(() => {
  //     updateFollowings()
  //     getMyClubs();
  // });

</script>

<template>
  <div>
      <header-component/>

      <router-view></router-view>
   



  </div>
</template>





