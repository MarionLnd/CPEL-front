<template>
    <div class="container">
        <Header />

        <!-- ALERTS -->
        <transition name="slide-fade" v-if="submitted">
            <div class="alert"
                 :class="{'alert-success': submitted, 'alert-danger': error}">
                {{ alertMessage }}
            </div>
        </transition>

        <h1 class="pt-3 pb-3">Groupe {{ group.name }}</h1>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <h3 class="text-center clearfix">
                        {{ group.name }}
                        <!--<span class="float-right">
                            <router-link :to="`/professeur/editer-groupe/${group._id}`">
                                <font-awesome-icon class="text-left" icon="edit" size="lg" style="color: #333333"/>
                            </router-link>
                        </span>-->
                    </h3>
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
                <p v-if="groupModules.length === 0">Pour le moment, ce groupe n'est lié à aucun module que vous avez créée.</p>
                <div v-if="groupModules.length !== 0">
                    <p>Il est actuellement lié au(x) module(s) suivant(s) :</p>
                    <ul v-for="(mod, key) in groupModules" :key="key">
                        <li>
                            <router-link :to="`/professeur/module/${mod._id}`">{{ mod.name }}</router-link>
                        </li>
                    </ul>
                </div>
                <div id="group-modules-students">
                    <!-- Add new modules -->
                    <div>
                        <button
                            class="mr-3 btn btn-outline-info"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseModules"
                            aria-expanded="false"
                            aria-controls="collapseModules">
                            Consulter les modules
                        </button>
                        <div class="collapse mb-3" id="collapseModules">
                            <div class="mt-3 p-4 border">
                                <h6><u>Ajoutez des modules au groupe</u></h6>
                                <form class="form-inline">
                                    <label for="modulesToSelect">Les modules existants :</label>
                                    <select id="modulesToSelect" class="custom-select w-100" v-model="modulesSelected">
                                        <option v-for="(mod, key) in getModules" :key="key" :value="mod">
                                            {{ mod.name }}
                                        </option>
                                    </select>
                                </form>
                                <div class="mt-1">
                                    <p class="badge badge-info m-2 mt-0">
                                        {{ modulesSelected.name }}
                                    </p>
                                </div>
                                <button class="btn btn-outline-success mt-3" type="submit" @click.prevent="addModuleToGroup">Lier le module à ce groupe</button>
                            </div>
                        </div>
                    </div>

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
    </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Professsors/Header";

export default {
    name: "Group",
    components: {Header},
    data() {
        return {
            id: this.$route.params.idGroup,
            group: {},
            getModules: [],
            getStudents: [],
            modulesSelected: {},
            studentSelected: {},
            groupModules: [],
            error: false,
            submitted: false
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/groups/" + this.id).then(response => {
            this.group = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/professors/" + this.$cookies.get("idProfessor") + "/modules").then(response => {
            this.getModules = response.data
            for (let mod of this.group.modules) {
                if (mod.idProfessor === this.$cookies.get("idProfessor")) {
                    this.groupModules.push(mod)
                }
            }
        })
        axios.get("https://cpel.herokuapp.com/api/students/").then(response => {
            for(let student of response.data) {
                if (student.idGroup === "") {
                    this.getStudents.push(student)
                }
            }
        })
    },
    methods: {
        addModuleToGroup() {
            this.submitted = true
            axios.put("https://cpel.herokuapp.com/api/groups/" + this.id + "/modules/" + this.modulesSelected._id)
                .then(response => {
                    console.log(response)
                    axios.put("https://cpel.herokuapp.com/api/modules/" + this.modulesSelected._id + "/" + this.id, {idGroup: this.id})
                        .then(responsePUT => {
                            console.log(responsePUT)
                            this.alertMessage = "L'ajout du nouveau module a été fait avec succès"
                            window.location.reload()
                        })
                        .catch(error => {
                            console.log(error)
                            this.error = true
                            this.alertMessage = "Une erreur est survenue lors de la mise à jour du groupe pour le module"
                        })
                })
                .catch(error => {
                    console.log(error)
                    this.error = true
                    this.alertMessage = "Une erreur est survenue de l'ajout du module"
                })
        },
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
