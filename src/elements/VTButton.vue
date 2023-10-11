<template>
   <button type="button"
            :class="`relative inline-flex items-center border text-sm font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iv-500 ${sizeCss} ${borderColor} ${textColor} ${backgroundColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`">
        <span v-show="currentIcon"
              :class="`mr-2 flex items-center text-xs ${iconColor} ${loading ? 'animate-spin' : ''}`">
          <span class="material-symbols-outlined scale-75">{{ currentIcon }}</span>
        </span>

        <span v-if="badge > 0"
              class="absolute right-0 top-0 rounded-full items-center text-center w-5 h-5 text-sm font-medium bg-red-600 text-white ring-2 ring-white -mt-2 -mr-2">
            {{ parseInt(badge) >= 10 ? '9+' : badge }}
        </span>
        <slot/>
    </button>
</template>

<script setup>

import { defineProps, computed } from 'vue';

const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    badge: {
      type: Number,
      default: 0,
    }
})

const sizeCss = computed(() => {
    if (props.size === 'large') {
    return 'px-6 py-3 text-base';
    }
    else if (props.size === 'small') {
    return 'px-6 py-1 text-sm';
    }
    return 'px-4 py-2';
});

const currentIcon = computed(() => {
    if (props.loading) {
    return 'refresh';
    }
    return props.icon;
})

const backgroundColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'btn btn-primary';
    case 'outline' :
        return 'bg-transparent border border-white hover:border-iv-400';
    default:
        return 'bg-white hover:bg-gray-50';
    }
});

const iconColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'text-white';
    case 'iv' :
        return 'text-iv-500';
    default:
        return 'text-iv-gray-400';
    }
});

const borderColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'border-iv-700';
    case 'iv' :
        return 'border-iv-500';
    case 'white' :
        return 'border-white';
    default:
        return 'border-iv-gray-200';
    }
})

const textColor = computed(() => {
    switch (props.color) {
    case 'primary' :
        return 'text-white';
    case 'iv' :
        return 'text-iv-500';
    case 'outline' :
        return 'text-white';
    case 'white' :
        return 'text-iv-500';
    default:
        return 'text-gray-700';
    }
});

</script>
