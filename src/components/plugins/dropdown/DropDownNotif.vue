
<script setup>
  import {computed, defineProps ,onMounted , onBeforeUnmount , ref} from 'vue';
  import jalaliMoment from 'moment-jalaali';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const openDropdown = computed(() => {
    switch (props.float) {
    case 'left' :
        return 'left-[-1em]';
    default:
        return 'right-[-1em]';
    }
});
  const props = defineProps ({
    options: {
      type: Array,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    float: {
      type: String,
      default: 'right'
    },
    modelValue: {
      default: null
    }
  })

  const goToPost = (url) => {
    isDropDownVisible.value = false
    router.push({
          path: url
      })
  };
  
  const notifDropDown = ref(null)
  const selectedOption = ref(null)
  const isDropDownVisible = ref(false)
  const mappedSelecedOption = computed(() => {
    return (selectedOption.value?.name || selectedOption.value) ||
    props.name
  })

  const toggleDropDown = () => {
    isDropDownVisible.value = !isDropDownVisible.value
  }

  const closeDropDown = (element) => {
    if(!notifDropDown.value.contains(element.target)){
      isDropDownVisible.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('click',closeDropDown) 
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click',closeDropDown) 
});


</script>

<template >
    <div class="dropdown-notif relative py-4 px-[14px] cursor-pointer max-w-[200px] " ref="notifDropDown">
     <div class="dropdown-notif-option rounded-[5px] p-4 main-gradient" 
     @click="toggleDropDown">
     <span v-if="icon?.length > 0" class="material-icons text-white " @click="mappedSelecedOption"> {{ icon }} </span>
       
    </div>
    
    <Transition name="slide-fade">
      <div :class="`option-notif min-w-[350px] mt-[5px] rounded-md shadow-[1px_1px_4px_1px_rgba(40, 68, 120 ,0.59)] absolute z-50  p-[0.5rem] ${openDropdown}`"
          v-if="isDropDownVisible"
      >
        <template v-for="(option , index) in options" :key="index">
          <a class="text-decoration-none cursor-pointer text-black " @click="goToPost(option?.link?.length > 0 ? option.link : '/profile/notifications')">
            <div class="py-1 border-b-1 shadow-[1px_2px_0px_-1px_rgba(238,238,221,255)] text-black last-of-type:shadow-none last-of-type:border-b-none ">
              <div class="flex justify-content-between bg-[#f0f8ff] rounded-md p-2 gap-3 hover:bg-[#cbe0f2] hover:text-black ">
                <div>
                  <img v-if="option?.model?.profile_photo_path?.length > 0" :src="option?.model?.profile_photo_path" :alt="option?.model?.nickname" class="shadow-follow-box rounded-full w-[70px] h-[70px]">
                  <img v-else src="/assets/site/images/user-icon.png" :alt="$t('site.Admin')" class="shadow-follow-box rounded-full w-[70px] h-[70px]">
                </div> 
                <div class="w-[80%]">
                  <div class="flex justify-content-between">
                    <div class="notifName" >{{ option?.model?.nickname?.length > 0 ? option?.model?.nickname : 'Admin' }}</div>
                    <div class="notifDate text-slate-400 text-sm">{{ jalaliMoment(option.created_at).fromNow() }}</div>
                  </div>
                  <!-- <div> یک خبر را به اشتراک گذاشت </div> -->
                  <div class="mt-2 truncate max-w-[200px] border-r-[3px] border-r-indigo-600 pr-1 text-slate-600 text-sm">

                    {{ option.message }}
                        

                  </div>
                </div>
              </div>
                
            </div>
          </a>
        </template>
        <a @click="goToPost('/profile/notifications')" class="no-underline" :title="$t('site.Display all')">
        <div class="text-center cursor-pointer text-md bg-gray-100 p-2">
          {{ $t('site.Display all') }}
        </div>
      </a>
      </div>
    </Transition>
   </div>
</template>


<style scoped>
.dropdown-notif {
  padding: 5px 10px;;
  cursor: pointer;
  max-width: 200px;
} 

.option-notif {
    overflow: auto;
    max-height: 300px;
    padding: 0.5rem 0.5rem;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 1px 1px 4px 1px #eee;
    border-radius: 5px;
    margin-top: 5px;
    position: absolute;
    z-index: 9999;
} 
.dropdown-notif-option{
  border-radius: 30px;
    padding: 5px;

}


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>