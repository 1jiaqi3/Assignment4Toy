<template>
  <div class="hm-main">
    <div class="hm-title">
      <h1>Lion Books!</h1>
      <h3>A platform for trading used books</h3>
    </div>
    <div class="hm-content">
      <form>
        <div class="hm-flex-container">
          <div class="hm-flex-item">
            <div>First name</div>
            <input v-model="first_name">
          </div>
          <div class="hm-flex-item">
            <div>Last name</div>
            <input v-model="last_name">
          </div>
          <div class="hm-flex-item">
            <div>Email</div>
            <input v-model="email">
          </div>
          <div class="hm-flex-item">
            <div>Password</div>
            <input v-model="password">
          </div>
        </div>
        <div class="hm-submit-button">
          <button class="hm-button" @click="submitForm" type="button">Join Now!</button>
        </div>
      </form>
      <div class="otherOptions">
        <div>
          Already a user?
          <router-link to="/login" style="text-decoration:underline;">Sign In</router-link>
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
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      submitForm() {
        this.$http.post('/v1/reg', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        }).then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.$router.push('/account')
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet">
  .hm-main {
    width: 50%;
    margin: auto;
  }
  .hm-title {
    text-align: center;
  }
  .hm-content {
    padding: 30px 20px;
    border: thin solid;
  }
  .hm-flex-container {
    display: flex;
    height: 300px;
    flex-direction: column;
    justify-content: center;
  }
  .hm-flex-item {
    height: 60px;
    width: 400px;
    margin: auto;
  }
  input {
    width: 100%;
    height: 30px;
    margin: 3px 0;
  }
  .hm-submit-button {
    text-align: center;
  }
  .hm-button {
    border-radius: 8px;
    font-size: 25px;
    height: 40px;
    width: 130px;
    margin: 10px;
  }
  .otherOptions {
    text-align: center;
  }
</style>
]
