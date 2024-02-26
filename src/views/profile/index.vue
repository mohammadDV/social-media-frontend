<script setup>

    
//   import {useApi} from '@/utils/api.ts';
  import { onMounted, defineEmits, ref } from 'vue';
  import LeftSideComponent from "@/components/profile/include/LeftSideComponent.vue";
  import StatusWallComponent from "@/components/profile/components/status/StatusWallComponent.vue";
  import StatusWallFormComponent from "@/components/profile/components/status/StatusWallFormComponent.vue";
  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';
  import { useAuthStore } from '@/stores/auth.ts';
  import { useRoute } from 'vue-router';

    
  const authStore = useAuthStore();
  const emit = defineEmits(['updateFollowings']); 
  const tabItem = ref(false);
  const route = useRoute();

  const changeTab = (tab) => {
    tabItem.value = tab
  }
  
  const updateFollowings = () => {
    emit('updateFollowings')
  }




//   const categories = ref([]);
//   const dropdown = ref(false);


//   const toggleDropdown = () => {
//     dropdown.value = !dropdown.value
//   }

//   const logout = () => {
//     authStore.logout();
//   };

  onMounted(() => {
    // useApi().get('/api/active-categories')
    //     .then((response) => {
    //         categories.value = response.data;
    //     })
  });

</script>

<template>
    <div class="col-12 col-lg-8 col-xl-6">
        <StatusWallFormComponent />
        <tabs-component v-if="route?.params?.id == undefined" class="nav nav-pills feedType">
            <tab-component class="nav-item text-center cursor-pointer" :is-active="!tabItem"
                            @tab-clicked="changeTab(false)">
                            {{ $t('site.Users statuses') }}
            </tab-component>
            <tab-component class="nav-item cursor-pointer  text-center" :is-active="tabItem"
                            @tab-clicked="changeTab(true)">
                            {{ $t('site.My statuses') }}
            </tab-component>
        </tabs-component>
        <div class="tab-content" id="feedTypeContent">
            <div v-if="!tabItem" class="tab-pane fade show active" id="tweet-pane" role="tabpanel" aria-labelledby="tweet-tab">
                <StatusWallComponent />
            </div>
            <div v-else class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news-pane">
                <StatusWallComponent :user-id="authStore?.user?.id"/>
            </div>
        </div>
    </div>
    <LeftSideComponent @updateFollowings="updateFollowings"/>
</template>