<script setup>

import { defineEmits, defineProps } from 'vue'; 

const emit = defineEmits(['close']);

defineProps({
    title: {
        type: String,
        default: ''
    }
})

const closeModal = () => {
    emit('close');
};
</script>
<template>

<teleport to="body">
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Background overlay -->
    <div
      class="fixed inset-0 bg-black opacity-50"
      @click="closeModal"
    ></div>
    
    <!-- Modal content -->
    <div class="bg-white p-4 shadow-lg rounded-lg z-50">
      <!-- Modal header -->
      <div class="flex justify-between items-center mb-4">
        <h2  class="text-xl font-semibold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      <!-- Modal body -->
      <div class="modal-body">
        <!-- Your modal content goes here -->
        <slot></slot>
      </div>
    </div>
  </div>
  </teleport>
</template>
