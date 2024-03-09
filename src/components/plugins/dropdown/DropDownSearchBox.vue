<script setup>
import { ref, watch,onMounted, onBeforeUnmount } from 'vue';
import {useApi} from '@/utils/api.ts';

const searchQuery = ref('');
const closeBox = ref('');
const showDropdown = ref(false);
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

  const users = ref([]);
  const clubs = ref([]);

  const doSearch = () => {
    useApi().post('/api/user/search', {search: searchQuery.value})
        .then((response) => {
          users.value = response.data.users;
          clubs.value = response.data.clubs;
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
  <div class="flex-auto relative" ref="closeBox">
    <div class="flex">
      <input type="text" v-model.lazy="searchQuery"  @input="handleInput" class="w-full px-2 rounded-sm border-1 bg-[#edf1f7] py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="جستجو کنید...">
      <button class="bg-primary text-white p-2 rounded-l hover:bg-gray-500">
        <span class="material-icons text-body-invert"> search </span>
      </button>
    </div>
    <div v-if="showDropdown" class="search-material absolute z-10 border border-gray-300 min-w-40 top-full opacity-100
     transition-transform duration-600 ease-in-out delay-200 shadow-md w-full bg-white p-2 rounded-3  ">
        <ul class="overflow-auto max-h-[400px]"> 
          <li class="p-2 hover:bg-slate-200 hover:rounded-3 cursor-pointer" v-for="(user, index) in users" :key="index">
            <router-link :to="`/member/${user.id}`" class="text-decoration-none text-gray-700">
                <div class="flex gap-2 items-center ">
                  <img :src="user.profile_photo_path" alt="" class="shadow-follow-box rounded-full w-[30px] h-[30px]">
                  <div>{{ user.nickname }}</div>
                </div>
              </router-link>
              </li>
        </ul>
          <div v-if="clubs?.length > 0 && users?.length > 0" class="w-full py-1 font-bold text-lg border-b-2 border-gray-200 text-gray-700">
            <!-- <span class="material-icons text-primary p-2"> local_fire_department </span>
            <span>{{ $t('site.Clubs') }}</span> -->
          </div>
          <div v-if="clubs?.length > 0" class="py-2 flex flex-wrap justify-start items-center w-full gap-2">
            <router-link :to="`/club/${club.id}`" v-for="(club, index) in clubs" :key="index" class="no-underline cursor-pointer text-sm rounded px-1 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500">
              <span class="material-icons"> tag </span>
              <span class="tag-name">{{ club.sport.title  + ' | ' + club.title }}</span>
            </router-link>
          </div>
          <div class="text-center text-primary" v-if="clubs.length == 0 && users.length == 0">
              <p>{{ $t('site.nothing here') }}</p>
            </div>
      </div>
  </div>
</template>


