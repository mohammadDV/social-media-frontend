<template>
    <div class="full-slider rounded">
      <div v-for="(slide, index) in slides" :key="index" class="slide" :class="{ active: index === activeIndex }">

        <div class="slider-item">
            <div class="slider--media ratio-3-4 mb-0">
                <!-- <img width="200" height="144" :title="slide.title" :alt="slide.title" :src="slide['image']['indexArray']['medium']"/> -->
                <img width="200" height="144" :title="slide.title" :alt="slide.title" src="/site/images/news/149606.jpg"/>
            </div>
            <div class="slider--caption">
                <span class="slider--caption-title">{{ slide.title }}</span>
                <span class="slider--caption-date">{{ currentDate }}</span>
            </div>

            <router-link class="stretched-link" :to="`news/${slide.id}/${slide.slug}`" :title="slide.title"></router-link>
        </div>
      </div>
      <div @click="nextSlide" class="arrow-btn next">
          <span class="material-icons text-white"> arrow_right </span>
      </div>
      <div @click="prevSlide" class="arrow-btn previous">
          <span class="material-icons text-white"> arrow_left </span>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue';


const props = defineProps({
    slides: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 10000 // 2000 milliseconds = 2 seconds
    }
})

const activeIndex = ref(0);
const currentDate = ref(new Date);

const nextSlide = () => {
    activeIndex.value = (activeIndex.value + 1) % props.slides.length;
};

const prevSlide = () => {
    activeIndex.value = (activeIndex.value - 1 + props.slides.length) % props.slides.length;
};

let autoSlideInterval;

onMounted(() => {
    autoSlideInterval = setInterval(nextSlide, props.interval);
});

onUnmounted(() => {
    clearInterval(autoSlideInterval);
});

</script>
  
  <style scoped>
  .full-slider {
    padding: 0;
    position: relative;
    width: 100%;
    margin: auto;
    box-shadow: var(--box-shadow-sm);
    border-radius: 0.5em;
  }
  .full-slider img {
    border-radius: 0.5em;
  }
  .full-slider .slider-item .slider--media {
    margin-bottom: 0 !important;
  }
  .full-slider .slider--caption {
    border-radius: 0 0 6px 6px;
  }
  .slide {
    display: none;
  }
  
  .slide.active {
    display: block;
  }

  .full-slider .arrow-btn {
    z-index: 1;
    cursor: pointer;
    height: 25px;
    position: absolute;
    top: 0;
    border-radius: 0.5rem;
    bottom: 0;
    margin: auto;
    background: #33333357;
    color: #fff;
  }
  .full-slider .arrow-btn .next {
    right: 0;
  }
  .full-slider .arrow-btn.previous {
    left: 0;
  }
  </style>