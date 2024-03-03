<script setup>
import HeaderComponent from '@/components/site/include/HeaderComponent'
import FooterComponent from '@/components/site/include/FooterComponent'

</script>

<template>
  <div>
      <HeaderComponent/>
      <router-view></router-view>
      <FooterComponent/>
  </div>
</template>





