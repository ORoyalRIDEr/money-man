<template>
  <section id="head" class="bg-primary py-2 text-white shadow">
    <div class="container p-0">
      <div class="row px-3">
        <div class="col-1 p-0 mx-3 my-auto" @click="showMenu = !showMenu">
          <img
            class="align-self-center d-md-none btn-settings"
            :src="`${ipprot}//${ipaddr}:${expressPort}/assets/icons/distribute-vertical.svg`"
            alt="#"
          />
        </div>
        <div class="row col">
          <h1 class="display-6 m-0 my-auto col-11 col-md-7">MoneyMan</h1>
          <div class="col-1 col-md-0"></div>
          <p
            class="col-11 col-md-3 m-0 align-self-center"
            v-if="userName != ''"
          >
            <strong>Name: </strong> {{ userName }}
          </p>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="row m-0">
    <nav-bar
      class="col-0 col-md p-4 d-md-block"
      :class="showMenu ? '' : 'd-none'"
      @switchTab="switchLoggedInTab"
    ></nav-bar>

    <section id="content" class="col-12 col-md-8 p-4 text-dark">
      <component
        :is="currentTab"
        @login="loginUser"
        :userId="userId"
        :currentTab="loggedInTab"
        :expressPort="expressPort"
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

export default {
  name: "app",
  components: {
    login: Login,
    loggedIn: LoggedIn,
    "nav-bar": NavBar,
  },
  data: function () {
    return {
      expressPort: 8000,
      currentTab: "loggedIn",
      userId: 11,
      userName: "Peter",
      showMenu: false,
      loggedInTab: "add",
    };
  },
  methods: {
    loginUser: function (inputUserName) {
      this.userId = inputUserName;
      this.currentTab = "loggedIn";
    },
    switchLoggedInTab: function (tabName) {
      this.loggedInTab = tabName;
      this.showMenu = false;
      console.log(tabName);
    },
  },
  computed: {
    ipaddr: () => window.location.hostname,
    ipprot: () => window.location.protocol
  }
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