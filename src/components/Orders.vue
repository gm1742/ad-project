<template>
  <div>
    <v-row v-if="loading" class="align-center justify-center mt-5">
      <v-progress-circular
        class="ma-auto"
        :size="50"
        color="dark"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <v-container v-else-if="!loading && orders.length !== 0">
      <h1>Orders</h1>
      <v-list
        two-line
        subheader
      >
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Profile photo</v-list-item-title>
            <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Show your status</v-list-item-title>
            <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        subheader
        two-line
        flat
      >
        <v-subheader>Hangout notifications</v-subheader>
        <v-list-item-group
          v-model="settings"
          multiple
        >
          <v-list-item v-for="order of orders">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-row>
                <v-list-item-content>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn
                  color="orange lighten-2"
                  text
                  :to="'/ad/' + order.adId"
                >
                  Open
                </v-btn>
              </v-row>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-row></v-row>
    </v-container>
    <v-row v-else class="align-center justify-center mt-5">
      <v-container>
        <h1>You have no orders</h1>
      </v-container>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'Orders',
  data: () => ({
    settings: []
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

<style scoped>

</style>
