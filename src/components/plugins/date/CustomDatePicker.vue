<template>
    <date-picker 
    v-model="date"
    :type="type"
    format="YYYY-MM-DD HH:mm:ss"
    display-format="HH:mm | dddd jDD jMMMM jYYYY"
    >
    
    </date-picker>
</template>
   
  <script setup>

    import DatePicker from 'vue3-persian-datetime-picker'
    import { ref, defineProps } from 'vue';

    defineProps ({
      type: {
        type: String,
        default: 'date'
      }
    });

    const date = ref('');
  </script>