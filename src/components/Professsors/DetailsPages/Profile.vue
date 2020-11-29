<template>
    <div class="container">
        <Header />
      <h1 class="pt-3 pb-3">Profil</h1>
        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">{{ professor.firstname }} {{ professor.lastname }}</h4>
                <p class="card-subtitle text-muted">Professeur</p>
            </div>
            <div class="card-body text-left">
                <form>
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" :placeholder="professor.lastname" disabled>
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" :placeholder="professor.firstname" disabled>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="text" :placeholder="professor.email" disabled>
                    </div>

                    <div class="form-group">
                        <label for="profNum">Numéro professeur:</label>
                        <input id="profNum" class="form-control" type="text" :placeholder="professor.professorNumber" disabled>
                    </div>
                </form>
                <div>
                    <h5><u>Modules liés:</u></h5>
                    <div v-if="modules.length > 0">
                        <ul v-for="(mod, key) in modules" :key="key">
                            <li>
                                <router-link :to="`/professeur/module/${mod._id}`">{{ mod.name }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>Vous n'avez pas encore crée de modules..
                            <router-link :to="`/professeur/creer-module`">
                                Par ici
                            </router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Header from "@/components/Professsors/Header";

    export default {
        name: "Profil",
        components: {Header},
        data() {
            return {
                id: this.$cookies.get("idProfessor"),
                professor: {},
                modules: []
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/professors/" + this.id + "/modules").then(response => {
                this.modules = response.data
            })

            axios.get("https://cpel.herokuapp.com/api/professors/" + this.id).then(response => {
                this.professor = response.data
            })
        }
    }
</script>

<style scoped>

</style>
