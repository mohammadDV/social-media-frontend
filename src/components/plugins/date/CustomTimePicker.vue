<template>
    <date-picker v-model="time" type="time" ></date-picker>
</template>
   
  <script>
    import DatePicker from 'vue3-persian-datetime-picker'
    export default {
      data(){
        return {
          time: ''
        }
      },
      components: { DatePicker }
    }
  </script>