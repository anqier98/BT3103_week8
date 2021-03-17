<template>
  <div id="app">
    <h2 id="header"> Ah Huat Tze Char </h2>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data (){
    return {
    }
  }
}
</script>

<style scoped>
#header {
  font-size: 30px;
  background: #1abc9c;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>