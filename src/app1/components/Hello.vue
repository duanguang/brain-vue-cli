<template>
  <div class="hello">
    <h1 @click="handleClick">app1{{items[1]}}</h1>
    <ul>
      <li><router-link to="/credit-bind">信用卡绑定12</router-link></li>
  <!--    <li><router-link to="/creditView-component">信用卡绑定组件</router-link></li>-->
    </ul>
  </div>
</template>

<script lang="js">
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: ['a', 'b', 'c']
    }
  },
  methods: {
    handleClick(){
      let a=[1,2]
      console.log(1)
      //this.items[1]='x';
      this.$set(this.items,1,'x')
      //this.items=[...this.items]
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
