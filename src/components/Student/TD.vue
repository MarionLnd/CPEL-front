<template>
  <div class="container">
    <Header />

    <LeftMenu />
    <h1>TDs</h1>
    <div class="course">
      <div v-for="mod in modules" :key="mod">
        <div class="card">
          <p id="title">{{ mod.moduleName }}</p>

          <div v-for="item in exoData" :key="item">
            <div v-if="mod.modid === item.moduleId">
              <p @click="setCookie(item.idTD)" id="subtitle">{{ item.td }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-notifications/styles/material.css";
#first {
  margin-top: 50px;
}
#title {
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: bold;
}
#subtitle {
  font-size: 19px;
  cursor: pointer;
}
.card {
  width: 400px;
  height: 300px;
  background-color: #84a9ac;
  margin-top: 50px;
  margin-left: 50%;
}
a {
  color: #4e4e4e;
}
a:focus {
  color: #2f7777;
}

.nav-link {
  position: relative;
  display: inline-block;
  margin: 10px 13px 10px 10px;
}
.badge-block .e-badge.leftTop {
  transform: translateX(-150%);
}
.course {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.container {
  margin-left: 0%;
}
#deconexion {
  position: absolute;
  bottom: 0px;
}

h1 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-left: 30%;
}
</style>
<script>
import axios from "axios";
import Header from "./Header";

import LeftMenu from "./LeftMenu";

export default {
  name: "modules",
  components: {
    Header,

    LeftMenu,
  },
  data() {
    return {
      exoData: [],
      count: Number,
      newSolution: [],
      modules: [],
    };
  },
  mounted() {
    axios.get("https://cpel.herokuapp.com/api/groups/").then((response) => {
      response.data.forEach((groupe) => {
        if (groupe._id === this.$cookies.get("group")) {
          groupe.modules.forEach((grpM) => {
            axios
              .get("https://cpel.herokuapp.com/api/modules/")
              .then((response) => {
                response.data.forEach((mod) => {
                  axios
                    .get("https://cpel.herokuapp.com/api/tds/")
                    .then((response) => {
                      response.data.forEach((td) => {
                        if (grpM._id === mod._id) {
                          if (mod._id === td.idModule) {
                            this.exoData.push({
                              module: mod.name,
                              td: td.name,
                              idTD: td._id,
                              moduleId: mod._id,
                              date: td.dateLimit,
                            });
                            console.log(this.exoData);
                          }
                        }
                      });
                    });
                });
              });
          });
        }
      });
    });
    axios.get("https://cpel.herokuapp.com/api/groups/").then((response) => {
      response.data.forEach((groupe) => {
        if (groupe._id === this.$cookies.get("group")) {
          groupe.modules.forEach((grpM) => {
            axios
              .get("https://cpel.herokuapp.com/api/modules/")
              .then((response) => {
                response.data.forEach((mod) => {
                  if (grpM._id === mod._id) {
                    this.modules.push({
                      modid: mod._id,
                      moduleName: mod.name,
                    });
                  }
                });
              });
          });
        }
      });
    });
  },
  methods: {
    setCookie(item) {
      this.$cookies.set("idTD", item);
      console.log(this.$cookies.get("idTD"));

      this.$router.push("/exercise");
    },
  },
};
</script>