<script setup>
import { ref, onMounted, defineProps } from 'vue';

    
    const videoPlayer = ref('');
    const advertisePlayer = ref('');
    const showAd = ref(true);
    // const origin = ref('https://s3.eu-central-1.amazonaws.com/varzeshtimes.ir/uploads/videos/default/2024/02/17/mkwejV6E6Vhgg5Uw2q7VvP92cqvDE647bzdEKB79.mp4');

    const props = defineProps({
      video: {
        type: String,
        required: true
      },
      advertise: {
        type: String,
        default: ''
      }
    })

    const visible = ref(false);

    const startVideo = () => {
      showAd.value = false;
            
      // advertisePlayer.value.pause();
      // console.log(videoPlayer.value.play());
    }

    // https://stackblitz.com/edit/vitejs-vite-rf6dum?file=src%2FApp.vue
    // https://cloudinary.com/blog/guest_post/creating-a-custom-video-player-in-vue

    onMounted(() => {

      console.log(props.advertise?.length);
      if (props.advertise?.length > 0) {
        if (advertisePlayer.value) {
            advertisePlayer.value.play();
        }
        setTimeout(() => { visible.value = true; }, 5000);
      } else {
        showAd.value = false;
        visible.value = true;
      }

    });
</script>

<template>
    <div class="relative w-full">
      <video v-if="showAd" class="w-full rounded" ref="advertisePlayer">
        <source  :src="advertise" type="video/mp4" />
      </video>
      <video v-else class="w-full rounded" ref="videoPlayer"  controls>
        <source  :src="video" type="video/mp4" />
      </video>
      <button v-if="visible && showAd" class="btn absolute right-2 bottom-2 absolute btn-sm right-2 bg-primary text-white p-2" @click="startVideo">Start video</button>
    </div>
  </template>

<style>

.test {
  object-fit: contain;
  position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    background: transparent;
}

</style>
  
