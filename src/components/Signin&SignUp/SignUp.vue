<template>
  <div class="main">
    <div class="title">
      <router-link to="/sign_in"><h2>人才招聘网</h2></router-link>
    </div>
    <router-link to="/company_sign_up"><el-button type="success" round style="float: right;margin-top: 25px">企业注册</el-button></router-link>
    <div class="sign">
      <div class="row">
        <router-link to="/sign_in"><h3 class="sign_in active">登录</h3></router-link>
        <a><h3>·</h3></a>
        <router-link to="/sign_up"><h3 class="sign_up">注册</h3></router-link>
      </div>
      <div class="wirte">
        <div>
          <br class="input-group">
          <input type="text" class="form-control" placeholder="用户名" v-model="username"><br>
          <input type="password" class="form-control" placeholder="密码" v-model="password"><br>
<!--          <input type="text" class="form-control" placeholder="确认密码" v-model="pwdconfirm"><br>-->
          <div>
            <input type="text" class="form-control" placeholder="性别" v-model="sex" style="width: 120px">
            <span style="float: right">
              <input type="text" class="form-control" placeholder="年龄" v-model="age" style="width: 120px;margin-top: -38px">
            </span>
          </div><br>
          <input type="text" class="form-control" placeholder="联系电话" v-model="phone">
          <div class="btn">
            <b-button variant="success" size="lg" @click="signupClick">注册</b-button><br>
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

  let pwdCheck;
  export default {
    name: "SignUp",
    data() {
      return {
        username: '',
        password: '',
        sex:'',
        age:'',
        phone:'',
        user: JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    methods : {
      signupClick() {
        let sexId;
        if(this.sex === "男"){
           sexId = 0;
        }else{
          sexId = 1;
        }
        var that = this;
        this.$http
          .post('http://localhost:8080/user/applicant/sign_up', {
            "name": this.username,
            "sex":sexId,
            "age":this.age,
            "phone":this.phone
            }
            ).then(function (response) {
            if (response.data.data === 1) {
              alert("账号已被注册");
              that.$router.go(0);
            } else{
              alert("注册成功");
              that.$router.go(-1);
            }
          })
      },
    },
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

