
<script setup>
  import {computed, defineProps, defineEmits ,onMounted , onBeforeUnmount , ref} from 'vue';
  
  const props = defineProps ({
    options: {
      type: Array,
      require: true
    },
    type: {
      type: String,
      default: 'menu'
    },
    dropDownIcon: {
      type: Boolean,
      default: true
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
    menuClass: {
      type: String,
      default: 'w-full'
    },
    modelValue: {
      default: null
    }
  })
  
  const dropDown = ref(null)
  const selectedOption = ref(null)
  const isDropDownVisible = ref(false)
  const mappedSelecedOption = computed(() => {
    return (selectedOption.value?.name || selectedOption.value) ||
    props.name
  })

  const emit = defineEmits(['update:modelValue'])

  const toggleOptionSelect = (option) => {
    if (props.type == 'selector') {
      selectedOption.value = option?.title;
    }
    emit('update:modelValue', option)
    closeDropDown(option)
  }

  const toggleDropDown = () => {
    isDropDownVisible.value = !isDropDownVisible.value
  }

  const closeDropDown = (element) => {
    if(!dropDown.value.contains(element.target)){
      isDropDownVisible.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('click',closeDropDown) 
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click',closeDropDown) 
});


const sizeCss = computed(() => {
    if (props.size === 'small') {
    return '';
    }
    else if (props.size === 'medium') {
    return '';
    }
    else if (props.size === 'large') {
    return '';
    }
    return '';
});

const backgroundColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'bg-[#ecf0f7]';
    case 'danger' :
        return '';
    case 'outline' :
        return '';
    case 'dark' :
        return ''
    default:
        return '';
    }
});
const backgroundColorDropdown = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'bg-[#384c78] ';
    default:
        return 'bg-vt ';
    }
});
const openDropdown = computed(() => {
    switch (props.float) {
    case 'left' :
        return 'left-0';
    default:
        return 'right-0';
    }
});
const iconColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'text-accent';
    case 'danger' :
        return 'text-red';
    case 'dark' :
        return 'text-black';
    default:
        return 'text-white';
    }
});

const borderColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return '';
    case 'white' :
        return '';
    case 'dark' :
        return '';
    default:
        return '';
    }
})

const gradientColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'main-gradient';
    case 'profile'   :
    return 'bg-vt';

    default:
        return '';
    }
})

const hoverBackgroundColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'hover:bg-[#06b4f9]';
 
    default:
        return 'hover:bg-[#f0f8ff80]';
    }
})


const textColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'text-white';

    default:
        return 'text-white';
    }
});

const dDIcon = computed(() => {
    if (props.dropDownIcon) {
      return 'dropdown-seleced-option'
    }
    return '';
});


</script>

<template >
   <div :class="`relative cursor-pointer max-w-[210px] ${sizeCss} ${borderColor} ${textColor} `" ref="dropDown">
     <div :class="`${dDIcon} rounded-[5px] p-[5px] flex justify-between items-center gap-[5px] ${backgroundColor} ${gradientColor}`" 
     @click="toggleDropDown">
     <span v-if="icon?.length > 0" :class="`material-icons ${iconColor}`"> {{ icon }} </span>
       <span class="">
        {{mappedSelecedOption}}
       </span>   
    </div>
    
    <Transition name="slide-fade">
      <div :class=" `${menuClass} mt-[5px] rounded-md shadow-[1px_1px_4px_1px_rgba(40, 68, 120 ,0.59)] absolute z-50  p-[0.5rem] ${openDropdown} ${backgroundColorDropdown}`"
          v-if="isDropDownVisible"
      >
        <template v-for="(option , index) in options" :key="index">
          <router-link v-if="option?.url?.length > 0 && type == 'menu'" :class="`text-decoration-none cursor-pointer ${textColor}`" :to="option.url">
              <div :class="`p-[0.5rem] border-b-1 shadow-[1px_2px_0px_-1px_rgba(238,238,221,255)] hover:text-white hover:rounded-[5px] last-of-type:shadow-none last-of-type:border-b-none ${hoverBackgroundColor}`">
                  <span v-if="option?.icon?.length > 0" class="material-icons ml-3"> {{ option.icon }} </span>
                  <span> {{ option.title }} </span>
              </div>
          </router-link>
          <div v-else class="option" @click="toggleOptionSelect(option)">
            {{ option.title || option }}
          </div>
        </template>
      </div>
    </Transition>
   </div>
</template>


<style>
/* .dropdown-wrapper {
  padding: 5px 10px;;
  cursor: pointer;
  max-width: 200px;
} */

.dropdown-seleced-option{
  /* border-radius: 30px;
    padding: 5px;
    background: #ecf0f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px; */
}

.main-gradient {    
  border: 1px solid #737373;
    /* background: linear-gradient(to right, #3f5483 , #182848); */
  background: #3f5483;
  color: white;
}

.main-gradient:hover {
  transition: .3;
  background: #182848;
  border: 1px solid #515761;
}

.profile-gradient {
  background: #06b4f9;
  color: white;

}

.dropdown-seleced-option::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
}
/* .option:hover{
  background: #06b4f9;
  border-radius: 5px;
} */

/* .option{
    padding: 0.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    box-shadow: 1px 2px 0px -1px #EED;
} */

/* .option:last-of-type {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: none;
  box-shadow: none;

} */

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