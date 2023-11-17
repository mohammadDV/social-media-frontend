<template>

    <div :class="{ 'has-error': hasError }">
        <label :for="identifier" class="block text-sm font-medium mb-2" v-if="label">
            {{ label }}
            <slot name="label"/>
        </label>
        <div class="relative rounded-md">
            <div :class="customClass">
                <vue-tags-input
                    :id="identifier"
                    :name="name"
                    v-model="tag"
                    :tags="tags"
                    :max-tags="max"
                    :add-on-key="addOnKey"
                    @input="changeEvent"
                    :placeholder="placeholder"
                    taggable
                    :multiple="multiple"
                    :filterable="false"
                    :noDrop="true"
                    :selectOnTab="true"
                    @tags-changed="tagsChanged"
                ></vue-tags-input>
            </div>
        </div>
        <p class="mt-2 mb-0 text-sm text-red-600" v-if="errorMessage">{{errorMessage }}</p>
    </div>
</template>

<script setup>

import { defineProps, defineEmits, ref, watchEffect } from 'vue';

import VueTagsInput from '@sipec/vue3-tags-input'
const emit = defineEmits(['update:modelValue', 'change', 'clickBefore', 'clickAfter', 'input'])

const props = defineProps({
    identifier: {
      type: String,
      default: 'identifier'
    },
    classNames: {
        type: String,
        default: ''
    },
    center: {
        type: Boolean,
        default: false,
    },
    inputType: {
        type: String,
        default: 'text'
    },
    isPrice: {
        type: Boolean,
        default: false
    },
    isVt: {
        type: Boolean,
        default: false
    },
    currencySymbol: {
        type: String,
        default: null,
    },  
    size: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    helpText: {
        type: String,
        default: '',
    },
    showSlot: {
        type: Boolean,
        default: false,
    },
    min: {
        type: Number,
    },
    value: {},
    multiple: {
        type: Boolean,
        default: false
    },
    customClass: {
        type: String,
        default: 'flex rounded'
    },
    max: {
        type: Number,
        default: 9999,
    },
    addOnKey: {
        type: Array,
        default: () => ([13, ':', ';']),
    },
    placeholder: String,
    optionsDisplayValueKey: String,
    optionsValueKey: String,
    label: String,
    name: String,
    modelValue: [String, Number, Boolean, Array, Date, Object],
})

const errorMessage = ref('');
const hasError = ref(false);


const tagsChanged = (tags) => {  
    console.log(tags);
    emit('update:modelValue', tags.map(tab => tab.text));
}
const changeEvent = function (tabs) {
    console.log(tabs);
    // emit('update:modelValue', tabs.map(tab => tab.text));
    // emit('change', event);
}


const tag= ref('');
const tags = ref([]);

watchEffect(() => tags.value = props.modelValue);
watchEffect(() => emit('update:modelValue', tags.value));


</script>

<style>

.ti-input {
    border-radius: 0.25rem;
    width: 100%;
}
.vue-tags-input {
    width: 100%;
    max-width: unset !important;
}
</style>

