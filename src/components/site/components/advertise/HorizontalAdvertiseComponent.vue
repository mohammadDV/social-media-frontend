<script setup>

  import { defineProps } from 'vue';

  defineProps({
    advertises: {
        required: true
    }
  });
</script>

<template>
    <div v-if="advertises?.length > 0" class="row mb-75">
        <div class="col-12 col-lg-6" v-for="(advertise, index) in advertises" :key="index">
            <div class="row-ads mt-2 mb-1">
                <a :href="advertise?.link ? advertise.link : '#'" rel="nofollow" :title="advertise.title" target="_blank">
                    <img v-lazy="advertise.image" :alt="advertise.title" class="img-fluid row-ad"/>
                </a>
            </div>
        </div>
    </div>
    <div v-else class="row mb-5"></div>

</template>