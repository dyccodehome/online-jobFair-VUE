<template>
  <div class="main">
    <div class="title">
      <h2>人才招聘网</h2>
    </div>
    <div class="sign">
      <div class="row">
        <router-link to="/sign_in"><h3 class="sign_in active">登录</h3></router-link>
        <a><h3>·</h3></a>
        <router-link to="/sign_up"><h3 class="sign_up">注册</h3></router-link>
      </div>
      <div class="wirte">
        <div>
          <br class="input-group">
          <input type="text" class="form-control" placeholder="手机号" v-model="account"><br>
          <input type="password" class="form-control" placeholder="密码" v-model="password">
          <div class="rember">

          </div><br>
          <div class="btn">
            <b-button variant="primary" size="lg" @click="onClick">登录</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min.js'
  export default {
    name: "SignIn",
    data() {
      return {
        account: '',
        password: '',
      }
    },
    methods: {
      onClick() {
        var that = this;
        this.$http
          .post('http://localhost:8080/user/sign_in', {"account": this.account, "password": this.password})
          .then(function (response) {
            //alert(JSON.stringify(response.data.data));
            alert(response.data.msg);
            localStorage.setItem("loginUser", JSON.stringify(response.data.data));
            var identity = response.data.data.is_admin_role;
            if (identity === "0") {
              that.$router.push("/admin");
            } else if (identity === "1") {
              that.$router.push("/company");
            } else if (identity === "2") {
              that.$router.push("/employee")
            }
          })
      }
    }
  }
</script>

<style scoped>
  .main {
    height: 100%;
    min-height: 750px;
    text-align: center;
    font-size: 14px;
    /*background-color: #f1f1f1;*/
    background: url("../../../static/img/background-image.jpg");
    background-repeat: no-repeat;
  }
  .title {
    position: absolute;
    margin: 2%;
    color: cornflowerblue;
    /*top: 56px;*/
    /*margin-left: 50px;*/
  }
  .sign {
    width: 400px;
    margin: 150px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
    display: inline-block;
  }
  h3{
    padding: 5px;
    font-family: 宋体,serif;
  }
  .sign_in {
    margin-left: 80px;
    cursor: pointer;
  }
  .sign_up {
    cursor: pointer;
  }
  input {
    background-color: gainsboro;
  }
  .rember{
    margin-top: 20px;
  }
  .fore {
    float: left;
  }
  .back {
    float: right;
  }
  .btn {
    width:250px;
    border-radius: 50px;
  }
  .line_02{
    height: 1px;
    border-top: 1px solid gray;
    text-align: center;
    margin-top: 20px;
  }
  .line_02 span{
    position: relative;
    top: -8px;
    background: #fff;
    padding: 0 20px;
  }
  ul li{
    list-style-type: none;
    padding: 20px 15px;
    cursor: pointer;
  }
  ul li span{
    font-size: 18px;
  }
</style>

