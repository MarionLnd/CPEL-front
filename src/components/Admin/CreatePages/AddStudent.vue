<template>
    <div>
        <Header />

        <h1 class="pt-3 pb-1">Ajouter un étudiant</h1>

        <!-- ALERTS -->
        <transition name="slide-fade" v-if="formData.submitted">
            <div class="alert"
                 :class="{'alert-success': formData.success, 'alert-danger': formData.error}">
                {{ alertMessage }}
            </div>
        </transition>

        <div class="container">
            <form class="text-left">

                <h5 class="section-title mb-3">Informations personnelles</h5>
                <div class="form-row">
                    <div class="form-group col">
                        <label class="label-cpel" for="lastname-prof">Nom de famille :</label>
                        <input type="text" id="lastname-prof" class="form-control w-100" v-model.lazy="formData.lastname" required>
                    </div>

                    <div class="form-group col">
                        <label class="label-cpel" for="firstname-prof">Prénom :</label>
                        <input type="text" id="firstname-prof" class="form-control w-100" v-model.lazy="formData.firstname" required>
                    </div>
                </div>

                <h5 class="section-title mb-3">Informations d'identification</h5>
                <div class="form-row">
                    <div class="form-group col">
                        <label class="label-cpel" for="idNum-prof">Numéro d'identification :</label>
                        <input type="text" id="idNum-prof" class="form-control w-100" v-model.lazy="formData.idNumber" required>
                    </div>

                    <div class="form-group col">
                        <label class="label-cpel" for="email-prof">Email :</label>
                        <input type="email" id="email-prof" class="form-control w-100" v-model.lazy="formData.email" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="label-cpel" for="module">Pour le groupe :</label>
                    <select id="module" class="custom-select" v-model="formData.groupSelected">
                        <option v-for="(group, key) of groups" :key="key" :value="group._id">{{ group.name }}</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-outline-success mt-3" @click="sendForm">Ajouter un(e) étudiant(e)</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Admin/Header";

export default {
    name: "AddStudent",
    components: {
        Header
    },
    data() {
        return {
            students: [],
            groups: [],
            formData: {
                lastname: "",
                firstname: "",
                idNumber: "",
                email: "",
                groupSelected: "",
                error: false,
                success: false,
                submitted: false
            },
            alertMessage: ""
        }
    },
    methods: {
        sendForm() {
            if (this.allRequiredFieldsAreFilled()) {
                let studentCreated = {
                    lastname: this.formData.lastname,
                    firstname: this.formData.firstname,
                    studentNumber: this.formData.idNumber,
                    email: this.formData.email,
                    idGroup: this.formData.groupSelected,
                }
                console.log(studentCreated)
                // Add student ot the base
                axios.post("https://cpel.herokuapp.com/api/student/", studentCreated)
                    .then(() => {
                        this.formData.success = true
                        this.$router.push("/admin/tableau-de-bord")
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                    })
            } else {
                this.formData.error = true
                this.alertMessage = "Tous les champs requis ne sont pas remplis"
            }
        },
        allRequiredFieldsAreFilled() {
            return (this.formData.firstname !== "" && this.formData.lastname !== ""
                && this.formData.email !== "" && this.formData.idNumber !== "");
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/students/")
            .then(response => this.students = response.data)
            .catch(error => console.log(error))

        axios.get("https://cpel.herokuapp.com/api/groups/")
            .then(response => this.groups = response.data)
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
.section-title {
    text-decoration: underline;
    color: #5eaaa8;
}
.label-cpel {
    text-decoration: underline;
    color: #056676;
}
</style>
