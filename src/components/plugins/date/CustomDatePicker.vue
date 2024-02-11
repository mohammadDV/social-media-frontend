<template>
    <date-picker 
    v-model="date"
    format="YYYY-MM-DD HH:mm:ss"
    display-format="dddd jDD jMMMM jYYYY"
    >
    
    </date-picker>
</template>
   
  <script>
    import DatePicker from 'vue3-persian-datetime-picker'
    export default {
      data(){
        return {
          date: ''
        }
      },
      components: { DatePicker }
    }
  </script>