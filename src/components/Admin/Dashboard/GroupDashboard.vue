<template>
    <div class="container">
        <h3 class="text-left text-u">Gestion des groupes</h3>
        <table class="table">
            <thead>
            <tr>
                <th>Nom</th>
                <th>Nombre d'étudiants</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(group, key) in groups" :key="key">
                <td>{{ group.name }}</td>
                <td>{{ group.students.length }}</td>
                <td>
                    <router-link class="mr-2" :to="`/admin/groupe/${group._id}`">
                        <font-awesome-icon icon="eye" size="lg" style="color: #2a4f66" />
                    </router-link>
                    -
                    <font-awesome-icon icon="trash-alt" size="lg" class="ml-2" style="color: #2a4f66" @click="deleteGroup"/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name: "GroupDashboard",
        data() {
            return {
                groups: []
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/groups/").then(response => {
                this.groups = response.data
            })
        },
        methods: {
            deleteGroup(groupId) {
                axios.delete("https://cpel.herokuapp.com/api/groups/" + groupId)
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
