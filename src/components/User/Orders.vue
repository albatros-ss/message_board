<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list subheader two-line>
          <v-list-tile v-for="order in orders" :key="order.id" avatar>
            <v-list-tile-action>
              <v-checkbox
                :input-value="order.done"
                color="success"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn :to="'/ad/' + order.adId" class="primary">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Orders",
  data() {
    return {
      orders: [
        {
          id: "123",
          name: "Vadim",
          phone: "+380933939393",
          adId: "132",
          done: false
        }
      ]
    };
  },
  methods: {
    markDone(order) {
      order.done = true;
    }
  }
};
</script>

<style scoped></style>
