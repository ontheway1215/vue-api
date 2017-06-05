<template>
  <ul class="hello">
    <li v-for="item in message">
      <div>{{item.type}}</div>
      <div>{{item.description}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: null
    }
  },
  created () {
    let id = window.location.pathname
    console.log(id)
    this.$http.get('http://localhost:8081' + id).then((response) => {
      response = response.data
      this.message = response
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

a {
  color: #42b983;
}
</style>
