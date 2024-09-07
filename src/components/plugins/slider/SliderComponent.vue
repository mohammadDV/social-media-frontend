<template>
    <div class="slider bg-white rounded">
      <div v-for="(slide, index) in slides" :key="index" class="slide" :class="{ active: index === activeIndex }">
        <div class="splide__slide">
            <div class="news-slider-item">
                <router-link class="stretched-link" :to="`/news/${slide.id}/${slide.slug}`" :title="slide.title"></router-link>
                <div class="row">
                    <!-- Text Area -->
                    <div class="col-12 col-lg-6 text-area">
                        <div class="news-slider--text-container">
                            <div class="news-slider--rutitle">
                                {{ slide.pre_title }}
                            </div>
                            <h3 class="news-slider--title">
                                {{ slide.title }}
                            </h3>
                            <p class="news-slider--subtitle">
                                {{ slide.summary }}
                            </p>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 image-area">
                        <div class="news-slider--image-container">
                            <div class="news-slider--image-area">
                                <img
                                    width="246"
                                    height="150"
                                    :src="slide['image']"
                                    :alt="slide.title"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
  .slider {
    padding: 0;
    position: relative;
    width: 100%;
    margin: auto;
    box-shadow: var(--box-shadow-sm);
    border-radius: 0.5em;
  }
  .slide img {
    border-radius: 0.5em 0 0 0.5em;
  }
  
  .slide {
    display: none;
  }
  
  .slide.active {
    display: block;
  }

  .slider .arrow-btn {
    z-index: 1;
    cursor: pointer;
    height: 35px;
    position: absolute;
    top: 0;
    border-radius: 0.5rem;
    bottom: 0;
    margin: auto;
    background: #33333357;
    color: #fff;
  }
  .slider .arrow-btn .next {
    right: 0;
  }
  .slider .arrow-btn.previous {
    left: 0;
  }
  </style>