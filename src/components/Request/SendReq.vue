<template>
  <!--<div class="rq-subcontent-item">
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
  </div>-->
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary" class="white--text">
          <div class="bk-text">
            <v-card-text class="px-0">Title</v-card-text>
            <v-card-text class="px-0">{{title}}</v-card-text>
          </div>
          <div class="bk-text">
            <v-card-text class="px-0">Author</v-card-text>
            <v-card-text class="px-0">{{author}}</v-card-text>
          </div>
          <div class="bk-text">
            <v-card-text class="px-0">Status</v-card-text>
            <v-card-text class="px-0">{{status}}</v-card-text>
          </div>
          <div class="bk-text">
            <v-card-text class="px-0">Owner</v-card-text>
            <v-card-text class="px-0">{{owner}}</v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/ecmascript-6">
  const APPROVE = 'Approve'
  const PENDING = 'Pending'
  export default {
    props: {
      title: String,
      author: String,
      owner: String,
      status: String
    }
  }
</script>

<style rel="stylesheet">
  .bk-text {
    display: inline-block;
    margin: 0 20px 0 20px;
  }
</style>
