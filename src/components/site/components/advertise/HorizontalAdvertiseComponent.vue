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
            <div class="row-ads mb-2">
                <a :href="advertise.link" :title="advertise.title">
                    <img :src="advertise.image" :alt="advertise.title" class="img-fluid row-ad"/>
                </a>
            </div>
        </div>
    </div>
</template>