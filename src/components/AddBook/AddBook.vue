<template>
  <div class="ab-main">
    <div class="ab-content">
      <form>
        <div class="ab-flex-container">
          <div class="ab-flex-item">
            <div>Book Title</div>
            <input type="text" v-model="title" class="ab-input">
          </div>
          <div class="ab-flex-item">
            <div>Author</div>
            <input type="text" v-model="author" class="ab-input">
          </div>
          <div class="ab-flex-item">
            <div>Condition</div>
            <input type="text" v-model="remarks" class="ab-input">
          </div>
        </div>
        <div class="submitButton">
          <button type="button" @click="submitForm" class="ab-button ab-submitButton">Add It!</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        title: '',
        author: '',
        remarks: ''
      }
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet">
  .ab-main {
    width: 50%;
    margin: auto;
  }
  .ab-content {
    margin: 50px 0;
    padding: 30px 20px;
    border: thin solid;
  }
  .ab-flex-container {
    display: flex;
    height: 300px;
    flex-direction: column;
    justify-content: center;
  }
  .ab-flex-item {
    height: 60px;
    width: 400px;
    margin: auto;
  }
  .ab-input {
    width: 100%;
    height: 30px;
    margin: 3px 0;
  }
  .ab-submitButton {
    text-align: center;
  }
  .ab-button {
    border-radius: 8px;
    font-size: 25px;
    height: 40px;
    width: 130px;
    margin: 10px;
  }
</style>
