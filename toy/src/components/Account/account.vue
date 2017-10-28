<template>
  <div>
    <div class="main">
    <menu class="menuContainer">
      <div class="menuItem">Account</div>
      <div class="menuItem">My Books</div>
      <div class="menuItem">Requests</div>
    </menu>
    <hr>
    <div class="content">
      <div class="contentContainer">
        <img src="../../assets/pika.jpg" style="width: 30%" class="contentItem"></img>
        <div class="contentItem">
          <form>
            <div class="flexContainer">
              <div class="flexItem">
                <div>First Name</div>
                <input type="text" name="email">
              </div>
              <div class="flexItem">
                <div>Last Name</div>
                <input type="text" name="email">
              </div>
              <div class="flexItem">
                <div>Email</div>
                <input type="email" name="email">
              </div>
              <div class="flexItem">
                <div>Password</div>
                <input type="password" name="password">
              </div>
              <div class="submitButton">
                <input type="submit" value="Save">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style rel="stylesheet">
  .menuContainer {
    display: flex;
    flex-direction: row;
  }
  .menuItem {
    margin: 5px 20px;
  }
  .content{
    width: 80%;
    padding: 30px 20px;
    margin: auto;
  }
  .contentContainer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .contentItem {
    margin: auto;
  }
  .flexContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .flexItem {
    margin: 10px auto;
  }
  input {
    width: 400px;
    height: 30px;
    margin: 3px 0;
  }
  .submitButton {
    text-align: end;
  }
  input[type=submit] {
    border-radius: 8px;
    font-size: 25px;
    height: 40px;
    width: 130px;
    margin: 10px;
  }
</style>
