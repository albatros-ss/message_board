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
            <v-btn class="warning" @click="triggerUpload">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
              <input
                ref="fileInput"
                type="file"
                style="display: none;"
                accept="image/*"
                @change="onFileChange"
              />
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <img :src="imageSrc" alt="" height="100px" :v-if="imageSrc" />
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
              :disabled="!valid || !image || loading"
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
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>

<style scoped></style>
