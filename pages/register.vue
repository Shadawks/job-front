<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-10">
                    <v-toolbar  class="mb-5">
                        <v-toolbar-title class="title flex text-center"><v-icon x-large>mdi-account-plus</v-icon></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                color="white"
                                label="Name"
                                outlined
                                :rules="usernameRules"
                                prepend-icon="mdi-account"
                                type="text"
                                name="username"
                                id="username"
                                v-model="form.username"
                            ></v-text-field>
                            <v-text-field
                                color="white"
                                label="Email"
                                outlined
                                :rules="emailRules"
                                id="email"
                                prepend-icon="mdi-at"
                                name="email"
                                type="email"
                                v-model="form.email"
                            ></v-text-field>
                            <v-text-field
                                color="white"
                                label="Password"
                                outlined
                                :rules="passwordRules"
                                id="password"
                                prepend-icon="mdi-lock"
                                name="password"
                                type="password"
                                v-model="form.password"
                            ></v-text-field>
                            <v-text-field
                                color="white"
                                label="Phone number"
                                outlined
                                id="phone"
                                :rules="phoneRules"
                                prepend-icon="mdi-phone"
                                name="phone"
                                type="phone"
                                v-model="form.phone"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn x-large :disabled="!isFormValid()" @click="register" class="white--text mb-4">Create</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card dark class="d-flex align-center flex-column">
                <v-card-text class="d-flex justify-center mt-3">{{ error }}</v-card-text>
                <v-btn @click="() => {dialog = false}" x-large  class="white--text mb-4">Ok</v-btn>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<script>
export default {
    data() {
        return {
            usernameRules: [ v => !v || v.length > 3 || "" ],
            passwordRules: [ v => !v || v.length >= 8 || "" ],
            phoneRules: [ v => !v || (v.length >= 6 && v.length <= 20 && /^[0-9]+$/.test(v)) || "" ],
            emailRules: [ v => !v || /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || `This email is incorrect`, ],
            form: {
                username: "",
                email: "",
                password: "",
                phone: ""
            },
            success: null,
            error: null,
            dialog: false,
        };
    },
    methods: {
        isFieldValid(v, rules) {
            return v && rules.every((rule) => typeof (rule(v)) != "string")
        },
        isFormValid() {
            return (this.isFieldValid(this.form.username, this.usernameRules) &&
                    this.isFieldValid(this.form.password, this.passwordRules) &&
                    this.isFieldValid(this.form.email, this.emailRules) &&
                    this.isFieldValid(this.form.phone, this.phoneRules));
        },
        async register() {
            this.error = null;
            try {
                await this.$strapi.register({
                    username: this.form.username,
                    email: this.form.email,
                    password: this.form.password,
                    phone: this.form.phone
                })
                this.$router.push('/')
            } catch (e) {
                this.dialog = true
                if (e.response.data.message[0].messages[0].id == "Auth.form.error.email.taken")
                    this.error = "Email is already taken.";
                else
                    this.error = `An error occured, please try later.`;
            }
        },
    },
    middleware: ['unauth'],
};
</script>