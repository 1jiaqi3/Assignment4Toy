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
            <input v-model="email"/>
          </div>
          <div class="lg-flex-item">
            <div>Password</div>
            <input type="password" v-model="password">
          </div>
        </div>
        <div class="lg-submit-button">
          <button type="button" @click="submitForm">Log In</button>
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
      submitForm() {
        this.$http.post('/v1/login', {
          email: this.email,
          password: this.password
        }).then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            localStorage.setItem('status', true)
            localStorage.setItem('email', this.email)
            this.$router.push('/account')
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
  input {
    width: 100%;
    height: 30px;
    margin: 3px 0;
  }
  .lg-submit-button {
    text-align: center;
  }
  input[type=submit] {
    border-radius: 8px;
    font-size: 25px;
    height: 40px;
    width: 130px;
    margin: 10px;
  }
  button {
    font-size: 20px;
    padding: 5px 50px;
    margin: 20px 0;
    background-color: white;
  }
</style>
