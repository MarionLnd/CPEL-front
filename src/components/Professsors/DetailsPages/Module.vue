<template>
    <div class="container">
        <Header />
        <h1 class="pt-3 pb-3">{{ mod.name }}</h1>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    Cours
                </h4>
                <pre class="border text-left">{{ mod.content }}</pre>
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
                    <p>Vous pouvez ajouter un TD en sélectionnant ce module dans la page de création de TD <router-link :to="`/professeur/creer-td`">ici.</router-link></p>
                    <div id="group-modules-students" v-if="tds.length !== 0">
                        <!-- Add new modules -->
                        <div>
                            <p>Ou bien ajouter un TD déjà existant (sans module)</p>
                            <button
                                class="mr-3 btn btn-outline-info"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseModules"
                                aria-expanded="false"
                                aria-controls="collapseModules">
                                Consulter les TD
                            </button>
                            <div class="collapse mb-3" id="collapseModules">
                                <div class="mt-3 p-4 border">
                                    <h6><u>Ajoutez un TD au groupe</u></h6>
                                    <form class="form-inline">
                                        <label for="modulesToSelect">Les TDs existants :</label>
                                        <select id="modulesToSelect" class="custom-select w-100" v-model="moduleTdsSelected">
                                            <option v-for="(td, key) in tds" :key="key" :value="mod">
                                                {{ td.name }}
                                            </option>
                                        </select>
                                    </form>
                                    <div class="mt-1">
                                        <p class="badge badge-info m-2 mt-0">
                                            {{ moduleTdsSelected.name }}
                                        </p>
                                    </div>
                                    <button class="btn btn-outline-success mt-3" type="submit" @click.prevent="addModuleToGroup">Lier le groupe à ce module</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
