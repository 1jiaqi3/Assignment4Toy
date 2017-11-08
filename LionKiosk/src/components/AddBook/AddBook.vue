<template>
  <div class="ab-main">
    <div class="ab-content">
      <form>
        <div class="ab-flex-container">
          <div class="ab-flex-item">
            <div>Book Title</div>
            <input type="text" v-model="title">
          </div>
          <div class="ab-flex-item">
            <div>Author</div>
            <input type="text" v-model="author">
          </div>
          <div class="ab-flex-item">
            <div>Condition</div>
            <input type="text" v-model="remarks">
          </div>
        </div>
        <div class="submitButton">
          <input type="submit" value="Add it!" @click="submitForm">
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        title: '',
        author: '',
        remarks: ''
      }
    },
    methods: {
      submitForm() {
        this.$http.post('/v1/login', {
          email: localStorage.getItem('email'),
          title: this.title,
          author: this.author,
          remarks: this.remarks
        }).then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.$router.push('/mybook')
          }
        }, response => {
          this.message = 'Wrong combination of email and password!'
        })
      }
    }
  }
</script>

<style rel="stylesheet">
  .ab-main {
    width: 50%;
    margin: auto;
  }
  .ab-content {
    margin: 50px 0;
    padding: 30px 20px;
    border: thin solid;
  }
  .ab-flex-container {
    display: flex;
    height: 300px;
    flex-direction: column;
    justify-content: center;
  }
  .ab-flex-item {
    height: 60px;
    width: 400px;
    margin: auto;
  }
  input {
    width: 100%;
    height: 30px;
    margin: 3px 0;
  }
  .submitButton {
    text-align: center;
  }
  input[type=submit] {
    border-radius: 8px;
    font-size: 25px;
    height: 40px;
    width: 130px;
    margin: 10px;
  }
</style>
