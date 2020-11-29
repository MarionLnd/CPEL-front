<template>
    <div class="container">
        <Header />

        <CodeRending :exercise="exo" :hasCorrection="hasCorrection" :contentCorrection="correctionContent.content" />
        <router-link :to="`/professeur/creer-correction/`" v-if="!hasCorrection">
             <button class="btn btn-outline-info">Ajouter une correction</button>
         </router-link>
        <!--<router-link :to="`/professeur/editer-correction/${correctionContent._id}?idCorrection=${group.name}`" v-else>
            <button class="btn btn-outline-info">Modifier la correction</button>
        </router-link>-->
    </div>
</template>

<script>
import axios from "axios";
import CodeRending from "./CodeRending";
import Header from "@/components/Professsors/Header";

export default {
    name: "Exercice",
    components: {
        Header,
        CodeRending
    },
    props: ["exo", "contentCorrection"],
    data: function () {
        return {
            idTD: this.$route.params.idTD,
            idExercise: this.exo._id,
            exercise: {},
            active: Boolean,
            hasCorrection: false,
            correctionContent: {}
        };
    },
    methods: {

    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/exercises/" + this.idExercise).then(response => {
            this.exercise = response.data
        });
        axios.get("https://cpel.herokuapp.com/api/corrections/").then(response => {
            for (let correction of response.data) {
                if (correction.idExercise === this.idExercise) {
                    this.hasCorrection = true
                    this.correctionContent = correction
                }
            }
        })
    },
}
</script>

<style scoped>

</style>
