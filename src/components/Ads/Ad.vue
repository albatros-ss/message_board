<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"> </v-img>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <addEditAdModal v-if="isOwner" :ad="ad"></addEditAdModal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import EditAdModal from "./EditAdModal";

export default {
  name: "Ad",
  components: {
    addEditAdModal: EditAdModal
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.getById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      if (this.$store.getters.user) {
        return this.ad.ownerId === this.$store.getters.user.id;
      }
      return false;
    }
  }
};
</script>

<style scoped></style>
