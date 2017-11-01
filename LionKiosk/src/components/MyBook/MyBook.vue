<template>
  <div class="mb-main">
    <div class="menu-container">
      <div class="menu-item">
        <router-link to="/account" class="item">Account</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/mybook" class="item">My Books</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/request" class="item">Requests</router-link>
      </div>
    </div>
    <hr/>
    <div class="mb-content">
      <div class="mb-content-container">
        <MyBookItem :title="'temp1'" :author="'temp2'"></MyBookItem>
      </div>
      <div>
        <button class="mb-button">Add a Book!</button>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import MyBookItem from './MyBookItem.vue'
  export default {
    components: {
      MyBookItem
    }
  }
</script>

<style rel="stylesheet">
  .mb-content{
    width: 80%;
    padding: 30px 20px;
    margin: auto;
  }
  .mb-content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .mb-button {
    font-size: 20px;
    padding: 5px 30px;
    margin: 50px 0;
    background-color: white;
    float: right;
  }
</style>
