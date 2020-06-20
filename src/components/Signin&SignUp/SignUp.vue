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
          <input type="text" class="form-control" placeholder="税务登记号/手机号"><br>
          <input type="text" class="form-control" placeholder="密码"><br>
          <input type="text" class="form-control" placeholder="确认密码">
          <div class="btn">
            <b-button variant="success" size="lg">注册</b-button><br>
          </div>
          <p class="message">"点击 “注册” 即表示您同意并愿意遵守"<br>
            <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>" 和 "
            <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>" 。"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "SignUp",
    data() {
      return {
        account: '',
        password: '',
        user: JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    methods : {
      signupClick() {
        var that = this;
        this.$http
          .post('http://localhost:8080/user/sign_up', {"account": this.account, "password": this.password})
          .then(function (response) {
            if (response.data.data === null) {
              alert("账号已被注册");
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
  .btn {
    width:260px;
    border-radius: 50px;
    text-align: center;
    margin-top: 2%;
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
    padding: 20px 40px;
    cursor: pointer;
  }
</style>

