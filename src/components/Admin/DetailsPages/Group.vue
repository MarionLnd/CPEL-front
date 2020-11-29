<template>
    <div class="container">
        <Header />
        <h1 class="pt-3 pb-3">Groupe {{ group.name }}</h1>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <h5 class="text-center">
                        {{ group.name }}
                    </h5>
                </div>
            </div>
            <div class="card-body text-left">
                <p>Ce groupe est composé de {{ group.students.length }} étudiants : </p>
                <ul v-for="(stud, key) in group.students" :key="key">
                    <li>
                        <router-link :to="`/professeur/etudiant/${stud._id}?groupName=${group.name}`">
                            [{{ stud.studentNumber }}] - {{ stud.firstname }} {{ stud.lastname }}
                        </router-link>
                    </li>
                </ul>

                <div>
                    <!-- Add students -->
                    <button
                        class="mt-2 btn btn-outline-info"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseStudents"
                        aria-expanded="false"
                        aria-controls="collapseStudents">
                        Consulter les étudiants
                    </button>
                    <div class="collapse" id="collapseStudents">
                        <div class="mt-3 p-4 border">
                            <h6><u>Ajoutez de nouveaux étudiants au groupe</u></h6>
                            <form class="form-inline">
                                <label for="studentToAdd">Les étudiants sans groupes :</label>
                                <select id="studentToAdd" class="custom-select w-100" v-model="studentSelected">
                                    <option v-for="(student, key) in getStudents" :key="key" :value="student">
                                        {{ student.lastname }} {{ student.firstname }}
                                    </option>
                                </select>
                            </form>
                            <br>
                            <div>
                                <p class="badge badge-primary m-2 mt-0">
                                    {{ studentSelected.lastname }} {{ studentSelected.firstname }}
                                </p>
                            </div>

                            <button class="btn btn-outline-success mt-3" type="submit" @click.prevent="addStudentToGroup">Lier l'étudiant(e) à ce groupe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Header from "@/components/Admin/Header";
    export default {
        name: "Group",
        components: {Header},
        data() {
            return {
                idGroup: this.$route.params.idGroup,
                group: {},
                getStudents: [],
                studentSelected: {},
                error: false,
                submitted: false
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/groups/" + this.idGroup)
                .then(response => this.group = response.data)
            axios.get("https://cpel.herokuapp.com/api/students/").then(response => {
                for(let student of response.data) {
                    if (student.idGroup === "") {
                        this.getStudents.push(student)
                    }
                }
            })
        },
        methods: {
            addStudentToGroup(){
                this.submitted = true
                axios.put("https://cpel.herokuapp.com/api/groups/" + this.id + "/students/" + this.studentSelected._id)
                    .then(response => {
                        console.log(response)
                        axios.put("https://cpel.herokuapp.com/api/students/group/" + this.studentSelected._id, {idGroup: this.id})
                            .then(responsePUT => {
                                console.log(responsePUT)
                                this.alertMessage = "L'ajout du nouvel étudiant a été fait avec succès"
                                window.location.reload()
                            })
                            .catch(error => {
                                console.log(error)
                                this.error = true
                                this.alertMessage = "Une erreur est survenue lors de la mise à jour du groupe de l'étudiant(e)"
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = true
                        this.alertMessage = "Une erreur est survenue lors de l'ajout de l'étudiant(e)"
                    })
            }
        }
    }
</script>

<style scoped>

</style>
