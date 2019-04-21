<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form ref="form" v-model="valid" validation class="mb-3">
          <v-text-field
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
            name="title"
            label="Ad title"
            type="text"
          ></v-text-field>
          <v-textarea
            id="password"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
            name="description"
            label="Ad description"
            type="text"
          ></v-textarea>
        </v-form>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-btn class="warning">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <img src="" alt="" height="100px" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-switch
              v-model="promo"
              color="primary"
              label="Add to promo?"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              class="success"
              :disabled="!valid || loading"
              @click="createAd"
              >Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NewAd",
  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc:
            "https://proglib.io/wp-content/uploads/2018/07/1_qnI8K0Udjw4lciWDED4HGw.png"
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style scoped></style>
