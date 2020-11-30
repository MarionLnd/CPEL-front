<template>
  <div class="container">
      <h1 class="text-dark">
          CPEL
      </h1>
      <div class="row">
          <div class="card col mr-5" style="float: left; margin-right: 10px">
              <div class="container">
                  <form>
                      <label>Numéro Professeur</label>
                      <input type="text" id="professor" v-model="usernameProf"/>
                      <label>password</label>
                      <input type="password" v-model="passwordProf"/>
                      <button @click.stop.prevent="submit()">Submit</button>
                  </form>
                  <h1> {{ msg }}</h1>
              </div>
          </div>
          <div class="card col ml-5" style="float: right">
              <div class="container">
                  <form>
                      <label>Numéro Etudiant</label>
                      <input type="text" id="student" v-model="usernameStudent"/>
                      <label>password</label>
                      <input type="password" id="studentPassword" v-model="passwordStudent"/>
                      <button @click.stop.prevent="submit()">Submit</button>
                  </form>
                  <h1> {{ msg }}</h1>
              </div>
          </div>
      </div>

      <div class="mt-2">
          <p>Vous n'êtes pas encore inscrit sur la plateforme ? <router-link to="/inscription">Inscrivez-vous ici</router-link></p>
      </div>
  </div>
</template>

<style  scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.card {
  width: 500px;
  height: 400px;
  background-color: #84a9ac;
  margin-top: 100px;
}
button {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #84a9ac;
}
form{
  margin-top: 30px;
}
h1{
  color: #8B0000;
}
</style>
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      page: [],
      usernameStudent: "",
      usernameProf: "",
      passwordStudent: "",
      passwordProf: "",
      msg: String
    };
  },
  mounted (){
      this.msg= ""
  },
  methods: {
    submit() {
  //this.username =  document.getElementById("student").value;
  //this.password = document.getElementById("studentPassword").value;
        if (this.usernameProf && this.passwordProf !== "") {
            axios.get("https://cpel.herokuapp.com/api/login/" +this.usernameProf+"/"+this.passwordProf)
                .then((user) => {
                    axios
                        .get("https://cpel.herokuapp.com/api/professors/")
                        .then((response) => {
                            for (let prof of response.data) {
                                console.log(prof)
                                if (prof.professorNumber === user.data.userLogin.username) {
                                    console.log(user.data.userLogin)
                                    this.$cookies.set("idProfessor", prof._id);
                                    this.$cookies.set("idUser", user.data.userLogin._id);
                                    this.$cookies.set("type", user.data.userLogin.type);
                                    console.log(this.$cookies.get("idProfessor"));
                                    console.log(this.$cookies.get("type"));
                                }
                            }
                            if (user.data.userLogin.type === "professor") {
                                this.$router.push("/professeur");
                            } else {
                                this.$router.push("/admin");
                            }
                        });
            })
                .catch(error => {
                    console.log(error.response)
                    this.msg= error.response.data.error
            });
        } else {
            axios.get("https://cpel.herokuapp.com/api/login/"+this.usernameStudent+"/"+this.passwordStudent).then((user) => {
                //response.data.forEach((user) => {
                console.log(user);
                    axios
                        .get("https://cpel.herokuapp.com/api/students/")
                        .then((response) => {
                            console.log(response)
                            response.data.forEach((student) => {
                                this.$router.push("/course");
                                if (student.studentNumber === user.data.userLogin.username) {
                                    this.$cookies.set("idStudent", student._id);
                                    this.$cookies.set("username", user.data.userLogin.username);
                                    this.$cookies.set("type", user.data.userLogin.type);
                                    this.$cookies.set("group", student.idGroup);
                                    console.log(this.$cookies.get("type"));
                                    console.log(this.$cookies.get("idStudent"));
                                }
                            });
                        });
            }).catch(error => {
              
                console.log(error.response)
                this.msg= error.response.data.error
            });
        }
    },
  },
};
</script>
