<template>
  <div class="hello">
    <h1>app1</h1>
    <ul>
      <li><router-link to="/credit-bind">信用卡绑定1</router-link></li>
  <!--    <li><router-link to="/creditView-component">信用卡绑定组件</router-link></li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
