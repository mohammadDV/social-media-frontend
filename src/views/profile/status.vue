<script setup>

    
//   import {useApi} from '@/utils/api.ts';
  import { onMounted, defineEmits } from 'vue';
  import LeftSideComponent from "@/components/profile/include/LeftSideComponent.vue";
  import StatusPageComponent from "@/components/profile/components/status/StatusPageComponent.vue";


 const emit = defineEmits(['updateFollowings']); 

  const updateFollowings = () => {
    emit('updateFollowings')
  }

  onMounted(() => {

  });

</script>

<template>
    <div class="col-12 col-lg-8 col-xl-6">
        <div class="tab-content" id="feedTypeContent">
            <div class="tab-pane fade show active" id="tweet-pane" role="tabpanel" aria-labelledby="tweet-tab">
                <StatusPageComponent />
            </div>
            <div class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news-pane">
            </div>
        </div>
    </div>
    <LeftSideComponent @updateFollowings="updateFollowings"/>
</template>