<template>
  <div class="rq-subcontent-item">
    <div class="rq-flex-container">
      <div class="rq-flex-item">
        <div>Title</div>
        <div>{{title}}</div>
      </div>
      <div class="rq-flex-item">
        <div>Author</div>
        <div>{{author}}</div>
      </div>
      <div class="rq-flex-item sender">
        <div>Sender</div>
        <div>{{sender}}</div>
      </div>
      <div class="rq-flex-item">
        <button class="rq-button">Approve</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String,
      author: String,
      sender: String
    }
  }
</script>

<style rel="stylesheet">
  .rq-subcontent-item {
    margin: 20px auto;
    width: 90%;
    padding: 10px 20px;
    border: 1px solid;
  }
  .rq-flex-container {
    display: flex;
  }
  .rq-flex-item {
    flex: 1;
  }
  .flexItem div {
    margin: 10px 0;
  }
  .rq-flex-item.sender {
    flex: 2;
  }
  .rq-button {
    font-size: 20px;
    padding: 5px 20px;
    background-color: white;
    margin-top: 15px;
  }
</style>
