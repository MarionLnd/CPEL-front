<template>
    <div class="container">
        <h3 class="text-left text-u">Gestion des professeurs</h3>
        <table class="table">
            <thead>
            <tr>
                <th>Numéro professeur</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail professeur</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(professor, key) in professors" :key="key">
                <td>{{ professor.professorNumber }}</td>
                <td>{{ professor.lastname }}</td>
                <td>{{ professor.firstname }}</td>
                <td>{{ professor.email }}</td>
                <td>
                    <router-link class="mr-2" :to="`/admin/professeur/${professor._id}`" style="color: #2a4f66">
                        <font-awesome-icon icon="eye" size="lg"/>
                    </router-link>
                    -
                    <router-link class="ml-2" :to="`/admin/gerer-professeurs/${professor._id}`" style="color: #2a4f66">
                        <font-awesome-icon icon="edit" size="lg"/>
                    </router-link>
                    -
                    <font-awesome-icon icon="user-minus" size="lg" class="ml-2" style="color: #2a4f66" @click="deleteProfessor(professor._id)"/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ProfessorDashboard",
        data() {
            return {
                professors: []
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/professors/")
                .then(response => this.professors = response.data)
                .catch(error => console.log(error))
        },
        methods: {
            deleteProfessor(professorId) {
                axios.delete("https://cpel.herokuapp.com/api/professors/" + professorId)
                    .then(response => {
                        console.log(response)
                        window.location.reload()
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped>

</style>
