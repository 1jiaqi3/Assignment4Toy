<template>
  <!--<div class="lg-main">
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
          <button type="button" @click="signIn" class="lg-submit">Google</button>
        </div>
      </form>
      <p>{{message}}</p>
    </div>
  </div>-->
  <div>
    <v-app light>
      <main>
        <v-content>
          <section>
            <v-parallax :src="require('../../assets/book2.png')" height="1200">
              <v-layout
                column
                align-center
                justify-center
                class="black--text"
              >
                <h1 class="black--text mb-2 display-1 text-xs-center">Lion Books!</h1>
                <div class="subheading mb-3 text-xs-center">A platform for trading used books</div>
                <v-btn
                  class="blue lighten-2 mt-5"
                  dark
                  large
                  @click="signIn"
                >
                  Get Started with Google
                </v-btn>
              </v-layout>
            </v-parallax>
          </section>
        </v-content>
      </main>
    </v-app>
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
      signIn() {
        var user
        var firebase = require('firebase')
        var firebaseApp = require('../../fireconfig.js')
        var provider = new firebase.auth.GoogleAuthProvider()
       provider.setCustomParameters({
          hd: 'columbia.edu'
         })
        firebase.auth().signInWithPopup(provider).then((result) => {
          var token = result.credential.accessToken
          // The signed-in user info.
          user = result.user
          console.log(user)
          console.log(token)
          var emailcomps = (user.email).split('@')
          if (emailcomps[1] !== 'columbia.edu') {
            this.message = 'Please use @columbia.edu email'
          } else {
            this.$http.post('/v1/googlelogin', {name: user.displayName, email: user.email}).then((response) => {
              response = response.body
              console.log(response)
              if (response.errno === 0) {
                localStorage.setItem('status', true)
                localStorage.setItem('id', response.id)
                localStorage.setItem('email', response.email)
                console.log('Fucking here')
                this.$router.push('/search')
              }
            })
          }
        }).catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          var email = error.email
          var credential = error.credential
          console.log(errorMessage)
        })
      }
      /*
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
      */
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
