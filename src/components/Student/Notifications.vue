<template>
  <div class="container">
    <Header />

    <LeftMenu />

    <table class="table">
      <thead>
        <tr>
          <th scope="col" id="date" @click="sortDate()">Date</th>
          <th scope="col">Notifications</th>
        </tr>
      </thead>
      <tbody v-for="item in message" :key="item">
        <tr>
          <th scope="row">{{ item.date }}</th>
          <td @click="setCookie(item.link)">{{ item.msg }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.card {
  background-color: #84a9ac;
  margin-top: 50px;
  margin-left: 30%;
}
td {
  cursor: pointer;
}
table {
  margin-left: 10%;
  background-color: azure;
}
#date{
  cursor: pointer;
}
</style>
<script>
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import axios from "axios";
import moment from "moment";

export default {
  name: "Notifications",
  components: {
    Header,

    LeftMenu,
  },

  data() {
    return {
      count: Number,

      message: [],
      link: String,
      sortKey: "",
      sortSettings: [{ date: true }],
      desc: true,
    };
  },
  mounted() {
    this.count = 0;
    axios.get("https://cpel.herokuapp.com/api/modules/").then((response) => {
      response.data.forEach((mod) => {
        if (!this.message.includes(mod._id)) {
          this.message.push({
            msg: "Un nouveau Cours est disponible ",
            modid: mod._id,
            date: moment(mod.createdAt).format("YYYY/MM/DD"),
            link: "/courseContent/" + mod._id,
          });
        }
      });
    });
    axios.get("https://cpel.herokuapp.com/api/tds/").then((response) => {
      response.data.forEach((td) => {
        if (!this.message.includes(td._id)) {
          this.newTD.push({
            tdId: td._id,
            tdName: td.name,
          });
          this.$cookies.set("idTD", td._id);
          this.count++;
          this.message.push({
            msg: "Un nouveau TD est disponible ",
            tdId: td._id,
            date: moment(td.createdAt).format("YYYY/MM/DD"),
            link: "/exercise",
          });
        }
      });
    });
    axios.get("https://cpel.herokuapp.com/api/exercises/").then((response) => {
      response.data.forEach((exo) => {
        console.log(exo.createdAt);
        if (!this.message.includes(exo._id)) {
          this.message.push({
            exerciseId: exo._id,
            msg: "Un nouveau Exercice est disponible ",
            exerciseName: exo.name,
            date: moment(String(exo.createdAt)).format("YYYY/MM/DD"),
            link: "/exerciceContent/" + exo._id,
          });
        }

        axios
          .get("https://cpel.herokuapp.com/api/corrections/")
          .then((response) => {
            response.data.forEach((corr) => {
              if (exo._id === corr.idExercise) {
                if (!this.message.includes(corr._id)) {
                  this.message.push({
                    msg:
                      "La Correction de l'exercise  '  " +
                      exo.name +
                      "  'est disponible. Le Code de correction est : " +
                      corr.correctionCode,
                    correctionId: corr._id,
                    date: moment(corr.createdAt).format("YYYY/MM/DD"),
                    link: "/exerciceContent/" + exo._id,
                  });
                }
              }
            });
          });
      });
    
      this.message.sort((a, b) => {
        if (Date.parse(a.date) > Date.parse(b.date)) {
          return 1;
        } else if (Date.parse(a.date) < Date.parse(b.date)) {
          return -1;
        } else {
          return 0;
        }
      });

      
    });
  },
  methods: {
    setCookie(link) {
      console.log(link);
      this.$router.push(link);
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY/MM/DD");
      }
    },

    sortDate(){
 this.message.sort((a, b) => {
        if (Date.parse(a.date) > Date.parse(b.date)) {
          return 1;
        } else if (Date.parse(a.date) < Date.parse(b.date)) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  },
};
</script>