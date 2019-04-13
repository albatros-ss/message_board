<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                prepend-icon="person"
                name="email"
                label="email"
                type="email"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="password"
                :rules="passwordRules"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
              <v-text-field
                id="confirmPassword"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                prepend-icon="lock"
                name="confirm-password"
                label="Confirm Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid || loading"
              @click="onSubmit"
              >Create account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Name is required",
        v =>
          (v && v.length >= 6) || "Password must be equal or more 6 characters"
      ],
      confirmPasswordRules: [
        v => !!v || "Name is required",
        v => v === this.password || "Password should match"
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("registerUser", user)
          .then(() => this.$router.push("/"))
          .catch(() => {});
      }
    }
  }
};
</script>

<style scoped></style>
