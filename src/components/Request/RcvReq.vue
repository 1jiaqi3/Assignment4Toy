<template>
  <!--<div class="rq-subcontent-item">
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
  </div>-->
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="teal" class="white--text">
          <div class="bk-text">
            <v-card-text class="px-0">Title</v-card-text>
            <v-card-text class="px-0">{{book.title}}</v-card-text>
          </div>
          <div class="bk-text">
            <v-card-text class="px-0">Author</v-card-text>
            <v-card-text class="px-0">{{book.author}}</v-card-text>
          </div>
          <div class="bk-text">
            <v-card-text class="px-0">Sender</v-card-text>
            <v-card-text class="px-0">{{sender.email}}</v-card-text>
          </div>
          <v-card-actions v-if="String(req.status) !== 'approved'">
            <v-btn flat color="yellow" @click="approve()" style="margin: auto">Approve</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        req: Object
      }
    },
    created() {
      this.$http.post('/v1/getreq', {
        rid: this.req_id
      }).then(response => {
        this.req = response.body
        console.log(this.req)
      })
    },
    methods: {
      approve() {
        console.log(this.sender)
        this.$http.post('/v1/acceptreq', {
          req_id: this.req_id,
          bid: this.book._id,
          uid: this.sender._id
        }).then(response => {
          this.req.status = 'approved'
        }, response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style rel="stylesheet">
  .bk-text {
    display: inline-block;
    margin: 0 20px 0 20px;
  }
</style>
