<script setup>

import { ref, watch,onMounted, onBeforeUnmount } from 'vue';
import {useApi} from '@/utils/api.ts';
import jalaliMoment from 'moment-jalaali';
  import { useRouter } from 'vue-router';



  const router = useRouter();
    const searchQuery = ref('');
    const closeBox = ref('');
    const showDropdown = ref(false);
    const posts = ref([]);
    const tags = ref([]);
    const categories = ref([]);

    const handleInput = () => {
      showDropdown.value = searchQuery.value.length >= 2;
    };
    onMounted(() => {
    window.addEventListener('click',closeDropDown) 
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click',closeDropDown) 
});
    
const closeDropDown = (element) => {
    if(!closeBox.value.contains(element.target)){
      showDropdown.value = false
    }
  };

const goToPost = (url) => {
    showDropdown.value = false
    router.push({
          path: url
      })
  };

  const doSearch = () => {
  useApi().post('/api/search-post-tag', {search: searchQuery.value})
      .then((response) => {
        posts.value = response.data.posts;
        tags.value = response.data.tags;
        categories.value = response.data.categories;
      });
}

  watch(searchQuery, () => {
    showDropdown.value = searchQuery.value.length >= 2;
    if (searchQuery.value.length >= 2) {
      doSearch();
    }
  });

  
</script>

<template>
  <div class="search-material flex-auto relative" ref="closeBox">
    <div class="flex">
      <input type="text" v-model.lazy="searchQuery" name="search" @input="handleInput" class="w-full px-2 rounded-sm border-1 bg-[#edf1f7] py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="جستجو کنید...">
      <button class="btn vt-btv-primary">
        <span class="material-icons text-body-invert"> search </span>
      </button>
    </div>

    <div v-if="showDropdown" class="absolute z-10 border border-gray-300 min-w-40 top-full opacity-100 transition-transform duration-600 ease-in-out delay-200 shadow-md w-full bg-white p-2 rounded-3  ">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full sm:grid sm:grid-cols-1 xs:grid xs:grid-cols-1">
        <div class=" cursor-pointer" v-for="(post, index) in posts" :key="index">
          <div @click="goToPost(`/news/${post.id}/${post.slug}`)" class="flex gap-2 flex-nowrap flex-wrap items-center justify-center rounded-md bg-gray-100  hover:bg-gray-200 xs:flex xs:flex-col">
              <div class="flex-none">
                <img v-if="post?.thumbnail?.length > 0" class="rounded-md h-[100px]" :src="post.thumbnail" :alt="post.title">
                <img v-else class="rounded-md h-[100px]" :src="post.image" :alt="post.title">
              </div>
              <div class="flex-grow p-2">
                  <h3 class="h-[20px] text-primary overflow-hidden no-underline text-base"  href="">{{ post.title }}</h3>
                  <p class="text-xs h-[29px] overflow-hidden w-full"> {{ post.summary }} </p>
                  <div id="search-material" class="flex gap-6 justify-between">
                    <div class="flex gap-2">
                      <div class="view text-gray-400 text-xs">
                        <span class="material-icons text-sm">visibility</span>
                        {{ post.view }}
                      </div>
                    </div>
                    <div class="time text-gray-400 text-xs">
                      <span class="material-icons text-sm">schedule</span>
                      {{ jalaliMoment(post.created_at).format('dddd jD jMMMM') }}</div>
                  </div>
              </div>
          </div>  
        </div>
      </div>
      <div class="flex flex-wrap gap-2 my-3">
        تگ ها :
        <div class="cursor-pointer" v-for="(tag, index) in tags" :key="index">
          <div class="flex justify-start items-center w-full">
            <a @click="goToPost(`/tag/${tag.id}/${tag.title}`)" class="no-underline cursor-pointer text-sm rounded px-2 py-1 text-blue-500 bg-blue-100 border-0 hover:text-white hover:bg-blue-500 hover:border-blue-500">
              <span class="material-icons  "> tag </span>
              <span class="tag-name">{{tag.title}}</span>
            </a>    
          </div>
        </div>    
      </div>
      <div class="flex flex-wrap gap-2 my-3">
        دسته بندی ها :
        <div class="cursor-pointer" v-for="(category, index) in categories" :key="index">
          <div class="flex justify-start items-center w-full">
            <a @click="goToPost(`/category/${category.id}/${category.slug}`)" class="no-underline cursor-pointer text-sm rounded px-2 py-1 text-blue-500 bg-blue-100 border-0 hover:text-white hover:bg-blue-500 hover:border-blue-500">
              <span class="tag-name">{{category.title}}</span>
            </a>    
          </div>
        </div>    
      </div>
      <div class="text-center cursor-pointer text-md my-2 bg-gray-100 p-2">
        <a :href="`/search?q=${searchQuery}`" class="no-underline" :title="searchQuery">نمایش همه</a>
      </div>
    </div>
  </div>
</template>


<style>

.search-material .material-icons {
  font-size: 15px !important;
}
</style>