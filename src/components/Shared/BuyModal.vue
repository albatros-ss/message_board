<template>
  <v-dialog v-model="modal" width="400px">
    <v-btn slot="activator" class="primary">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you wan't to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                v-model="name"
                name="name"
                label="Your name"
                type="text"
              ></v-text-field>
              <v-textarea
                v-model="phone"
                name="phone"
                label="Your phone"
                type="text"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :disabled="localLoading" @click="onCancel"
                >Close</v-btn
              >
              <v-btn
                flat
                class="success"
                :disabled="localLoading"
                :loading="localLoading"
                @click="onSave"
                >Buy it!</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BuyModal",
  props: {
    ad: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      modal: false,
      name: "",
      phone: "",
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      this.name = "";
      this.phone = "";
      this.modal = false;
    },
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.$store.getters.user.id
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.modal = false;
          });
      }
    }
  }
};
</script>

<style scoped></style>
