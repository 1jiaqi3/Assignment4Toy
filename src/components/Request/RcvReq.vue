<template>
  <div class="rq-subcontent-item">
    <div class="rq-flex-container">
      <div class="rq-flex-item">
        <div>Title</div>
        <div>{{book.title}}</div>
      </div>
      <div class="rq-flex-item">
        <div>Author</div>
        <div>{{book.author}}</div>
      </div>
      <div class="rq-flex-item sender">
        <div>Sender</div>
        <div>{{sender.email}}</div>
      </div>
      <div class="rq-flex-item" v-if="!approved">
        <button class="rq-button" @click="approve()">Approve</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      book: Object,
      sender: Object,
      req_id: String
    },
    data() {
      return {
        approved: false
      }
    },
    methods: {
      approve() {
        console.log(this.sender)
        this.$http.post('/v1/acceptreq', {
          req_id: this.req_id,
          bid: this.book._id,
          uid: this.sender._id
        }).then(response => {
          this.approved = true
        }, response => {
          console.log(response)
        })
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
  .rq-flex-item.sender {
    flex: 2;
  }
  .rq-button {
    margin-top: 15px;
  }
</style>
