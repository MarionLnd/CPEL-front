<template>
    <div class="container">
        <Header />
        <h1 class="pt-3 pb-3">Détails professeur </h1>

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
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Header from "@/components/Admin/Header";

export default {
    name: "Professor",
    components: {
      Header
    },
    data() {
        return {
            professor: {}
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/professors/" + this.$route.params.idProfessor)
        .then(response => this.professor = response.data)
    }
}
</script>

<style scoped>

</style>
