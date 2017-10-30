<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import account from './components/Account/account.vue'

export default {
  name: 'app',
  components: {
    account
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  .menu-container {
    display: flex;
    flex-direction: row;
  }
  .menu-item {
    margin: 5px 20px;
  }
  .item {
    text-decoration: none;
  }
</style>
