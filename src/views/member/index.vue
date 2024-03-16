<script setup>

//   import {useApi} from '@/utils/api.ts';
  import { onMounted } from 'vue';
  import StatusWallComponent from "@/components/profile/components/status/StatusWallComponent.vue";

  // import { useAuthStore } from '@/stores/auth.ts';

  // const authStore = useAuthStore();

  onMounted(() => {
    // useApi().get('/api/active-categories')
    //     .then((response) => {
    //         categories.value = response.data;
    //     })
  });

</script>

<template>
    <div class="col-12 col-lg-8 col-xl-8">
        <!-- <StatusWallFormComponent /> -->
        <div class="tab-content" id="feedTypeContent">
            <div class="tab-pane fade show active" id="tweet-pane" role="tabpanel" aria-labelledby="tweet-tab">
                <StatusWallComponent/>
            </div>
            <div class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news-pane">
            </div>
        </div>
    </div>
</template>