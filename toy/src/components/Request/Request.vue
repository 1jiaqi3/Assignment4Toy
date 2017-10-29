<template>
  <div class="rq-main">
    <hr/>
    <div class="rq-content">
      <div class="rq-content-container">
        <div class="rq-sub-container rq-sub-container-left">
          <h2>Sent</h2>
          <send-req :title="'temp1'" :author="'temp2'"></send-req>
        </div>
        <div class="rq-sub-container">
          <h2>Received</h2>
          <rcv-req :title="'temp1'" :author="'temp2'"></rcv-req>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import RcvReq from './RcvReq.vue'
  import SendReq from './SendReq.vue'
  export default {
    components: {
      RcvReq,
      SendReq
    }
  }
</script>

<style rel="stylesheet">
  .rq-content{
    width: 90%;
    margin: auto;
    padding: 30px 20px;
  }
  .rq-content-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .rq-sub-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px 10px;
  }
  .rq-sub-container.rq-sub-container-left {
    border-right: 1px solid;
  }
  h2 {
    align-self: center;
  }
</style>
