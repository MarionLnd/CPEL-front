<template>
    <div class="container">
        <Header />

        <h1 class="pt-3 pb-3">Modifier les informations d'un étudiant</h1>

        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">{{ student.firstname }} {{ student.lastname }}</h4>
                <p class="card-subtitle text-muted">Étudiant(e)</p>
            </div>
            <div class="card-body text-left">
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" :placeholder="student.lastname" v-model="formData.lastname">
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" :placeholder="student.firstname" v-model="formData.firstname">
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="email" :placeholder="student.email" v-model="formData.email">
                    </div>

                    <div class="form-group">
                        <label for="studentNumber">Numéro étudiant:</label>
                        <input id="studentNumber" class="form-control" type="text" :placeholder="student.studentNumber" disabled>
                    </div>

                    <button type="submit" class="btn btn-outline-success" @click.prevent="sendForm">Modifier</button>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Header from "@/components/Admin/Header";

export default {
    name: "EditStudent",
    components: {
      Header
    },
    data() {
        return {
            student: {},
            formData: {
                lastname: "",
                firstname: "",
                idNumber: "",
                email: ""
            }
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/students/" + this.$route.params.idStudent)
            .then(response => this.student = response.data)
            .catch(error => console.log(error))
    },
    methods: {
        sendForm() {
            let updatedStudent = {
                lastname: this.formData.lastname !== "" ? this.formData.lastname : this.student.lastname,
                firstname: this.formData.firstname !== "" ? this.formData.firstname : this.student.firstname,
                email: this.formData.email !== "" ? this.formData.email : this.student.email,
                studentNumber: this.formData.idNumber !== "" ? this.formData.idNumber : this.student.studentNumber,
            }
            axios.put("https://cpel.herokuapp.com/api/students/" + this.$route.params.idStudent, updatedStudent)
                .then(response => {
                    console.log(response)
                    this.$router.push("/admin/etudiant/" + this.$route.params.idStudent)
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped>

</style>
