<template>
    <div class="container">
        <Header />
        <h1 class="pt-3 pb-3">{{ mod.name }}</h1>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    Cours
                </h4>
                <p>{{ mod.content }}</p>
            </div>
            <div class="card-body text-left">
                <div>
                    <p v-if="moduleTds.length !== 0">Il est composé des TD suivants :</p>
                    <ol v-for="(td, key) in moduleTds" :key="key">
                        <li class="text-left">
                            <router-link :to="`/professeur/td/${td._id}`">{{ td.name }}</router-link>
                        </li>
                    </ol>
                </div>
                <div>
                    <p v-if="moduleTds.length === 0">Il n'y a pas encore de TD dans ce module.</p>
                    <p>Vous pouvez en créer un en sélectionnant ce module dans la page d'ajout de TD <router-link :to="`/professeur/creer-td`">ici.</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Header from "@/components/Professsors/Header";

export default {
    name: "Module",
    components: {Header},
    data() {
        return {
            id: this.$route.params.idModule,
            mod: {},
            moduleTds: [],
            moduleTdsSelected: [],
            tds: [],
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/modules/" + this.id).then(response => {
            this.mod = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/tds/").then(response => {
            for (let td of response.data) {
                if (td.idModule === this.id) {
                    this.moduleTds.push(td)
                }
                if (td.idModule === undefined) {
                    this.tds.push(td)
                }
            }
        })
    }
}
</script>

<style scoped>

</style>
