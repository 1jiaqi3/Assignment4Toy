<template>
  <div class="sr-main">
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
    <form class="sr-search">
      <input v-model="searchStr" class="sr-input">
      <button type="button" @click="submitForm" class="sr-button">Search</button>
    </form>
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
        this.$http.post('/v1/sendreq', {
          bid: bid,
          from: localStorage.getItem('email'),
          to: listedBy
        }).then(response => {
          response = response.body
          this.reqSuccess = 'Successfully Sent!!'
          let self = this
          setTimeout(function () {
            self.reqSuccess = ''
          }, 3000)
        }, response => {
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
    width: 90%;
    margin: auto;
    padding: 20px;
  }
  .sr-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .sr-headerItem {
    margin: 20px;
  }
  .sr-search {
    margin: 40px 0;
  }
  .sr-input {
    width: 800px;
    height: 35px;
  }
  .sr-button {
    border-radius: 8px;
    font-size: 25px;
    height: 35px;
    width: 130px;
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
