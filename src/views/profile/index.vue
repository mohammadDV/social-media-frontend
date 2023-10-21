<script setup>

    
//   import {useApi} from '@/utils/api.ts';
  import { onMounted } from 'vue';
  import LeftSideComponent from "@/components/profile/include/LeftSideComponent.vue"
  import StatusWallComponents from "@/components/profile/components/status/StatusWallComponents.vue"
  
//   import { useAuthStore } from '@/stores/auth.ts';


//   const authStore = useAuthStore();
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
        <ul class="nav nav-pills feedType" id="feedType" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tweet-tab" data-bs-toggle="pill" data-bs-target="#tweet-pane" type="button" role="tab" aria-controls="tweet-pane" aria-selected="true">
                    {{ $t('site.Users comments') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="news-tab" data-bs-toggle="pill" data-bs-target="#news-pane" type="button" role="tab" aria-controls="news-pane" aria-selected="false">
                    {{ $t('site.News of users') }}
                </button>
            </li>
        </ul>
        <div class="tab-content" id="feedTypeContent">
            <div class="tab-pane fade show active" id="tweet-pane" role="tabpanel" aria-labelledby="tweet-tab">
                <StatusWallComponents/>
            </div>
            <div class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news-pane">
            </div>
        </div>
    </div>
    <LeftSideComponent />
</template>