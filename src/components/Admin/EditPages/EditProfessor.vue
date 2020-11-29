<template>
    <div class="container">
        <Header />

        <h1 class="pt-3 pb-3">Modifier les informations d'un professeur</h1>

        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">{{ professor.firstname }} {{ professor.lastname }}</h4>
                <p class="card-subtitle text-muted">Professeur</p>
            </div>
            <div class="card-body text-left">
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" :placeholder="professor.lastname" v-model="formData.lastname">
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" :placeholder="professor.firstname" v-model="formData.firstname">
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="text" :placeholder="professor.email" v-model="formData.email">
                    </div>

                    <div class="form-group">
                        <label for="profNum">Numéro professeur:</label>
                        <input id="profNum" class="form-control" type="text" :placeholder="professor.professorNumber" v-model="formData.idNumber">
                    </div>

                    <button type="submit" class="btn btn-outline-success" @click.prevent="sendForm">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Header from "@/components/Admin/Header";

    export default {
        name: "EditProfessor",
        components: {
          Header
        },
        data() {
            return {
                professor: {},
                formData: {
                    lastname: "",
                    firstname: "",
                    idNumber: "",
                    email: ""
                }
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/professors/" + this.$route.params.idProfessor)
                .then(response => this.professor = response.data)
                .catch(error => console.log(error))
        },
        methods: {
            sendForm() {
                let updatedProfessor = {
                    lastname: this.formData.lastname !== "" ? this.formData.lastname : this.professor.lastname,
                    firstname: this.formData.firstname !== "" ? this.formData.firstname : this.professor.firstname,
                    email: this.formData.email !== "" ? this.formData.email : this.professor.email,
                    professorNumber: this.formData.idNumber !== "" ? this.formData.idNumber : this.professor.professorNumber
                }
                console.log(updatedProfessor)
                axios.put("https://cpel.herokuapp.com/api/professors/" + this.$route.params.idProfessor, updatedProfessor)
                    .then(response => {
                        console.log(response)
                        this.$router.push("/admin/professeur/" + this.$route.params.idProfessor)
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped>

</style>
