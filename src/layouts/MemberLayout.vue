<script setup>
import { onMounted, ref, watch } from 'vue'
import { useApi } from '@/utils/api'
import { useRoute } from 'vue-router';
import MemberHeaderComponent from '@/components/profile/include/MemberHeaderComponent'
import HeaderComponent from '@/components/profile/include/HeaderComponent'
import FooterComponent from '@/components/profile/include/FooterComponent'
import MemberTicketComponent from "@/components/profile/components/MemberTicketComponent"
import RightSideComponent from "@/components/profile/include/RightSideComponent"

  const followersCount = ref(0);
  const followingsCount = ref(0);
  const followers = ref([]);
  const followings = ref([]);
  const myCLubs = ref([]);
  const user = ref([]);
  const route = useRoute();

  const getMyClubs = () => {
    
    useApi().get(`/api/favorite/clubs/${route.params.id}`)
        .then((response) => {
            myCLubs.value = response.data;
        });
  };

  const updateFollowings = () => {
    useApi().get(`/api/follow-info/${route.params.id}`)
        .then((response) => {
            followersCount.value = response.data.followersCount;
            followingsCount.value = response.data.followingsCount;
            followers.value = response.data.followers;
            followings.value = response.data.followings;
            user.value = response.data.info;
        });
  };

  const setFollowings = (items, followersCount) => {
    followingsCount.value = followersCount;
    followings.value = items;
  };

  watch(() => route.params.id, () => {
    if (route.params.id) {
      updateFollowings()
      getMyClubs();
    } 
  });

  onMounted(() => {
      updateFollowings()
      getMyClubs();
  });

</script>

<template>
  <div>
      <headerComponent/>
      <memberHeaderComponent :user="user"/>
      <div class="container py-3">
          <div class="row">
            <div class="col-4 col-xl-4 d-none d-lg-block">
                <MemberTicketComponent 
                  :followersCount="followersCount"
                  :followingsCount="followingsCount"
                  />
                <RightSideComponent 
                  :user="user"
                  :memeberId="route.params.id"
                  :followersCount="followersCount"
                  :followers="followers"
                  :followingsCount="followingsCount"
                  :followings="followings"
                  :my-clubs="myCLubs"
                />
            </div>
              <router-view 
                :user="user" 
                @getMyClubs="getMyClubs" 
                @setFollowings="setFollowings"
                @updateFollowings="updateFollowings"
                :my-clubs="myCLubs"
              ></router-view>
        </div>
      </div>
      <footer-component />
  </div>
</template>





