<script setup>

  import { defineProps } from 'vue';

  defineProps({
    advertises: {
        required: true
    }
  });
</script>

<template>
    <div class="col-ads hidden md:block" v-for="(advertise, index) in advertises" :key="index">
        <a :href="advertise?.link ? advertise.link : '#'" rel="nofollow" :title="advertise.title" target="_blank">
          <img class="col-ad" v-lazy="advertise.image" :alt="advertise.title"/>
        </a>
    </div>
</template>