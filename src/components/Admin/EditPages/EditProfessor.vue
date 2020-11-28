<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Modifier les informations d'un professeur</h1>

        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">{{ professor.firstname }} {{ professor.lastname }}</h4>
                <p class="card-subtitle text-muted">Professeur</p>
            </div>
            <div class="card-body text-left">
                <form>
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

                    <button type="submit" class="btn btn-outline-success" @submit.prevent="sendForm">Modifier</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name: "EditProfessor",
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
                    lastname: this.formData.lastname !== "" ? this.formData.lastname : this.student.lastname,
                    firstname: this.formData.firstname !== "" ? this.formData.firstname : this.student.firstname,
                    email: this.formData.email !== "" ? this.formData.email : this.student.email,
                    studentNumber: this.formData.studentNumber !== "" ? this.formData.studentNumber : this.student.studentNumber,
                }
                axios.get("https://cpel.herokuapp.com/api/professors/" + this.$route.params.idProfessor, updatedProfessor)
                    .then(response => {
                        console.log(response)
                        this.$router.pop(-1)
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped>

</style>
