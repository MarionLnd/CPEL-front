<template>
    <div>
        <div id="group-modules">
            <div>
                <button
                    class="btn btn-outline-info"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseModules"
                    aria-expanded="false"
                    aria-controls="collapseModules">
                    Consulter les
                    <span v-if="mods">modules</span>
                    <span v-if="students">étudiants</span>
                    <span v-if="exercises">exercices</span>
                    <span v-if="groups">groupes</span>
                </button>
                <div class="collapse" id="collapseModules">
                    <div class="mt-3 p-4 border">
                        <form class="row">
                            <label for="modulesToSelect">Les modules existants :</label>
                            <select id="modulesToSelect" class="custom-select" v-model="modulesSelected">
                                <option v-for="(mod, key) in getModules" :key="key">
                                    {{ mod.name }}
                                </option>
                            </select>
                        </form>
                        <br>
                        <div>
                            <p class="badge badge-info m-2 mt-0">
                                {{ modulesSelected }}
                            </p>
                        </div>

                        <button class="btn btn-outline-success mt-3" type="submit" @submit.prevent="addModuleToGroup">Lier le groupe à ce module</button>
                    </div>
                </div>
            </div>
            <div v-if="group.modules.length !== 0">
                <p>Il est actuellement lié au(x) module(s) suivant(s) :</p>
                <ul v-for="(mod, key) in group.modules" :key="key">
                    <li>{{ mod }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddAdditionnalElementsToObject",
    props: ["mods", "students", "exercises", "groups"],
}
</script>

<style scoped>

</style>
