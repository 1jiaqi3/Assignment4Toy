<template>
  <div>
    <v-app class="sr-main">
      <div class="sr-header">
        <div class="sr-headerItem">
          <button class="astext" @click="toAccount">
            <h2>Account</h2>
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

      <div class="sr-content">
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
      </div>
    </v-app>

  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        searchStr: '',
        books: [],
        reqSuccess: ''
      }
    },
    methods: {
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
        var firebase = require('firebase')
        var firebaseApp = require('../../fireconfig.js')
        var currentUserEmail
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            user.providerData.forEach(function (profile) {
              console.log('Sign-in provider: ' + profile.providerId)
              console.log('  Provider-specific UID: ' + profile.uid)
              console.log('  Name: ' + profile.displayName)
              console.log('  Email: ' + profile.email)
              console.log('  Photo URL: ' + profile.photoURL)
              currentUserEmail = profile.email
            })
          } else {
            // this.$router.push('/login')
          }
        })
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
  .sr-content {
    margin: 20px 0;
  }
  .sr-listingContainer {
    display: flex;
    width: 100%;
    flex-direction: row;
  }
  .sr-listItem {
    margin: auto;
  }
  .astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
  }
</style>
