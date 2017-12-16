<template>
  <v-app class="mb-main">
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
    <div class="mb-content">
      <div class="mb-content-container" v-for="book in books">
        <MyBookItem :title="book.title" :author="book.author" :status="book.status" :lento="book.lentoEmail"></MyBookItem>
      </div>
    </div>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn color="primary" dark slot="activator">Add A Book</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">New Book Info</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="title" label="Book Title" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="author" label="Author" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="remarks" label="Condition"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitForm" @click.native="dialog = false">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script type="text/ecmascript-6">
  import MyBookItem from './MyBookItem.vue'
  const ERR_OK = 0
  export default {
    data() {
      return {
        books: [],
        dialog: false,
        title: '',
        author: '',
        remarks: '',
        updated: false
      }
    },
    beforeCreate() {
      var userEmail = localStorage.getItem('email')
      if (userEmail === '1') {
        this.$router.push('/')
      }
      this.$http.post('/v1/getbooks', {
        email: localStorage.getItem('email')
      }).then((response) => {
        response = response.body
        console.log(response)
        if (response.errno === ERR_OK) {
          this.books = response.books
          for (let book of response.books) {
            if (!book.lento || book.lento.length === 0) {
              book.lentoEmail = 'N/A'
              continue
            }
            this.$http.post('/v1/getuser', {
              uid: book.lento
            }).then(responseUser => {
              responseUser = responseUser.body
              book.lentoEmail = responseUser.email
              this.books = response.books
              this.$forceUpdate()
            })
          }
        }
      }, response => {
        console.log('Wrong combination of email and password!')
      })
    },
    methods: {
      submitForm() {
        var userEmail = localStorage.getItem('email')
        if (userEmail === '1') {
          this.$router.push('/')
        }
        this.updated = false
        this.$http.post('/v1/addbook', {
          email: userEmail,
          title: this.title,
          author: this.author,
          remarks: this.remarks
        }).then((response1) => {
          response1 = response1.body
          if (response1.errno === ERR_OK) {
            this.$http.post('/v1/getbooks', {
              email: localStorage.getItem('email')
            }).then((response) => {
              response = response.body
              console.log(response)
              if (response.errno === ERR_OK) {
                this.books = response.books
                for (let book of response.books) {
                  book.lentoEmail = 'N/A'
                  this.books = response.books
                  this.$forceUpdate()
                }
              }
            }, response => {
              console.log('Wrong combination of email and password!')
            })

            this.$forceUpdate()
          }
        }, response1 => {
          this.message = 'Wrong combination of email and password!'
        })
      },
      addBook() {
        this.$router.push('/addBook')
      }
    },
    components: {
      MyBookItem
    }
  }
</script>

<style rel="stylesheet">
  .mb-content{
    width: 80%;
    padding: 30px 20px;
    margin: auto;
  }
  .mb-content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .mb-button {
    font-size: 20px;
    padding: 5px 30px;
    margin: 50px 0;
    background-color: white;
    float: right;
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
