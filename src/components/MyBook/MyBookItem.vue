<template>

  <!--<div class="mb-content-item">
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
  </div>-->
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card dark color="primary" class="white--text">
            <div class="bk-text">
              <v-card-text class="headline">Title</v-card-text>
              <v-card-text class="px-0">{{title}}</v-card-text>
            </div>
            <div class="bk-text">
              <v-card-text class="headline">Author</v-card-text>
              <v-card-text class="px-0">{{author}}</v-card-text>
            </div>
            <div class="bk-text">
              <v-card-text class="headline">Status</v-card-text>
              <v-card-text class="px-0">{{status}}</v-card-text>
            </div>
            <div class="bk-text">
              <v-card-text class="headline">Lent to</v-card-text>
              <v-card-text class="px-0">{{lento}}</v-card-text>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script type="text/ecmascript-6">
  const AVAILABLE = 'Available'
  const LENT = 'Lent'
  export default {
    props: {
      title: String,
      author: String,
      status: String,
      lento: String
    }
  }
</script>

<style rel="stylesheet">
  .bk-text {
    display: inline-block;
    margin: 0 90px 0 90px;
  }
</style>
