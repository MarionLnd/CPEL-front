<template>

  <div id="app">
      <HeaderAdmin v-if="isAdminConnected"/>
      <Header v-if="isProfessorConnected"/>

    <router-view />
  </div>
</template>

<script>
//import Header from './components/Login';

import Header from "./components/Professsors/Header";
import HeaderAdmin from "./components/Admin/Header";

export default {
  name: 'App',
  components: {
      Header,
      HeaderAdmin
  },
    data(){
      return {
          cookies: this.$cookies.get("type")
      }
    },
    computed: {
      isProfessorConnected() {
          console.log(this.$cookies)
          if (this.$cookies.get("type") === "professor") {
              return true
          } else {
              return false;
          }
      },
        isAdminConnected() {
            if (this.$cookies.get("type") === "admin") {
                return true
            } else {
                return false;
            }
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #C2DBDB;
  min-height: 100%;
 
  
}
body,html{
background-color: #C2DBDB;
min-height: 100%;
}
</style>
