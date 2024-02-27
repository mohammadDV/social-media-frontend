<template>
  <div class="flex-auto relative" ref="closeBox">
    <div class="flex">
      <input type="text" v-model="searchQuery"  @input="handleInput" class="w-full px-2 rounded-sm border-1 bg-[#edf1f7] py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="جستجو کنید...">
      <button class="btn vt-btv-primary">
        <span class="material-icons text-body-invert"> search </span>
      </button>
    </div>

    <div v-if="showDropdown" class=" absolute z-10 border border-gray-300 min-w-40 top-full opacity-100 transition-transform duration-600 ease-in-out delay-200 shadow-md w-full bg-white p-2 rounded-3  ">
      <div class="grid grid-cols-3 gap-2 w-full py-2 sm:grid sm:grid-cols-1 xs:grid xs:grid-cols-1">
        <div class=" cursor-pointer" v-for="(item, index) in news" :key="index">
          <div class="flex gap-2 p-[8px] items-center rounded-md bg-gray-100  hover:bg-gray-200 xs:flex xs:flex-col ">
              <div class="flex ">
                  <a href=""><img class="rounded-md w-full h-[100px]" src="../../../assets/site/images/poosstt.jpg" alt="img"></a>
              </div>
              <div class="flex flex-col flex-[50%]">
                  <h3><a class="no-underline text-base"  href="">{{ item.title }}</a></h3>
                  <p class="text-sm truncate max-w-[250px]"> {{ item.content }} </p>
                  <div class="flex gap-6 justify-between">
                    <div class="flex gap-2">
                      <div class="view text-gray-400 text-xs">
                        <span class="material-icons text-sm">visibility</span>
                        {{ item.view }}</div>
                      <div class="comment text-gray-400 text-xs">
                        <span class="material-icons text-sm">chat</span>

                        {{ item.comment }}</div>
                    </div>
                    <div class="time text-gray-400 text-xs">
                      <span class="material-icons text-sm">schedule</span>
                      {{ item.time }}</div>
                  </div>
              </div>
          </div>    
        </div>
      </div>
      <div class="flex my-2">
        <div class="p-2  cursor-pointer" v-for="(tag, index) in tags" :key="index">
          <div class="flex justify-start items-center w-full mb-4 gap-2">
            <a class="no-underline cursor-pointer text-sm rounded px-3 py-1 text-blue-500 bg-blue-100 border border-blue-300  hover:text-white hover:bg-blue-500 hover:border-blue-500" href="#">
              <span class="material-icons  "> tag </span>
              <span class="tag-name">{{tag.title}}</span>
            </a>    
          </div>
        </div>    
      </div>
      <div class="text-center text-md my-2  bg-gray-100 p-2">
        <a class="no-underline cursor-pointer" href="">نمایش همه</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch,onMounted, onBeforeUnmount } from 'vue';

    const searchQuery = ref('');
    const closeBox = ref('');
    const showDropdown = ref(false);
    const news = [ {
                id:'1',
                title:'Option 1',
                content:'حکم سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار سنگین برای هوادار چلسی: ۳ سال',
                time:'2 ساعت پیش',
                view:'100k',
                comment:'23'

      },
      {
                id:'2',
                title:'Option 2',
                content:'ضور در ورزشگاه‌های فوتبال محرومل',
                time:'5 دقیقه پیش',
                view:'2k',
                comment:'3'

      },
      {
                id:'3',
                title:'Option 3',
                content:'حکم سنگین برای هوادار چلسی سال',
                time:'30 دقیقه پیش',
                view:'400',
                comment:'43'

      }
        ];
        const tags = [ {
                id:'1',
                title:'مسی',
              

      },
      {
                id:'2',
                title:'استقلال',
           

      },
      {
                id:'3',
                title:'پرسپولیس',
               

      }
        ];

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
      filteredItems.value = news
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