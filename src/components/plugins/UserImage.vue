

<script setup>
  import { defineProps } from 'vue';
    
  defineProps({
    item: {},
    addclass: {
      type: String,
      default: ''
    }
  });

</script>

<template>
    <img :class="addclass" v-if="item?.profile_photo_path?.length > 0" :src="item.profile_photo_path" :alt="item.nickname" />
    <img :class="addclass" v-else src="/assets/site/images/user-icon.png" :alt="item?.nickname" />
</template>