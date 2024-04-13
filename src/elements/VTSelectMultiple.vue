<template>
    <div :class="{ 'has-error': hasError }" v-click-outside="hideList">
        <label :for="identifier" class="block text-sm font-medium mb-3" v-if="label">{{ label }}
            <slot name="label"/>
        </label>

        <div class="relative float-left w-full">
            <div
                :class="{'absolute z-10 sm:text-sm pl-3 pr-10 py-3.5 pointer-events-none': true}"
                v-show="autocomplete && !showList">{{ preview }}
            </div>
            <div :class="{'relative flex items-center justify-center px-2 text-gray-500 cursor-pointer z-10': true}"
                 v-if="selectedOptions > 0">
                <span
                    :class="{'absolute right-0 top-0 rounded-full items-center text-center w-5 h-5 text-sm font-medium  ring-2  -mt-2 -mr-2': true,
                    'ring-white bg-gray-600 text-white': !small,
                    'ring-intellivy-700 text-intellivy-700 bg-intellivy-100': small,
                }">
                    {{ selectedOptions }}
                </span>
            </div>
            <input v-model="autocompleteFilter"
                   @focus="toggleList"
                   @blur="hideListWhenEmpty"
                   v-show="autocomplete"
                   :class="{'relative w-full bg-white border border-gray-900 rounded-md pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm': true,
                    'py-3.5': !small,
                    'py-1': small,
                'cursor-not-allowed bg-gray-50': this.disabled}"/>
            <button type="button"
                    @click="toggleList"
                    v-show="!autocomplete"
                    :class="{'form-control-select w-full border border-gray-00 rounded-md px-3 text-left cursor-default p-2 sm:text-sm': true,
                    'py-3.5 relative': !small,
                     'border-intellivy-600 bg-intellivy-700 text-white': selectedOptions > 0 && small,
                    'py-1 pl-1 flex': small,
                'cursor-not-allowed bg-gray-50': this.disabled, 'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500' : !this.disabled}"
                    aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span :class="{
                    'w-full inline-flex truncate p-1': true,

                }">
                    <span class="mr-2 flex items-center text-xs" v-if="small && icon !== ''">
                       <i :class="icon"></i>
                    </span>
                    <span :class="{
                        'truncate flex': true,
                    }"> {{ preview }}</span>
                </span>
            </button>
            <span
                v-if="!small"
                :class="{'absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none': true, 'h-12': !small, 'h-9': small}">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                </svg>
            </span>
            <transition
                enter-active-class=""
                enter-class=""
                enter-to-class=""
                leave-active-class="transition ease-in duration-100"
                leave-class="opacity-100"
                leave-to-class="opacity-0">
                <ul v-show="showList || open"
                    :class="{'absolute  shadow-lg' : !open && !fullHeight, 'border': open, 'z-20 mt-1 w-full bg-white border rounded-md py-1 text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm' : true}"
                    tabindex="-1" role="listbox" aria-labelledby="listbox-label">
                    <li :class="{'group text-gray-900 cursor-default select-none relative pl-3 pr-9 hover:text-gray-900 hover:bg-gray-100': true, 'py-2' : !small, 'py-1': small}"
                        v-for="(option, index) in filteredOptions" :key="index"
                        :value="optionsValueKey ? String(option[optionsValueKey]) : String(option)"
                        @click.prevent="toggleOption(optionsValueKey ? option[optionsValueKey] : option, index)"
                        @mouseenter="mouseEnter(option)"
                        @mouseleave="mouseLeave(option)"
                        id="listbox-option-0"
                        role="option">
                        <div class="flex">
                            <span
                                :class="{'font-normal' : !isSelected(option), 'font-semibold': isSelected(option)}"
                                v-html="getOptionLabel(option, true, mouseover.indexOf(option.id) > -1)">
                            </span>
                        </div>
                        <span
                            :class="{'text-intellivy-600 absolute inset-y-0 right-0 flex items-center pr-4 group-hover:text-white': true}"
                            v-if="isSelected(option)">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
          </span>
                    </li>
                </ul>
            </transition>
        </div>
        <IVError :message="errorMessage"></IVError>
    </div>
</template>

<script>

export default {
    name: "IVSelectMultiple",
    expose: ['validate'],
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: '',
        },
        fullHeight: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Object,
        },
        autocomplete: {
            type: Boolean,
            default: false,
        },
        search: {
            type: String,
            default: '',
        },
        small: {
            type: Boolean,
            default: false,
        },
        showTitle: {
            type: Boolean,
            default: false,
        },
        showSelection: {
            type: Boolean,
            default: false,
        },identifier: {
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
        blur: {
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
        options: [Array, Object],
        error: {
            type: String,
            default: '',
        },
    },
    data: () => {
        return {
            showList: false,
            autocompleteFilter: '',
            mouseover: [],
        }
    },
    computed: {
        isMultiSelect() {
            return typeof this.modelValue !== 'string';
        },
        filteredOptions() {
            if (this.autocompleteFilter === '') {
                return this.options;
            }
            return this.options.filter(option => {
                return this.getOptionLabel(option, false).toLowerCase().includes(this.autocompleteFilter.toLowerCase());
            })
        },
        selectedOptions() {

            if (typeof this.modelValue === 'string') {
                return this.modelValue !== '' ? 1 : 0;
            } else {
                return this.modelValue.length ?? 0;
            }
        },
        preview() {
            let valueArray = [];
            if (typeof this.modelValue === 'string') {
                valueArray.push(this.modelValue);
            } else {
                valueArray = this.modelValue ?? '';
            }

            if (valueArray.length === 0) {
                return this.placeholder;
            }
            const selectedOptions = [];

            for (let item = 0; item < valueArray.length; item++) {
                const option = this.options.find(option => (option[this.optionsValueKey]) === valueArray[item]);
                if (typeof option !== 'undefined') {
                    selectedOptions.push(this.getOptionLabel(option, false, false));
                } else {
                    selectedOptions.push(valueArray[item]);
                }
            }

            // on default show the placeholder instead of selection
            if(!this.showSelection || selectedOptions.length === 0) {
                return this.placeholder;
            }

            if (selectedOptions.length > 1) {
                return selectedOptions.slice(0, selectedOptions.length - 1).join(', ') + ' and ' + selectedOptions[selectedOptions.length - 1];
            }
            // on default show the placeholder instead of selection
            return selectedOptions.join(', ');
        },
    },
    methods: {
        mouseEnter(option) {
            this.mouseover = [option.id];
        },
        mouseLeave() {
            this.mouseover = [];
        },
        toggleList() {
            if (this.disabled) {
                return;
            }
            this.showList = !this.showList;
            if (!this.showList) {
                this.autocompleteFilter = '';
            }
            else {
                this.$emit('onOpen');
            }
        },
        hideListWhenEmpty() {
            if (this.autocompleteFilter === '') {
                this.toggleList();
            }
        },
        isSelected(option) {
            return this.modelValue.indexOf(this.getOptionValue(option)) > -1;
        },
        toggleOption(value) {
            if (!this.isMultiSelect) {
                this.$emit('update:modelValue', value);
                this.$emit('change', value);
                this.autocompleteFilter = '';
                this.showList = false;
            } else {
                const selected = [...this.modelValue];
                const index = this.modelValue.indexOf(value);
                if (index > -1) {
                    selected.splice(index, 1);
                } else {
                    selected.push(value);
                }
                this.$emit('update:modelValue', selected);
                this.$emit('change', selected);
            }
        },
        hideList() {
            this.showList = false;
        },
        getOptionValue(option) {
            return this.optionsValueKey && option[this.optionsValueKey] ? option[this.optionsValueKey] : option;
        },
        getOptionLabel(option, highlight, active) {
            const optionLabel = this.optionsDisplayValueKey && option[this.optionsDisplayValueKey] ? option[this.optionsDisplayValueKey] : option;

            if (!highlight || this.search === '') {
                return optionLabel;
            }

            const match = optionLabel.match(new RegExp(this.search, "ig")) ?? [];
            if (match.length > 0) {
                return optionLabel.replace(new RegExp(match[0], "ig"), '<span class="' + (active ? 'bg-white text-gray-700' : 'bg-yellow-300') + '">' + match[0] + '</span>')
            }
            return optionLabel;
        }
    }
}
</script>
