<template>
  <section id="head" class="bg-primary py-2 text-white shadow">
    <div class="container p-0">
      <div class="row px-3">
        <!-- Menu Button -->
        <div
          v-if="currentTab == 'loggedIn'"
          class="col-1 p-0 mx-3 my-auto"
          @click="showMenu = !showMenu"
        >
          <img
            class="align-self-center d-md-none btn-settings"
            :src="`${ipprot}//${ipaddr}:${expressPort}/assets/icons/distribute-vertical.svg`"
            alt="#"
          />
        </div>
        <!-- Headline -->
        <div class="row col">
          <h1 class="display-6 m-0 my-auto col-11 col-md-7">MoneyMan</h1>
          <div class="col-1 col-md-0"></div>
          <p
            class="col-11 col-md-3 m-0 align-self-center"
            v-if="user.name"
          >
            <strong>Name: </strong> {{ user.name }}
          </p>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="row m-0">
    <nav-bar
      v-if="currentTab == 'loggedIn'"
      :class="showMenu ? '' : 'd-none'"
      :currentTab="loggedInTab"
      @switchTab="switchLoggedInTab"
    ></nav-bar>
    <div v-else class="col-md"></div>

    <section id="content" class="col-12 col-md-8 p-4 text-dark">
      <component
        :is="currentTab"
        @login="loginUser"
        :userId="userId"
        :currentTab="loggedInTab"
        :exprReqPre="exprReqPre"
      >
      </component>
    </section>

    <div class="col-md"></div>
  </section>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Login from "./components/Login.vue";
import LoggedIn from "./components/LoggedIn.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    login: Login,
    loggedIn: LoggedIn,
    "nav-bar": NavBar,
  },
  data: function () {
    return {
      expressPort: 8080,
      currentTab: "login",
      userId: 11,
      user: {},
      userName: "",
      showMenu: false,
      loggedInTab: "add",
      exprReqPre: "",
    };
  },
  methods: {
    loginUser: function (user) {
      this.user = user;
      this.currentTab = "loggedIn";
    },

    switchLoggedInTab: function (tabName) {
      this.loggedInTab = tabName;
      console.log(tabName);
    },

    updateLoggedIn: function() {
      axios
        .get(`${this.exprReqPre}isLoggedIn`, { withCredentials: true })
        .then((msg) => {
          this.loginUser(msg.data)
        })
        .catch(() => {
          this.currentTab = "login";
        });
    }
  },
  computed: {
    ipaddr: () => window.location.hostname,
    ipprot: () => window.location.protocol,
  },

  mounted: function () {
    this.exprReqPre = `${window.location.protocol}//${window.location.hostname}:${this.expressPort}/`;
    this.updateLoggedIn();
  },
};
</script>

<style>
html,
body {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

html {
  background-color: var(--bs-teal);
}
body {
  background-color: rgba(255, 255, 255, 0.8);
  font-family: var(--bs-font-sans-serif);
}
.btn-settings {
  width: 2.2em;
  height: 2.2em;
}
#content {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>