<template>
    <div>
        <label :for="identifier" class="p-1 block text-sm font-medium mb-1" v-if="label?.length > 0">
            {{ label }}
            <slot name="label"/>
        </label>
        <select
            :id="identifier"
            :name="name"
            :value="modelValue"
            @change="changeEvent($event)"
            :disabled="disabled"
            :class="styles"
        >
            <option v-if="placeholder" value="" disabled selected>
                {{ placeholder }}
            </option>
            <option v-for="(option, index) in options" :key="index"
                :value="optionsValueKey ? String(option[optionsValueKey]) : String(option)"
                :selected="(optionsValueKey ? String(option[optionsValueKey]) : String(option)) === modelValue">
                {{ optionsDisplayValueKey ? option[optionsDisplayValueKey] : option }}
            </option>
        </select>
    </div>
</template>

<script setup>

import { defineProps, computed, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
    identifier: {
      type: String,
      default: 'identifier'
    },
    options: {
      required: true,
      type: Array,
    },    
    size: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    placeholder: String,
    optionsDisplayValueKey: String,
    optionsValueKey: String,
    label: String,
    name: String,
    modelValue: [String, Number, Boolean, Array, Date, Object],
})


const changeEvent = function (event) {
    emit('update:modelValue', event.target.value);
    emit('change', event);
}

const styles = computed(() => {
    return {
        'form-control-select p-2 block w-full pl-3 pr-10 text-base focus:ring-iv-500 focus:border-iv-500 border-iv-gray-200 sm:text-sm rounded-md': true,
        'py-3.5': props.size === '',
        'cursor-not-allowed bg-gray-50': props.disabled,
    };
})

</script>
