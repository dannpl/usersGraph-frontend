<template>
  <div class="container">
    <div class="form">
      <input placeholder="First name" v-model="form.name.first" type="text" />
      <input placeholder="Last name" v-model="form.name.last" type="text" />
      <input
        placeholder="Participation"
        v-model="form.participation"
        type="number"
      />
      <button @click="saveUser()">send</button>
    </div>
    <div class="container-info">
      <p>Data</p>
      <span
        >It is a long established fact that a reader will be distracted</span
      >
    </div>
    <div class="container-data">
      <div class="table">
        <no-ssr>
          <v-data-table
            class="table-parent"
            :headers="headers"
            :items="getUsers"
            :items-per-page="5"
            item-key="id"
            noDataText="No information to display!"
          >
            <template>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </no-ssr>
      </div>

      <div class="chart">
        <DoughnutChart
          :dataCollection="getChartData"
          :options="options"
        ></DoughnutChart>
      </div>
    </div>
    <v-alert class="alert" v-if="alert.show" :type="alert.type">{{
      alert.message
    }}</v-alert>
  </div>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart.js";
import Repository from "@/services/repository";

export default {
  components: {
    DoughnutChart,
  },
  layout: "dashboard",
  data() {
    return {
      a: [],
      alert: {
        show: false,
        type: "success",
        message: null,
      },
      api: new Repository(),
      showError: false,
      form: {
        name: { first: "", last: "" },
        participation: null,
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          labels: {
            padding: 20,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
      headers: [
        {
          text: "",
          value: "id",
        },
        {
          text: "First Name",
          align: "left",
          value: "name.first",
        },
        {
          text: "Last Name",
          align: "left",
          sortable: false,
          value: "name.last",
        },
        {
          text: "Participation",
          align: "center",
          value: "participation",
        },
      ],
    };
  },
  methods: {
    getAllUsers() {
      this.api.getUsers().then(
        (res) => {
          this.$store.dispatch("setServices", res.data);
        },
        (error) => {
          this.alert;
          this.setAlert(true, "error", error.message);
        }
      );
    },
    saveUser() {
      this.form.participation = Number(this.form.participation);
      this.api.createUser(this.form).then(
        (res) => {
          this.form = {
            name: { first: "", last: "" },
            participation: 0,
          };

          this.setAlert(true, "success", "User saved!");

          this.getAllUsers();
        },
        (error) => {
          this.setAlert(true, "error", error.response.data.message);
        }
      );
    },
    setAlert(show, type, message) {
      this.alert = { show, type, message };

      setTimeout(() => {
        this.alert.show = false;
      }, 1500);
    },
  },
  mounted() {
    this.getAllUsers();
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsers;
    },
    getChartData() {
      return this.$store.getters.getChartData;
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  .form {
    width: 100%;
    height: 154px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #01b8e2;

    input {
      background-color: white;
      color: black;
      min-width: 300px;
      height: 54px;
      font-weight: 500;
      border-radius: 3px;
      font-size: 15px;
      padding: 15px;
      margin: 0 10px;
      &:focus {
        outline: 0;
      }
    }

    button {
      min-width: 155px;
      color: white;
      font-size: 18px;
      border-radius: 3px;
      height: 54px;
      font-weight: 700;
      margin-left: 10px;
      text-transform: uppercase;
      border: 3px solid white;
      &:focus {
        outline: 0;
      }
    }
  }

  .container-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0px;

    p {
      color: #3a4a4f;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 30px;
      margin-bottom: 10px;
    }

    span {
      color: #3a4a4f;
      font-weight: 500;
    }
  }

  .container-data {
    max-width: 1280px;
    justify-content: center;
    margin: auto;
    display: flex;
    width: 100%;

    .table {
      width: 68%;
      overflow: auto;
      margin-right: 100px;
    }

    .chart {
      width: 30%;
    }
  }

  .alert {
    width: 44%;
    position: fixed;
    bottom: 50px;
    left: 0px;
    margin: auto;
    right: 0px;
  }
}
</style>
