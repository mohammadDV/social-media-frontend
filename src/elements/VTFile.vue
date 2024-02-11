<template>
    <div>
        <label :for="identifier" class="p-1 block text-sm font-medium mb-1" v-if="label?.length > 0">
            {{ label }}<slot name="label"/>
        </label>
        <div class="relative rounded-md" style="direction: ltr;">
            <div class="flex">
                <div class="inline-flex items-center flex-grow">
                    <div class="relative block w-full">
                        <input type="file" ref="inputElement" style="display: none;" :multiple="multiple" @change="changeEvent($event)" />
                        <input
                            type="text"
                            :disabled="true"
                            :value="filename"
                            :placeholder="placeholder"
                            :class="styles"/>
                        <div class="absolute inset-y-0 -right-0 pr-3 flex items-center pointer-events-none" v-if="hasError">
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
                    class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-iv-gray-200 bg-gray-50 text-gray-500 sm:text-sm cursor-pointer"
                    @click="browseFile">
                  {{ button }}
                </span>
            </div>
        </div>
        <p class="mt-2 mb-0 text-sm text-gray-500" v-if="!errorMessage && helpText">{{ helpText }}</p>
        <!-- <IVError :message="errorMessage"></IVError> -->
    </div>
</template>

<script>

import { useAuthStore } from '@/stores/auth.ts';
import axios from "axios";
export default {
    name: "VTFile",
    computed: {
        styles() {
            return {
                'block w-full focus:outline-none sm:text-sm  py-3.5': true,
                'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 pr-10': this.hasError,
                'focus:ring-iv-500 focus:border-iv-500 border-iv-gray-200': !this.hasError,
                'rounded-l-md': true,
                'text-center': this.center,
            };
        },
        showProgressBar() {
            return this.isUploading || this.progress > 0;
        },
    },
    data() {
        return {
            isUploading: false,
            progress: 0,
            type: 'input:file',
            filename: '',
        }
    },
    props: {
        name: {
            type: String,
        },
        label: {
            type: String,
        },
        button: {
            type: String,
            default: 'Choose file'
        },
        multiple: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        browseFile() {
            this.$refs.inputElement.click()
        },
        changeEvent: function(event) {

            // set filename
            this.filename = event.target.files.length > 0 ? event.target.files[0].name : '';

            // emit the change event
            this.$emit('change', event);

            // make sure the progress is set to 0
            this.progress = 0;
            // start the upload
            this.$emit('on-upload-start');
            this.isUploading = true;

            // upload the file and emit the change event
            this.uploadFile()
                .then((result) => {
                    // mark the upload as done
                    if (result.data.status) {
                        this.uploadDone(event, result.data.url);
                    }
                }).catch(() => {
                // mark the upload as done
                this.uploadDone(event);
            });
        },
        uploadFile() {
            // get the file
            let file = this.file();

            let formData = new FormData();
            formData.append(this.name, file);

            // upload the file and return the file upload
            return axios.post('/api/upload-' + this.name, formData, {
                    headers: { 
                        Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : undefined,
                        'Content-Type': 'multipart/form-data' 
                    },
                    onUploadProgress: function(progressEvent) {
                        this.progress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                    }.bind(this)
                }
            );
        },
        file() {
            // get the file upload component
            let fileInputField = this.$refs.inputElement

            // if no files are given, return null
            if (fileInputField.files.length == 0) {
                return null;
            }

            // return the file
            return fileInputField.files[0];
        },
        uploadDone(event, url) {

            // emit the upload end event
            this.$emit('getFileLink', url);

            // set the uploading value to false
            this.isUploading = false;

            // reset the file input value
            this.$emit('input', null);
        }
    },
}
</script>
