<template>
  <nav class="navbar navbar-expand-md navbar-light bg-header fixed-top">
    <a class="navbar-brand" href="#">CPEL</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
       
        <li class="nav-item">
          <router-link class="nav-link" to="/profil">Profil</router-link>
        </li>
        
         <li>
          <router-link class="nav-link" to="/notifications"
          >Notifications 
        </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/login" @click="logout">Déconnexion</router-link>
        </li>
       
      
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    methods: {
        logout() {
            this.$cookies.remove("idProfessor")
            this.$cookies.remove("type")
            this.$cookies.remove("idStudent")
            this.$cookies.remove("username")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-header {
    background-color: #84A9AC;
  }
  /*.main-header {
    width: 100%;
  }*/
</style>
