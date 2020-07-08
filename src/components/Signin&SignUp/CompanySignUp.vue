<template>
  <div class="main">
    <div class="title">
      <router-link to="/sign_in"><h2>人才招聘网（企业入驻）</h2></router-link>
    </div>
    <router-link to="/applicant/sign_up"><el-button type="success" round style="float: right;margin-top: 25px">个人注册</el-button></router-link>
    <div class="sign">
      <div class="row">
        <router-link to="/company/sign_up"><h3 class="sign_up" style="text-align: center;margin-left: 200px">企业注册</h3></router-link>
      </div>
      <div class="wirte">
        <div>
          <br class="input-group">
          <input type="text" class="form-control" placeholder="税务登记号" v-model="taxNumber">
          <br>
          <input type="password" class="form-control" placeholder="密码" v-model="password">
          <br>
          <div>
            <input type="text" class="form-control" placeholder="企业名称" v-model="name" style="width: 220px"><br>
            <span style="float: right">
              <input type="text" class="form-control" placeholder="企业法人" v-model="leagal_person" style="width: 220px;margin-top: -59px"><br>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="企业地址" v-model="address"><br>
          <div>
            <input type="text" class="form-control" placeholder="经营范围" v-model="scope" style="width: 220px"><br>
            <span style="float: right">
              <input type="text" class="form-control" placeholder="注册资本" v-model="registered_capital" style="width: 220px;margin-top: -59px"><br>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="联系方式" v-model="phone">
          <div class="rember">

          </div><br>
          <div class="btn">
            <b-button variant="success" size="lg" @click="signupClick">注册</b-button>
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
        taxNumber: '',
        password: '',
        address:'',
        leagal_person:'',
        scope:'',
        registered_capital:'',
        phone:''
      }
    },
    methods: {
      signupClick() {
        var that = this;
        this.$http
          .post('http://localhost:8080/user/company/sign_up',
          {
            "taxNumber": this.taxNumber,
            "name": this.name,
            "address":this.address,
            "leagalPerson":this.leagal_person,
            "scope":this.scope,
            "phone":this.phone,
            "registeredCapital":this.registered_capital
          }
          ).then(function (response) {
            if (response.data.data === null) {
              alert("税务登记号错误");
              that.$router.go(0);
            } else {
              alert("注册成功");
              that.$router.go("/sign_in");
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
    width: 600px;
    margin: 100px auto 0;
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
