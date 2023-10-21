<script setup>

  import { defineProps, defineEmits } from 'vue';
  import CommentCardComponent from './CommentCardComponent.vue';

    const emit = defineEmits(['updateComments']);
    defineProps({
        comments: {
            type: Array,
            require: true
        },
        modelId: {
            type: Number,
            require: true
        },
        modelType: {
            type: String,
            default: 'post'
        },
        hasReply: {
            type: Boolean,
            default: true
        }
    });

    const updateComments = () => {
        emit('updateComments');
    }
    
</script>

<template>
    <div v-for="(comment, index) in comments" :key="index" class="comment">
        <CommentCardComponent @updateComments="updateComments" :comment="comment" :hasReply="hasReply" :model-id="modelId" :model-type="modelType"/>
    </div>
</template>