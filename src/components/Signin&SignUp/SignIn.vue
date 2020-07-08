<template>
  <div class="main">
    <div class="title">
      <router-link to="/sign_in"><h2>人才招聘网</h2></router-link><!--页眉 系统名称-->
    </div>
    <div class="sign"><!-- 登录-注册表单-->
      <div class="row">
        <router-link to="/sign_in"><h3 class="sign_in active">登录</h3></router-link>
        <a><h3>·</h3></a>
        <router-link to="applicant/sign_up"><h3 class="sign_up">注册</h3></router-link>
      </div>
      <div class="wirte">
        <div>
          <br class="input-group">
            <input type="text" class="form-control" placeholder="税务登记号/用户名" v-model="username">
          <br>
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
  // 导入的必要组件
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
      // 登陆方法，调用后台登录接口，判断is_admin_role的值，登陆成功后，跳转到相应界面
      onClick() {
        var that = this;
        this.$http
          .post('http://localhost:8080/user/sign_in', {"username": this.username, "password": this.password})
          .then(function (response) {
            //alert(JSON.stringify(response.data.data));
            alert(response.data.msg);
            localStorage.setItem("loginUser", JSON.stringify(response.data.data));
            var identity = response.data.data.is_admin_role;
            console.log(identity);
            localStorage.setItem("user_id",response.data.data.user_id) ;
            if (identity === 0) {
              that.$router.push("/admin");
            } else if (identity === 1) {
              that.$router.push("/applicant/self-information");
            } else if (identity === 2) {
              that.$router.push("/company-home/information");
            }
          })
      }
    }
  }
</script>

<style scoped>
  /*css样式*/
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

