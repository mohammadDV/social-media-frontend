<script setup>
import { ref, watch,onMounted, onBeforeUnmount, defineEmits } from 'vue';
import {useApi} from '@/utils/api.ts';

const searchQuery = ref('');
const closeBox = ref('');
const showDropdown = ref(false);
const selectedUsers = ref([]);

const emit = defineEmits(['updateUsers']);


const handleInput = () => {
    showDropdown.value = searchQuery.value.length >= 2;
}

const closeDropDown = (element) => {

    emit('updateUsers', selectedUsers);
    if(!closeBox.value.contains(element.target)){
      showDropdown.value = false
    }
  };

  const users = ref([]);

  const doSearch = () => {
    useApi().post('/api/user/search', {search: searchQuery.value})
        .then((response) => {
          users.value = response.data.users;
        });
  }

  const selectUser = (user) => {

    let exist = selectedUsers.value.find(item => item.id == user.id);

    if (!exist) {
      selectedUsers.value.push(user);
    }
    searchQuery.value = '';

    closeDropDown(user)
  }

  const deletItem = (user) => {

    selectedUsers.value = selectedUsers.value.filter(item => item.id != user.id);

    if (!selectedUsers.value) {
      selectedUsers.value = [];
    }

    searchQuery.value = '';
    closeDropDown(user)
  }

  watch(searchQuery, () => {
    showDropdown.value = searchQuery.value.length >= 2;
    if (searchQuery.value.length >= 2) {
      doSearch();
    }
  });

  onMounted(() => {
    window.addEventListener('click',closeDropDown) 
  })
  onBeforeUnmount(() => {
      window.removeEventListener('click',closeDropDown) 
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
            <a @click="selectUser(user)" class="cursor-pointer text-decoration-none text-gray-700">
                <div class="flex gap-2 items-center ">
                  <img :src="user.profile_photo_path" alt="" class="shadow-follow-box rounded-full w-[30px] h-[30px]">
                  <div>{{ $t('site.Id') }} : {{ user.id }} |</div>
                  <div>{{ $t('site.Nickname') }} : {{ user.nickname }} |</div>
                  <div>{{ $t('site.Email') }} : {{ user.email }} |</div>
                  <div>{{ $t('site.First name') }} : {{ user.first_name }} |</div>
                  <div>{{ $t('site.Last name') }} : {{ user.last_name }}</div>
                </div>
              </a>
            </li>
        </ul>
          <div class="text-center text-primary" v-if="users.length == 0">
              <p>{{ $t('site.nothing here') }}</p>
            </div>
      </div>
  </div>


  <div class="p-2 m-2" v-if="selectedUsers?.length > 0">
    <div v-for="(user,index) in selectedUsers" :key="index" class="flex gap-4 mb-3">
      <div class="last-chater text-gray-500">{{ $t('site.Id') }} : </div>
      <div class="user-name">
        <a :href="`/profile/users/edit/${user?.id}`" target="_black">
          {{ user?.id }}
        </a>
      </div>
      <div class="last-chater text-gray-500">{{ $t('site.Nickname') }} : </div>
      <div class="user-name">
          <a :href="`/profile/users/edit/${user?.id}`" target="_black">
            {{ user?.nickname }}
          </a>
      </div>
      <div class="last-chater text-gray-500">{{ $t('site.Email') }} : </div>
      <div class="user-name">{{ user?.email }}</div>
      <div class="user-name">
        <span @click="deletItem(user)" class="p-1 rounded btn-danger m-1 text-white material-icons size-font-ahalf cursor-pointer"> delete </span>
      </div>
    </div>
  </div>
</template>


