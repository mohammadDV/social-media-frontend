
<script setup>
  import {computed, defineProps, defineEmits ,onMounted , onBeforeUnmount , ref} from 'vue'

  
  const props = defineProps ({
    options: {
      type: Array,
      require: true
    },
    isSelector: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      require: true
    },
    icon: {
      type: String,
      default: ''
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
    if (props.isSelector) {
      selectedOption.value = option?.title;
    }
    emit('update:modelValue',option)
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

</script>

<template >
   <div class="dropdown-wrapper" ref="dropDown">
     <div class="dropdown-seleced-option" 
     @click="toggleDropDown">
     <span v-if="icon?.length > 0" class="material-icons text-accent"> {{ icon }} </span>
       <span class="px-2 py-1">
        {{mappedSelecedOption}}
       </span>   
    </div>
    
    <Transition name="slide-fade">
      <div class="option-wrapper"
          v-if="isDropDownVisible"
      >
        <template v-for="(option , index) in options" :key="index">
          <router-link v-if="option?.url?.length > 0 && !isSelector" class="text-decoration-none cursor-pointer" :to="option.url">
              <div class="option">
                  <span v-if="option?.icon?.length > 0" class="material-icons"> {{ option.icon }} </span>
                  <span> {{ option.title }} </span>
              </div>
          </router-link>
          <div v-else-if="isSelector" class="option" @click="toggleOptionSelect(option)">
            {{ option.title || option }}
          </div>
        </template>
      </div>
    </Transition>
   </div>
</template>


<style>
.dropdown-wrapper {
  padding: 5px 10px;;
  cursor: pointer;
  max-width: 200px;
  /* margin: 40px auto; */
}
.option-wrapper {
    padding: 0.5rem 0.5rem;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 1px 1px 4px 1px #eee;
    border-radius: 5px;
    margin-top: 5px;
    position: absolute;
    z-index: 9999;
    width: 10%;
}
.dropdown-seleced-option{
  border-radius: 30px;
    padding: 5px;
    background: #ecf0f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
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
.option:hover{
  background: #06b4f9;
  border-radius: 5px;
}

.option{
    padding: 0.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    box-shadow: 1px 2px 0px -1px #EED;
}

.option:last-of-type {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom: none;
  box-shadow: none;

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