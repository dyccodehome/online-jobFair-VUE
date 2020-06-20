<template>
  <div class="main">
    <div class="title">
      <router-link to="/sign_in"><h2>人才招聘网（企业入驻）</h2></router-link>
    </div>
    <router-link to="/sign_up"><el-button type="success" round style="float: right;margin-top: 25px">个人注册</el-button></router-link>
    <div class="sign">
      <div class="row">
        <router-link to="/sign_up"><h3 class="sign_up" style="text-align: center;margin-left: 100px">企业注册</h3></router-link>
      </div>
      <div class="wirte">
        <div>
          <br class="input-group">
          <input type="text" class="form-control" placeholder="税务登记号" v-model="username">
          <br>
          <input type="password" class="form-control" placeholder="密码" v-model="password">
          <div class="rember">

          </div><br>
          <div class="btn">
            <b-button variant="success" size="lg" @click="onClick">注册</b-button>
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
        username: '',
        password: '',
      }
    },
    methods: {
      signupClick() {
        var that = this;
        this.$http
          .post('http://localhost:8080/user/sign_up', {"username": this.account, "password": this.password})
          .then(function (response) {
            if (response.data.data === null) {
              alert("税务登记号错误");
              that.$router.go(0);
            } else {
              alert("注册成功");
              that.$router.go(0);
            }
          })
      },
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
  .row{
    text-align: center;
  }
</style>
