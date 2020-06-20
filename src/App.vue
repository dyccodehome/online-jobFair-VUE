<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}

#app {
    width: 100%;
    height: 100%;
}

.title{
      color: transparent;
      -webkit-text-stroke: 1px black;
      letter-spacing: 0.04em;
      font-size: 35px;
      margin-left: 45%;

}


</style>
<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";     /*深色主题*/
</style>
