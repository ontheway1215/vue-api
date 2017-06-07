<template>
  <ul class="img-box">
    <li v-for="item in emojis" class="">
      <img :src="item.main" alt="">
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        emojis: []
      }
    },
    created () {
      let id = window.location.pathname
      console.log(id)
      this.$http.get('http://localhost:3000/' + id).then((response) => {
        response = response.data
        this.emojis = response.emojis
      })
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

  .img-box li {
    margin:5px;
  }
  .img-box li img {
    width: 200px;
    height: 200px;
  }
</style>
