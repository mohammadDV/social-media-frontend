<template>
  <div id="app">
    <button v-if="!isAuthenticated" @click="login">Login</button>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script>
// import { ref } from 'vue';
// import { login, logout, getAuthStatus } from '@/services/auth';

export default {
  setup() {
    // const isAuthenticated = ref(getAuthStatus());

    // return {
    //   isAuthenticated,
    //   login: () => {
    //     login();
    //     isAuthenticated.value = getAuthStatus();
    //   },
    //   logout: () => {
    //     logout();
    //     isAuthenticated.value = getAuthStatus();
    //   },
    // };
  },
};
</script>

<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script> -->
