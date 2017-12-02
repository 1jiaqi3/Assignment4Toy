<template>
  <div>
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
    <hr>
    <div class="ac-content">
      <div class="ac-content-container">
        <img src="../../assets/pika.jpg" style="width: 30%" class="ac-content-item"></img>
        <div class="ac-content-item">
          <form>
            <div class="ac-flex-container">
              <div class="ac-flex-item">
                <div>First Name</div>
                <h2>{{first_name}}</h2>
              </div>
              <div class="ac-flex-item">
                <div>Last Name</div>
                <h2>{{last_name}}</h2>
              </div>
              <p>{{message}}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div>
      <div class="ac-btn">
        <v-btn
          class="blue lighten-2 mt-5"
          dark
          large
          @click="goSearch"
        >
          Find a Book!
        </v-btn>
      </div>
      <div class="ac-btn">
        <v-btn
          class="red lighten-2 mt-5"
          dark
          large
          @click="logOut"
        >
          Log Out!
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        first_name: '',
        last_name: '',
        message: ''
      }
    },
    created() {
      this.$http.post('/v1/account', {
        email: localStorage.getItem('email')
      }).then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.first_name = res.first_name
          this.last_name = res.last_name
        }
      })
    },
    methods: {
      submitForm() {
        this.$http.post('/updateuserinfo', {
          first_name: this.first_name,
          last_name: this.last_name
        }).then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.message = 'Successfully Updated!'
          }
        })
      },
      goSearch() {
        this.$router.push('/search')
      },
      logOut() {
        /*
        localStorage.setItem('status', false)
        localStorage.setItem('id', '')
        localStorage.setItem('email', '')
        */
        var firebase = require('firebase')
        var firebaseApp = require('../../fireconfig.js')
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            firebase.auth().signOut().then(function() {
              // Sign-out successful.
            }).catch(function(error) {
              console.log(error.message)
            })
          } else {
          }
        })
        this.$router.push('/')
      }
    }
  }
</script>

<style rel="stylesheet">
  .ac-content{
    width: 80%;
    padding: 30px 20px;
    margin: auto;
  }
  .ac-content-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .ac-content-item {
    margin: auto;
  }
  .ac-flex-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .ac-flex-item {
    margin: 10px auto;
  }
  .ac-btn {
    display: inline-block;
    margin: 30px;
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
