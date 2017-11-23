<template>
  <div class="hello">
    <div class="form">
        <div class="name">
          <label>Username：</label>
          <input type="text" v-model="username" placeholder="Username" name="username">
        </div>
        <div class="password">
          <label>Password：</label>
          <input type="password" v-model="password" placeholder="Password" name="password">
        </div>
        <div>
          <button @click="submitForm()">submit</button>
        </div>
        <div>
          <h3>{{hooray}}</h3>
        </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        username: '',
        password: '',
        hooray: ''
      }
    },
    methods: {
      submitForm () {
        this.$http.get('/v1/reg').then((response) => {
          response = response.body
          if (response.errno === 0) {
            this.hooray = 'Sucessfully Registered!'
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
