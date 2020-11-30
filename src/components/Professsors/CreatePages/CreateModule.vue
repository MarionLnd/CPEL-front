<template>
    <div>
        <Header />
        <h2>Créer un module</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                Le module a été crée avec succès !
            </div>
        </transition>

        <transition name="slide-fade">
            <div class="alert alert-danger alert-dismissible" v-if="formData.submitted && formData.error">

            </div>
        </transition>

        <div class="container">
            <form class="text-left">
                <div class="form-inline form-group">
                    <label for="name">L'intitulé du module :</label>
                    <input type="text" id="name" class="form-control w-100" v-model.lazy="formData.name">
                </div>

                <!-- For PDF File
                <div class="form-group">
                    <label for="file">Parcourir les fichiers</label>
                    <input type="file" accept="application/pdf" class="form-control-file" id="file" ref="file" v-on:change="handleFileUpload">
                </div>-->

                <div class="form-group">
                    <label for="course">Contenu du cours</label>
                    <textarea type="text" class="form-control" id="course" v-model="formData.content" rows="19">
                    </textarea>
                </div>

                <div class="form-group">
                    <label for="module">Lier un groupe à ce module:</label>
                    <select id="module" class="custom-select" v-model="formData.groupSelected">
                        <option v-for="(group) in getGroups" v-bind:key="group._id" :value="group">
                            {{ group.name }}
                        </option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter le module</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Professsors/Header";

export default {
    name: "CreateModule",
    components: {Header},
    data() {
        return {
            getGroups: [],
            idProfessor: this.$cookies.get("idProfessor"),
            formData: {
                idModule: '',
                name: '',
                content: '',
                groupSelected: {},
                submitted: false,
                error: false,
                errorMessage: ''
            }
        }
    },
    methods: {
        sendForm() {
            this.formData.submitted = true

            let formData2 = new FormData()
            formData2.append('file', this.formData.file)

            let moduleCreated = {
                name: this.formData.name,
                content: this.formData.content,
                groups: [this.formData.groupSelected._id],
                idProfessor: this.idProfessor,
                tds: []
            }
            console.log(moduleCreated)
            // Ajouter le nouveau module a la base
            axios.post("https://cpel.herokuapp.com/api/module/", moduleCreated)
                .then(response => {
                    let newModuleID = response.data.NewModule.replaceAll("201 => https://cpel.herokuapp.com/api/modules/", "")
                    axios.put("https://cpel.herokuapp.com/api/groups/" + this.formData.groupSelected._id + "/modules/" + newModuleID)
                        .then(response => {
                            console.log(response)
                            // redirect
                            this.$router.push(this.$route.query.redirect || '/professeur')
                        })
                        .catch(error => {
                            console.log(error)
                            this.formData.error = true
                            this.formData.errorMessage = "Le groupe n'a pas été ajouté au module, ajoutez le groupe depuis la page de détail du module"
                        })
                })
                .catch(error => {
                    console.log(error)
                    this.formData.error = true
                    this.formData.errorMessage = "Une erreur est survenue lors de la création du module.. Réessayez !"
                })
            this.formData.submitted = false
        },
        /*handleFileUpload() {
            this.formData.file = this.$refs.file.files[0].name
        }*/
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/groups/").then(response => {
            this.getGroups = response.data;
        })
    }
}
</script>

<style scoped>

</style>
