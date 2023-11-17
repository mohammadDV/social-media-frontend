<template>
    <div>
        <label :data-intercom-target="labelDataIntercomTarget" :for="identifier" class="block text-sm font-medium mb-3" v-if="label">
            {{ label }}
            <slot name="label"/>
        </label>
        <div class="relative rounded-md">
            <div class="flex">
        <span
            :class="{'inline-flex flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm': true, 'cursor-pointer': inputType === 'increase'}"
            v-show="hasBeforeSlot"
            @click="emit('clickBefore')">
          <slot name="before"/>
        </span>
                <div class="inline-flex items-center flex-grow">
                    <div class="relative block w-full">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none py-2"
                             v-if="currencySymbol">
                            <span class="text-gray-500 sm:text-sm">{{ currencySymbol }}</span>
                        </div>
                        <input ref="inputElement" :type="inputType === 'increase' ? 'text' : inputType" :disabled="disabled" :id="identifier"
                               :name="name"
                               :min="min"
                               :max="max"
                               :step="step"
                               :value="modelValue"
                               :data-intercom-target="dataIntercomTarget"
                               v-on:input="emit('input', $event.target.value)"
                               @change="changeEvent($event)"
                               :placeholder="placeholder" :autocomplete="autocomplete"
                               :inputmode="inputType === 'number' ? 'decimal' : 'text'"
                               :class="styles"/>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="hasError">
                            <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor"
                                 aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <span
                    :class="{'inline-flex flex items-center justify-center items-center px-3 rounded-r-md border border-l-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm': true, 'cursor-pointer': inputType === 'increase'}"
                    v-show="hasDefaultSlot"
                    @click="emit('clickAfter')">
          <slot/>
        </span>
            </div>
        </div>
        <p class="mt-2 mb-0 text-sm text-gray-500" v-if="!errorMessage && helpText">{{ helpText }}</p>
        <p class="mt-2 mb-0 text-sm text-red-600" v-if="errorMessage">{{errorMessage }}</p>
    </div>
</template>

<script setup>

import {useApi} from '@/utils/api.ts';
import { defineProps, computed, defineEmits, ref } from 'vue';

const emit = defineEmits(['update:modelValue', 'change', 'clickBefore', 'clickAfter', 'input'])

const props = defineProps({
    identifier: {
      type: String,
      default: 'identifier'
    },
    requestName: {
      type: String,
      default: ''
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
    max: {
        type: Number,
    },
    placeholder: String,
    optionsDisplayValueKey: String,
    optionsValueKey: String,
    label: String,
    name: String,
    modelValue: [String, Number, Boolean, Array, Date, Object],
})

// const failureMessage = ref('')
const errorMessage = ref('');
const hasError = ref(false);


const changeEvent = function (event) {

    validate(event.target.value);
    emit('update:modelValue', event.target.value);
    emit('change', event);
}

const validate = (value) => {
            // if the request name is not set, return out
        if (!props.requestName) {
            return;
        }

        let data = {};
        data['field'] = props.name;
        data[props.name] = value;

        // validate the field
        useApi().post(`/api/validation/${props.requestName}`, data)
            .then(response => {
                if (response.data.status) {
                    hasError.value = true;
                    errorMessage.value = response.data.message;
                } else {
                    hasError.value = false;
                    errorMessage.value = '';
                }
            }).catch(() => {
                hasError.value = false;
                errorMessage.value = '';
            });
    }

const styles = computed(() => {
    return {
        'form-control is-vt': props.isVt,
        'block w-full focus:outline-none sm:text-sm py-3.5 p-2': true,
        'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 pr-10': hasError.value,
        'focus:ring-iv-500 focus:border-iv-500 border-iv-gray-200': !hasError.value,
        'pl-7': props.currencySymbol,
        'cursor-not-allowed bg-gray-50': props.disabled && props.inputType !== 'increase',
        'text-center': props.center,
    };
})

</script>
