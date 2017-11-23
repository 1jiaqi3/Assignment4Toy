<template>
  <div class="mb-content-item">
    <div class="mb-flex-container">
      <div class="mb-flex-item">
        <div>Title</div>
        <div>{{title}}</div>
      </div>
      <div class="mb-flex-item">
        <div>Author</div>
        <div>{{author}}</div>
      </div>
      <div class="mb-flex-item">
        <div>Status</div>
        <div>{{status}}</div>
      </div>
      <div class="mb-flex-item lentTo">
        <div>Lent to</div>
        <div>{{lento}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const AVAILABLE = 'Available'
  const LENT = 'Lent'
  export default {
    props: {
      title: String,
      author: String
    },
    data() {
      return {
        status: AVAILABLE,
        lento: ''
      }
    }
  }
</script>

<style rel="stylesheet">
  .mb-content-item {
    margin: 20px 0;
    width: 100%;
    border: 1px solid;
  }
  .mb-flex-container {
    display: flex;
  }
  .mb-flex-item {
    margin: 10px 30px;
    flex: 1;
  }
  .mb-flex-item div {
    margin: 10px 0;
  }
  .mb-flex-item.lentTo {
    flex: 2;
  }
</style>
