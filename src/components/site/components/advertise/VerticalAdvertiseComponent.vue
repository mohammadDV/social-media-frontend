<script setup>

  import { defineProps } from 'vue';

  defineProps({
    advertises: {
        required: true
    }
  });
</script>

<template>
    <div class="col-ads" v-for="(advertise, index) in advertises" :key="index">
        <a :href="advertise.link"  :title="advertise.title" target="_blank">
          <img class="col-ad" :src="advertise.image" :alt="advertise.title"/>
        </a>
    </div>
</template>