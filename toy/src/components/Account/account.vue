<template>
  <div>
    <hr>
    <div class="ac-content">
      <div class="ac-content-container">
        <img src="../../assets/pika.jpg" style="width: 30%" class="ac-content-item"></img>
        <div class="ac-content-item">
          <form>
            <div class="ac-flex-container">
              <div class="ac-flex-item">
                <div>First Name</div>
                <input v-model="first_name" class="ac-input">
              </div>
              <div class="ac-flex-item">
                <div>Last Name</div>
                <input v-model="last_name" class="ac-input">
              </div>
              <div class="ac-submit-button">
                <button @click="submitForm">
                  Submit
                </button>
              </div>
              <p>{{message}}</p>
            </div>
          </form>
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
        message: ''
      }
    },
    created() {
      this.$http.get('/account', {
        id: '123'
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
  .ac-input {
    width: 400px;
    height: 30px;
    margin: 3px 0;
  }
  .ac-submit-button {
    text-align: end;
  }
</style>
