<template>
    <div>
      <button @click="cos">add</button>
      <video ref="videoPlayer" width="640" height="360" controls>
        <!-- Ad video source -->
        <source v-if="showAd" src="https://s3.eu-central-1.amazonaws.com/varzeshtimes.ir/uploads/videos/default/2023/11/18/kkgm68xexWOhfcgT3b8tJ7wCp7WR7nkp2Yt4XbQj.mov" type="video/mov" />
        <!-- Original video source -->
        <source v-else src="https://s3.eu-central-1.amazonaws.com/varzeshtimes.ir/uploads/videos/default/2024/02/17/mkwejV6E6Vhgg5Uw2q7VvP92cqvDE647bzdEKB79.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'VideoPlayer',
  
    setup() {

      
      const videoPlayer = ref('');
      const showAd = ref(true);

      const cos = () => {
        console.log('xasxasx');

        showAd.value = false;

        console.log(videoPlayer.value);
        // console.log(videoPlayer.value.pause());
      }
  
      // https://stackblitz.com/edit/vitejs-vite-rf6dum?file=src%2FApp.vue
      // https://cloudinary.com/blog/guest_post/creating-a-custom-video-player-in-vue
      // Function to handle video playback
      // const handleVideoPlayback = () => {
      //   // Show advertisement for the first 5 minutes
      //   setTimeout(() => {
      //     console.log(videoPlayer.value);
      //     console.log("xasxxasx");
      //     // showAd.value = false;
      //     videoPlayer.value.stop(); // Start playing the original video
      //   }, 5000); // 5 minutes in milliseconds
      // };
  
      // Lifecycle hook to execute code after the component is mounted
      onMounted(() => {
        if (videoPlayer.value) {
          // Add event listener for the 'ended' event
          videoPlayer.value.addEventListener('ended', () => {
            // Handle the original video end event if needed
          });
  
          // Start playing the advertisement
          // handleVideoPlayback();
        }
      });
  
      return {
        videoPlayer,
        cos,
        showAd
      };
    }
  };
  </script>