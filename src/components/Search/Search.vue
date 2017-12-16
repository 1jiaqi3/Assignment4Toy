<template>
  <div>
    <v-app class="sr-main">
      <div class="sr-header">
        <div class="sr-headerItem">
          <button class="astext" @click="toAccount">
            <h2>Account{{unread}}</h2>
          </button>
        </div>
      </div>
      <div class="sr-title">
        <h1>Lion Books!</h1>
        <div>Borrow/buy second-hand book from your peer or trade in your books in a snap.</div>
      </div>
      <v-form>
        <v-text-field
          label="Search"
          v-model="searchStr"
          :counter="100"
          class="sr-field"
          v-on:keyup="enterHandler"
        ></v-text-field>
        <v-btn
          class="blue lighten-2 mt-5"
          dark
          large
          @click="submitForm"
          type="button"
        >
          Search
        </v-btn>
      </v-form>

      <!--<div class="sr-content">
        <div class="sr-listingContainer" v-for="book in books">
          <div class="sr-listItem">
            <img src="../../assets/pikapika.jpg">
            <h1>{{book.title}}</h1>
            <div>
              <button @click="requestBook(book._id, book.listed_by)">Request</button>
            </div>
            <p>{{reqSuccess}}</p>
          </div>
        </div>
      </div>-->
      <v-layout v-for="book in books">
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-media :src="require('../../assets/book2.png')" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{book.title}}</h3>
                <div>By {{book.author}}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" @click="requestBook(book._id, book.listed_by)">Request</v-btn>
              <p>{{reqSuccess}}</p>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    beforeCreate() {
      this.$http.post('/v1/getUnread', {
        email: localStorage.getItem('email')
      }).then(response => {
        response = response.body
        if (response.unread > 0) {
          this.unread = '(' + response.unread + ')'
        }
      })
    },
    data() {
      return {
        searchStr: '',
        books: [],
        reqSuccess: '',
        unread: ''
      }
    },
    methods: {
      enterHandler(event) {
        console.log(event.key)
        if (event.key === 'Enter') {
          this.submitForm()
        }
      },
      submitForm() {
        this.$http.post('/v1/search', {
          titleOrAuthor: this.searchStr
        }).then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.books = response.books
            console.log(this.books)
          }
        }, response => {
          this.message = 'Wrong search'
        })
      },
      toAccount() {
        this.$router.push('/account')
      },
      requestBook(bid, listedBy) {
        var userEmail = localStorage.getItem('email')
        if (userEmail === '1') {
          this.$router.push('/')
        }
        this.$http.post('/v1/sendreq', {
          bid: bid,
          from: localStorage.getItem('email'),
          // from: currentUserEmail,
          to: listedBy
        }).then(response => {
          response = response.body
          this.reqSuccess = 'Successfully Sent!!'
          let self = this
          setTimeout(function () {
            self.reqSuccess = ''
          }, 3000)
        }, response => {
          console.log(response.body)
          this.reqSuccess = 'Invalid Request!'
          let self = this
          setTimeout(function () {
            self.reqSuccess = ''
          }, 3000)
        })
      }
    }
  }
</script>

<style rel="stylesheet">
  .sr-main {
    width: 100%;
    margin: auto;
    padding: 50px;
  }
  .sr-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .sr-headerItem {
    margin: 20px;
  }
  .sr-field {
    margin: 80px 0;
  }
  .astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
  }
</style>
