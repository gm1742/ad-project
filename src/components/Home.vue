<template>
  <div class="home">
    <v-container v-if="!loading">
      <h1>Home</h1>
      <v-row>
        <v-col
          v-for="card of ad"
          :key="card.id"
          cols="12"
          sm="4"
          xs="12"
        >
          <v-card>
            <v-img
              :src="card.img"
              height="200px"
            ></v-img>
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
                :to="'/ad/' + card.id"
              >
                Open
              </v-btn>
              <app-by-modal :ad="card"></app-by-modal>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="card.show = !card.show"
              >
                <v-icon>{{ card.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="card.show">
                <v-divider></v-divider>
                <v-card-text>{{ card.descriptions }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="align-center justify-center mt-5">
        <v-progress-circular
          class="ma-auto"
          :size="50"
          color="dark"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    ad () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
