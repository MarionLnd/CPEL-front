<template>
    <div>
        <Header />
        <h2 class="pt-3 pb-3">Création d'une correction</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                La correction a été créée avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.submitted && formData.error">
                Une erreur est survenue lors de la création de la correction.. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form class="text-left">
                <div class="form-group">
                    <label class="text-left" for="exercise">Pour l'exercice :</label>
                    <select id="exercise" class="custom-select" v-model="formData.selectedExercise" required>
                        <option
                            v-for="exercise in getProfExercises"
                            :key="exercise.idExercise"
                            :value="exercise">
                            Exercice : {{ exercise.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <p>
                        <strong>Énoncé :</strong> <br>
                        {{ this.formData.selectedExercise.wording }}
                    </p>
                    <label class="" for="txt">Correction pour l'énoncé selectionné :</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.content" rows="16" required></textarea>
                </div>

                <div class="form-group">
                    <label for="correctionCode">Code de correction :</label>
                    <input id="correctionCode" type="text" class="form-control w-25" v-model="formData.correctionCode" required>
                </div>

                <button type="submit" class="btn btn-primary mt-2 text-center" @click.prevent="sendForm">Ajouter la correction</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from "@/components/Professsors/Header";

    export default {
        name: "CreateCorrection",
        components: {Header},
        props: ['idExercice'],
        data() {
            return {
                id: this.$cookies.get("idProfessor"),
                idExercisesCorrected: [],
                modulesProf: [],
                tdsProfs: [],
                exercisesProf: [],
                formData: {
                    exercises: [],
                    selectedExercise: {},
                    content: "",
                    correctionCode: "",
                    submitted: false,
                    error: false
                }
            }
        },
        computed: {
          getProfExercises() {
              let profExercises = []
              for (let mod of this.modulesProf) {
                  for (let td of mod.tds) {
                      console.log(td)
                      for (let exo of td.exercises) {
                          if (!this.idExercisesCorrected.includes(exo._id)) {
                              profExercises.push(exo)
                          }
                      }
                  }
              }
              // Sort exercises by their id modules
              profExercises.sort((a, b) => {
                  let ma = a.createdAt,
                      mb = b.createdAt;

                  if (ma < mb) {
                      return -1;
                  }
                  if (ma > mb) {
                      return 1;
                  }
                  return 0;
              })
              return profExercises
          }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/corrections")
                .then(response => {
                    for (let correction of response.data) {
                        this.idExercisesCorrected.push(correction.idExercise)
                    }
                })

            axios.get("https://cpel.herokuapp.com/api/professors/" + this.id + "/modules").then(response => {
                this.modulesProf = response.data
            })
        },
        methods: {
            sendForm() {
                this.formData.submitted = true

                let correctionCreated = {
                    idExercise: this.formData.selectedExercise._id,
                    content: this.formData.content,
                    correctionCode: this.formData.correctionCode,
                    sendCorrection: false
                }
                // Ajouter la nouvelle correction a la base
               axios.post("https://cpel.herokuapp.com/api/correction/", correctionCreated)
                    .then(() => {
                        // redirect
                        this.$router.push(this.$route.query.redirect || '/professeur/')
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                    })
                this.formData.submitted = false
            },
        }
    }
</script>

<style scoped>

</style>
