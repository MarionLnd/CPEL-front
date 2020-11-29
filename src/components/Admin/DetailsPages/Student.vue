<template>
    <div class="container">
        <Header />

        <h1 class="pt-3 pb-3">Détails étudiant</h1>

        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">{{ student.firstname }} {{ student.lastname }}</h4>
                <p class="card-subtitle text-muted">Étudiant(e)</p>
            </div>
            <div class="card-body text-left">
                <form>
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" :placeholder="student.lastname" disabled>
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" :placeholder="student.firstname" disabled>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="email" :placeholder="student.email" disabled>
                    </div>

                    <div class="form-group">
                        <label for="studentNumber">Numéro étudiant:</label>
                        <input id="studentNumber" class="form-control" type="text" placeholder="20192031" disabled>
                    </div>

                   <!-- <div class="form-group">
                        <label for="groupName">Groupe:</label>
                        <input id="groupName" class="form-control" type="text" :placeholder="groupName" disabled>
                    </div>-->
                </form>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from "@/components/Admin/Header";

    export default {
        name: "Student",
        components: {
          Header
        },
        data() {
            return {
                student: {}
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/students/" + this.$route.params.idStudent)
                .then(response => this.student = response.data)
                .catch(error => console.log(error))
        }
    }
</script>

<style scoped>

</style>
