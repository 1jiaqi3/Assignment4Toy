<template>
  <div class="lg-main">
    <div class="lg-title">
      <h1>Lion Books!</h1>
      <h3>A platform for trading used books</h3>
    </div>
    <div class="lg-content">
      <form>
        <div class="lg-flex-container">
          <div class="lg-flex-item">
            <div>Email</div>
            <input v-model="email" class="lg-input"/>
          </div>
          <div class="lg-flex-item">
            <div>Password</div>
            <input type="password" v-model="password" class="lg-input"/>
          </div>
        </div>
        <div class="lg-submit-button">
          <button type="button" @click="submitForm" class="lg-submit">Log In</button>
        </div>
        <div class="lg-submit-button">
          <button type="button" @click="onSuccess" class="lg-submit">Google</button>
        </div>
      </form>
      <p>{{message}}</p>
    </div>
  </div>
</template>




<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        email: '',
        password: '',
        message: ''
      }
    },
    methods: {
      onSuccess() {
        var user
        var firebase = require('firebase/app')
        require('firebase/auth')
        require('firebase/database')

        var config = {
          apiKey: 'AIzaSyAbnWoOY5MpD7U0kVH9R0gGjj8LdSMPjEY',
          authDomain: 'team-sprite-project.firebaseapp.com',
          databaseURL: 'https://team-sprite-project.firebaseio.com',
          projectId: 'team-sprite-project',
          storageBucket: '',
          messagingSenderId: '716422527835'
        }
        firebase.initializeApp(config)

        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken
          // The signed-in user info.
          user = result.user
          console.log(user.email)
          this.$http.post('/v1/googlelogin', {name: user.displayName, email: user.email}).then((response) => {
            response = response.body
            if (response.errno === ERR_OK) {
              localStorage.setItem('status', true)
              localStorage.setItem('id', response.id)
              localStorage.setItem('email', response.email)
              this.$router.push('/search')
            }
          })
          // ...
        }).catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          var email = error.email
          var credential = error.credential
          console.log(errorMessage)
        })
      },
      submitForm() {
        this.$http.post('/v1/login', {
          email: this.email,
          password: this.password
        }).then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            localStorage.setItem('status', true)
            localStorage.setItem('id', response.id)
            localStorage.setItem('email', this.email)
            this.$router.push('/search')
          }
        }, response => {
          this.message = 'Wrong combination of email and password!'
        })
      }
    }
  }
</script>

<style rel="stylesheet">
  .lg-main {
    width: 50%;
    margin: auto;
  }
  .lg-title {
    text-align: center;
  }
  .lg-content {
    padding: 30px 20px;
    border: thin solid;
  }
  .lg-flex-container {
    display: flex;
    height: 150px;
    flex-direction: column;
    justify-content: center;
  }
  .lg-flex-item {
    height: 60px;
    width: 400px;
    margin: auto;
  }
  .lg-input {
    width: 100%;
    height: 30px;
    margin: 3px 0;
  }
  .lg-submit-button {
    text-align: center;
  }
  .lg-submit {
    border-radius: 8px;
    font-size: 25px;
    height: 40px;
    width: 130px;
    margin: 10px;
  }
</style>
