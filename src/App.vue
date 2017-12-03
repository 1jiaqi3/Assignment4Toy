<template>
  <div id="vapp">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'vapp'
}
</script>

<style>
  #vapp {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
  }
</style>
