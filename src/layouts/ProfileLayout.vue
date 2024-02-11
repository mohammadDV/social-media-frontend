<script setup>
import { onMounted, ref } from 'vue'
import { useApi } from '@/utils/api'
import HeaderComponent from '@/components/profile/include/HeaderComponent'
import FooterComponent from '@/components/profile/include/FooterComponent'
import ProfileTicketComponent from "@/components/profile/components/ProfileTicketComponent.vue"
import RightSideComponent from "@/components/profile/include/RightSideComponent.vue"

  const followersCount = ref(0);
  const followingsCount = ref(0);
  const followers = ref([]);
  const followings = ref([]);
  const myCLubs = ref([]);

  const getMyClubs = () => {
    
    useApi().get(`/api/favorite/clubs`)
        .then((response) => {
            myCLubs.value = response.data;
        });
  };

  const updateFollowings = () => {
    useApi().get('/api/follow-info')
        .then((response) => {
            followersCount.value = response.data.followersCount;
            followingsCount.value = response.data.followingsCount;
            followers.value = response.data.followers;
            followings.value = response.data.followings;

        });
  };

  const setFollowings = (items, followersCount) => {
    followingsCount.value = followersCount;
    followings.value = items;
  };

  onMounted(() => {

    const links = document.querySelectorAll('link[rel="stylesheet"]');

    console.log(links);
    links.forEach(link => {
      console.log(link);
        if (link.href === '/assets/site/css/styles.css') {
          link.parentNode.removeChild(link);
        }
      })

      updateFollowings()
      getMyClubs();
    
  });

</script>

<template>
  <div>
      <header-component/>
      <div class="container-xxl py-3">
          <div class="row">
              <div class="col-4 col-xl-3 d-none d-lg-block">
                <ProfileTicketComponent 
                  :followersCount="followersCount"
                  :followingsCount="followingsCount"
                  />
                <RightSideComponent 
                  :followersCount="followersCount"
                  :followers="followers"
                  :followingsCount="followingsCount"
                  :followings="followings"
                  :my-clubs="myCLubs"
                />
              </div>
              <router-view 
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





