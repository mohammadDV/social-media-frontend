<template>
  <div class="flex-auto relative" ref="closeBox">
    <div class="flex">
      <input type="text" v-model="searchQuery"  @input="handleInput" class="w-full px-2 rounded-sm border-1 bg-[#edf1f7] py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="جستجو کنید...">
      <button class="btn vt-btv-primary">
        <span class="material-icons text-body-invert"> search </span>
      </button>

    </div>



    <ul v-if="showDropdown" class="absolute z-10 border border-gray-300 min-w-40 top-full opacity-100
     transition-transform duration-600 ease-in-out delay-200 shadow-md w-full bg-white p-2 rounded-3  ">
      <li class="p-2 hover:bg-slate-200 hover:rounded-3 cursor-pointer" v-for="(item, index) in filteredItems" :key="index">
        <div class="flex gap-2 items-center ">
          <img src="../../../assets/site/images/user.jpg" alt="" class="shadow-follow-box rounded-full w-[30px] h-[30px]">
          <div>{{ item }}</div>
        </div>
      </li>
      <div class="w-full py-2 font-bold text-lg my-2 border-b-2 border-gray-200 text-gray-700">
        <span class="material-icons"> schedule </span>
        <span>تاریخچه جستجو</span>
      </div>
      <div class="flex justify-start items-center w-full mb-4 gap-2">
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> schedule </span>
          <span class="tag-name">مسی</span>
        </a>
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> schedule </span>
          <span class="tag-name">پرسپولیس</span>
        </a>
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> schedule </span>
          <span class="tag-name">رونالدو</span>
        </a>
      </div>
      <div class="w-full py-2 font-bold text-lg my-2 border-b-2 border-gray-200 text-gray-700">
        <span class="material-icons"> local_fire_department </span>
        <span>داغ ترینها</span>
      </div>
      <div class="flex justify-start items-center w-full mb-4 gap-2">
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons  "> tag </span>
          <span class="tag-name">استقلال</span>
        </a>
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> tag </span>
          <span class="tag-name">پرسپولیس</span>
        </a>
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> tag </span>
          <span class="tag-name">تراکتورسازی</span>
        </a>
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> tag </span>
          <span class="tag-name">مسی</span>
        </a>
        <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300 mr-2 hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
          <span class="material-icons "> tag </span>
          <span class="tag-name">داربی</span>
        </a>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch,onMounted, onBeforeUnmount } from 'vue';

    const searchQuery = ref('');
    const closeBox = ref('');
    const showDropdown = ref(false);
    const dropdownItems = ['Option 1', 'Option 2', 'Option 3'];
  //   const props = defineProps ({
  //   options: {
  //     type: Array,
  //     require: true
  //   },
  //   name: {
  //     type: String,
  //     require: true
  //   },
  //   icon: {
  //     type: String,
  //     default: ''
  //   },
  //   color: {
  //     type: String,
  //     default: 'primary'
  //   },
  //   float: {
  //     type: String,
  //     default: 'right'
  //   },
  //   modelValue: {
  //     default: null
  //   }
  // })
    const handleInput = () => {
      showDropdown.value = searchQuery.value.length >= 2;
    };
    onMounted(() => {
    window.addEventListener('click',closeDropDown) 
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click',closeDropDown) 
});
    
//     const openDropdown = computed(() => {
//     switch (props.float) {
//     case 'left' :
//         return 'left-[-1em]';
//     default:
//         return 'right-[-1em]';
//     }
// });
const closeDropDown = (element) => {
    if(!closeBox.value.contains(element.target)){
      showDropdown.value = false
    }
  };

    const filteredItems = ref([]);
    watch(searchQuery, () => {
      filteredItems.value = dropdownItems.filter(item =>
        item.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

  
</script>

<style scoped>


/* .c{
  cursor: pointer;
    font-size: 0.857rem;
    border-radius: 0.5rem;
    padding: 0.35rem 0.75rem;
    text-decoration: none;
    margin-inline-end: 0.5rem;
    color: #06b4f9;
    background-color: #06b4f910;
    border-color: #83dafc;
} */
/* .c:hover {
  color: #ffffff;
    background-color: #06b4f9;
    border-color: #06b4f9;
} */
  /* .b{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  } */
/* .a {
  width: 100%;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
    margin: 0.5rem 0 1rem 0;
    color: #2e3a59;
    border-bottom: 2px solid #f7f9fc;
} */
  /* .def {
    position: absolute;
    z-index: 9;
    border: 1px solid #eee;
    min-width: 10rem;    top: calc(100% + 0.25rem);
    opacity: 1;
    transform: translateY(0);
    transition: transform 0.6s cubic-bezier(0, 0.64, 0.3, 1), opacity 0.4s ease-out 0.2s;
    box-shadow: 0 0.5rem 1rem rgba(21, 26, 48, 0.15);
  } */
</style>