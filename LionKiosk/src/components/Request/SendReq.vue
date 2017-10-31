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
      <div class="rq-flex-item">
        <div>Status</div>
        <div>{{status}}</div>
      </div>
      <div class="rq-flex-item owner">
        <div>Owner</div>
        <div>{{owner}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const APPROVE = 'Approve'
  const PENDING = 'Pending'
  export default {
    props: {
      title: String,
      author: String,
      owner: String
    },
    data() {
      return {
        status: PENDING
      }
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
  .rq-flex-item.owner {
    flex: 2;
  }
</style>
