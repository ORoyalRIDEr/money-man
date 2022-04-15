<template>
  <h2 class="display-6 mb-3">Login</h2>

  <div class="row">
    <div class="form-group mb-3">
      <div class="input-group col-12 col-lg">
        <span class="input-group-text">Name</span>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
        />
      </div>
      <InputMsg v-if="triedRegistering" :msg="msgs.name"></InputMsg>
    </div>

    <div class="form-group mb-3">
      <div class="input-group col-12 col-lg">
        <span class="input-group-text">Password</span>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
      <InputMsg v-if="triedRegistering" :msg="msgs.password"></InputMsg>
    </div>
  </div>

  <div class="text-end">
    <button
      type="submit"
      class="btn btn-success mx-3"
      @click="openRegistration"
    >
      Register
    </button>

    <button
      type="submit"
      class="btn btn-primary"
      @click="$emit('login', username)"
    >
      Log In
    </button>
  </div>

  <div
    class="modal"
    :class="registering ? 'd-block' : ''"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Finish registration</h5>
        </div>
        <div class="modal-body">
          <p>
            Do you really want to create a new account with the username
            <strong>{{ username }}</strong
            >?
          </p>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-text">Repeat password:</span>
              <input
                type="password"
                class="form-control"
                id="password-repeated"
                v-model="passwordRepeated"
              />
            </div>
            <InputMsg
              v-if="passwordRepeated"
              :msg="msg_pswd_repated"
            ></InputMsg>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            :disabled="msg_pswd_repated.err"
            @click="register"
          >
            Register
          </button>
          <button
            @click="registering = false"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputMsg from "./InputMsg.vue";
import axios from "axios";

export default {
  components: {
    InputMsg,
  },

  data() {
    return {
      username: "",
      password: "",
      passwordRepeated: "",
      showMsgs: false,
      msgs: {
        name: { err: false, msg: "" },
        password: { err: false, msg: "" },
      },
      registering: false,
      triedRegistering: false,
    };
  },

  computed: {
    msg_pswd_repated: function () {
      let err = this.password != this.passwordRepeated;
      return {
        err: err,
        msg: err
          ? "Passwords are not equal."
          : "Passwords are equal. Click <strong>Register</strong> to continue.",
      };
    },
  },

  methods: {
    openRegistration: function () {
      this.triedRegistering = true;

      if (this.checkPassword())
        this.checkUsername(() => (this.registering = true));
      else this.checkUsername();
    },

    checkPassword: function () {
      // Browser Checks
      if (!this.password) {
        this.msgs.password.err = true;
        this.msgs.password.msg = "Please enter a password.";
        return false;
      } else {
        this.msgs.password.err = false;
        this.msgs.password.msg = "Password valid.";
        return true;
      }
    },

    checkUsername: function (successCallback) {
      // Browser Checks
      if (!this.username) {
        this.msgs.name.err = true;
        this.msgs.name.msg = "Please enter a username.";
        return false;
      }

      // Server Checks
      axios
        .get(`${this.exprReqPre}checkUsername/${this.username}`)
        .then(() => {
          this.msgs.name.err = false;
          this.msgs.name.msg = "Username valid.";
          console.log(successCallback);
          if (successCallback) successCallback();
        })
        .catch(() => {
          this.msgs.name.err = true;
          this.msgs.name.msg =
            "Username already in use. <strong>Log in</strong> instead.";
        });

      return true;
    },

    register: function () {
      axios.post(`${this.exprReqPre}newUser`, {
        name: this.username, password: this.password
      });
    },
  },

  emits: ["login"],
  props: ["exprReqPre"],
};
</script>

<style>
</style>