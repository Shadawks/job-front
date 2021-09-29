<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-10">
                    <v-toolbar class="mb-5">
                        <v-toolbar-title class="title flex text-center"><v-icon x-large>mdi-account-lock</v-icon></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form class="mt-4">
                            <v-text-field
                                color="white"
                                label="Email"
                                outlined
                                prepend-icon="mdi-at"
                                type="text"
                                name="email"
                                :rules="emailRules"
                                id="email"
                                v-model="form.email"
                                @keyup.enter="login()"
                            ></v-text-field>
                            <v-text-field
                                color="white"
                                label="Password"
                                outlined
                                id="password"
                                prepend-icon="mdi-lock"
                                name="password"
                                type="password"
                                :rules="passwordRules"
                                v-model="form.password"
                                @keyup.enter="login()"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn @click="login()" x-large :disabled="!isFormValid()" class="white--text">Log in</v-btn>
                    </v-card-actions>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn color="grey" class="font-weight-medium mb-4" plain href="forgot-password">I forgot my password</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card dark class="d-flex align-center flex-column">
                <v-card-text class="d-flex justify-center mt-3">{{ error }}</v-card-text>
                <v-btn @click="() => {dialog = false}" x-large class="white--text mb-4">Ok</v-btn>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
  export default {
    data() {
      return {
        passwordRules: [
          v => !v || v.length >= 8 || ""
        ],
        emailRules: [
          v => !v ||
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(v) || `This email is incorrect.`,
        ],
        form: {
          email: "",
          password: "",
        },
        error: "",
        dialog: false,
      };
    },
    methods: {
      isFieldValid(v, rules) {
        return v && rules.every((rule) => typeof (rule(v)) != "string")
      },
      isFormValid() {
        return (this.isFieldValid(this.form.email, this.emailRules) && this.isFieldValid(this.form.password, this.passwordRules));
      },
      async login() {
        this.error = null
        await this.$strapi.login({
          identifier: this.form.email,
          password: this.form.password,
        }).then(() => {
          this.$router.push("/");
        }).catch(e => {
          this.dialog = true;
          if (e.response.data.message[0].messages[0].message == "Identifier or password invalid.")
            this.error = `Invalid email or password.`
          else
            this.error = `An error occured, please try later.`;
        })
      },
    },
    middleware: ['unauth'],
  };

</script>
