<template>
    <div>
        <Header />
        <h2 class="pt-3 pb-3">Créer un groupe</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                Le groupe a été crée avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.error" style="transition-delay: 1.5s">
                Une erreur est survenue lors de la création du groupe.. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form class="text-left">
                <div class="form-group">
                    <label for="idGroup">Le nom du groupe :</label>
                    <input type="text" id="idGroup" class="form-control w-100" v-model.lazy="formData.groupName" required>
                </div>

                <div class="form-group">
                    <label for="students">Ajouter les étudiants :</label>
                    <select id="students" class="form-control" multiple="multiple" v-model="formData.studentsAdded" required>
                        <option v-for="(student, key) of formData.students" :key="key">[{{student.studentNumber}}] - {{ student.firstname }} {{ student.lastname }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="module">Pour le module :</label>
                    <select id="module" class="custom-select" v-model="formData.modulesSelected" required>
                        <option v-for="(mod, key) of formData.modules" :key="key" :value="mod">{{ mod.name }}</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary mt-3" @click.prevent="sendForm">Créer le groupe</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from "@/components/Professsors/Header";

    export default {
        name: "CreateGroup",
        components: {
            Header
        },
        data() {
            return {
                formData: {
                    groupName: "",
                    studentsAdded: [],
                    students: [],
                    modules: [],
                    modulesSelected: [],
                    submitted: false,
                    error: false
                }
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/students/").then(response => {
                for(let student of response.data) {
                    if (student.idGroup === "") {
                        this.formData.students.push(student)
                    }
                }
            });
            axios.get('https://cpel.herokuapp.com/api/professors/' + this.$cookies.get("idProfessor") + "/modules").then(response => {
                this.formData.modules = response.data
            });
        },
        methods: {
            sendForm() {
                this.formData.submitted = true

                let groupCreated = {
                    name: this.formData.groupName,
                    modules: this.formData.modulesSelected,
                    students: this.formData.studentsAdded
                }
                console.log(groupCreated)
                // Ajouter le nouveau groupe a la base
                axios.post("https://cpel.herokuapp.com/api/group/", groupCreated)
                    .then(() => {
                        // Mettre a jour l'etudiant
                        for (let student in this.studentsAdded) {
                            axios.put(`https://cpel.herokuapp.com/api/student/${student._id}`, this.idGroup)
                                .then()
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                    })
                // Mettre a jour l'etudiant
                /*for (let student in this.studentsAdded) {
                    axios.put(`https://cpel.herokuapp.com/api/student/${student.id}`, this.idGroup)
                }*/
                this.formData.submitted = false

            },
        }
    }
</script>

<style scoped>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
