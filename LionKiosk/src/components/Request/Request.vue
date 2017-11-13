<template>
  <div class="rq-main">
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
    <div class="rq-content">
      <div class="rq-content-container">

        <div class="rq-sub-container rq-sub-container-left" v-for="req in sentReqs">
          <h2>Sent</h2>
          <send-req :title="''" :author="''"></send-req>
        </div>

        <div class="rq-sub-container" v-for="req in recvReqs">
          <h2>Received</h2>
          <rcv-req :title="''" :author="''"></rcv-req>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import RcvReq from './RcvReq.vue'
  import SendReq from './SendReq.vue'
  export default {
    data() {
      return {
        recvReqs: [],
        sentReqs: []
      }
    },
    created() {
      this.$http.post('/v1/getreqs', {
        email: localStorage.getItem('email')
      }).then(response => {
        response = response.body
        this.recvReqs = response.reqs
      })
    },
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
