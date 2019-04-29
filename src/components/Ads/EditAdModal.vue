<template>
  <v-dialog v-model="modal" width="400px">
    <v-btn slot="activator" class="warning mr-2">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                v-model="editedTitle"
                name="title"
                label="Title"
                type="text"
              ></v-text-field>
              <v-textarea
                v-model="editedDescription"
                name="description"
                label="Description"
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
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn flat class="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditAdModal",
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
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    };
  },
  methods: {
    onCancel() {
      this.editedDescription = this.ad.description;
      this.editedTitle = this.ad.title;
      this.modal = false;
    },
    onSave() {
      if (this.editedDescription !== "" && this.editedTitle !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        });
        this.modal = false;
      }
    }
  }
};
</script>

<style scoped></style>
