<template>
  <v-app class="rq-main">
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
        <div class="rq-flex-item rq-flex-item-left">
          <h2>Sent</h2>
          <div class="rq-sub-container"  v-for="req in sentReqs">
            <send-req :title="req.book.title" :author="req.book.author" :owner="String(req.status) === 'approved' ? req.email : 'Secret'" :status="req.status"></send-req>
          </div>
        </div>
        <div class="rq-flex-item">
          <h2>Received</h2>
          <div class="rq-sub-container"  v-for="req in recvReqs">
            <rcv-req :book="req.book" :sender="req.user" :req_id="req._id"></rcv-req>
          </div>
        </div>
      </div>
    </div>
  </v-app>
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
    beforeCreate() {
      var userEmail = localStorage.getItem('email')
      if (userEmail === '1') {
        this.$router.push('/')
      }
      this.$http.post('/v1/getRecvReqs', {
        email: localStorage.getItem('email')
      }).then(response => {
        response = response.body
        for (let req of response.reqs) {
          this.$http.post('/v1/getbook', {
            bid: req.bid
          }).then(responseBook => {
            responseBook = responseBook.body
            req.book = responseBook.book
            console.log('the book!!!!')
            console.log(responseBook)
            this.$http.post('/v1/getuser', {
              uid: req.from
            }).then(responseUser => {
              responseUser = responseUser.body
              console.log('the user!!!!!')
              console.log(responseUser)
              req.user = responseUser
              // console.log(req.user)
              this.recvReqs = response.reqs
              this.$forceUpdate()
            })
          })
        }
      })

      this.$http.post('/v1/getSentReqs', {
        email: localStorage.getItem('email')
      }).then(response => {
        response = response.body
        for (let req of response.reqs) {
          this.$http.post('/v1/getbook', {
            bid: req.bid
          }).then(responseBook => {
            responseBook = responseBook.body
            req.book = responseBook.book

            this.$http.post('/v1/getuser', {
              uid: req.to
            }).then(responseUser => {
              responseUser = responseUser.body
              req.email = responseUser.email
              this.sentReqs = response.reqs
              this.$forceUpdate()
              console.log(this.sentReqs)
            })
          })
        }
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
    padding: 30px 10px;
  }
  .rq-content-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .rq-flex-item {
    flex: 1
  }
  .rq-sub-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px 10px;
  }
  .rq-flex-item.rq-flex-item-left {
    border-right: 1px solid;
  }
  h2 {
    align-self: center;
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
