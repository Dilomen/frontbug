<template>
  <div id="app">
    <img alt="Vue logo"
         src="./assets/logo.png">
         <input type="text">
    <button @click="handleReferenceError">ReferenceError报错</button>
    <button @click="handleTypeError">TypeError报错</button>
    <button @click="handleSyntaxError">SyntaxError报错</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    var myChart = echarts.init(document.getElementById('asdasdmain'));
  },
  methods: {
    handleReferenceError () {
      // eslint-disable-next-line no-console
      console.log(aaaa)
    },
    handleTypeError () {
      var a = 1
      a()
    },
    handleSyntaxError () {
      eval('heeo asd');
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
