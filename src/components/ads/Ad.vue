<template>
    <v-container>
      <v-row v-if="!loading">
        <v-col
          cols="4"
          sm="6"
          xs="12">
          <v-img
            :src="ad.img"
          ></v-img>
        </v-col>
        <v-col
          cols="8"
          sm="6"
          xs="12"
        >
          <v-card>
            <v-card-title>
              <h2>{{ ad.title }}</h2>
            </v-card-title>
            <v-card-subtitle>
              <h4>{{ ad.subtitle }}</h4>
            </v-card-subtitle>
            <v-card-text>
              <p>{{ ad.descriptions }}</p>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions class="pl-3 pb-3">
              <DialogEdit :ad="ad"></DialogEdit>
              <app-by-modal :ad="ad"></app-by-modal>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="align-center justify-center mt-5">
        <v-progress-circular
          class="ma-auto"
          :size="50"
          color="dark"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
</template>

<script>
import EditAd from './EditAd'
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    DialogEdit: EditAd
  },
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>

</style>
