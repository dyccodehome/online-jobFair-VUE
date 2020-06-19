<template>
  <div>
    <div class="topDiv">
        <h1 class="title">人才招聘系统</h1>
    </div>
    <Menu :theme="theme3" active-key="1" :active-name="$route.name" class="menu">
        <Menu-group title="企业界面">
            <Menu-item key="1" name="information" to="information">
                <Icon type="document-text"></Icon>
                企业信息
            </Menu-item>
            <Menu-item key="2" name="recruit" to="recruit">
                <Icon type="chatbubbles"></Icon>
                招聘信息
            </Menu-item>
            <Menu-item key="3" name="queryResume" to="queryResume">
                <Icon type="chatbubbles"></Icon>
                简历查询
            </Menu-item>
        </Menu-group>
    </Menu>
    <div class="single-page-con" :style="{left:'200px'}">
            <div class="single-page">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'company-home',
  data () {
            return {
                theme3: 'dark'
            }
        }
}
</script>

<style>

.title{
      color: transparent;
      -webkit-text-stroke: 1px black;
      letter-spacing: 0.04em;
      font-size: 35px;
      margin-left: 45%;
      position: absolute;
      top: 20px;
}

.topDiv{
    background: rgb(81, 90 , 110);
    height: 100px;
}

.menu{
    height: 100%;
    position: fixed;
}

.single-page-con{
        position: absolute;
        top: 100px;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color: #F0F0F0;
        z-index: 1;
        transition: left .3s;
       
    }
.single-page{
        margin: 35px;
    }
</style>
