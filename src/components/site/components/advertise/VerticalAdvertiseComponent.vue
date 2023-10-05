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
        <router-link :to="advertise.link" :title="advertise.title">
            <img class="col-ad" :src="advertise.image" :alt="advertise.title"/>
        </router-link>
    </div>
</template>