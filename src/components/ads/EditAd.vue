<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="isOwnUser"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        class="mr-2"
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Edit ad
      </v-card-title>
      <v-card-actions>
        <v-row class="pl-3 pr-4">
          <v-text-field
            v-model="title"
            label="Edit title"
          ></v-text-field>
          <v-text-field
            v-model="subtitle"
            label="Edit descriptions"
          ></v-text-field>
          <v-textarea
            v-model="descriptions"
            type="text"
            label="Edit text"
            ></v-textarea>
        </v-row>
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="confirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      dialog: false,
      title: this.ad.title,
      subtitle: this.ad.subtitle,
      descriptions: this.ad.descriptions
    }
  },
  computed: {
    isOwnUser () {
      if (this.$store.getters.isLoggedInUser) {
        if (this.ad.ownId === this.$store.getters.user.id) {
          return true
        }
      }
    }
  },
  methods: {
    cancel () {
      this.dialog = false
      this.title = this.ad.title
      this.subtitle = this.ad.subtitle
      this.descriptions = this.ad.descriptions
    },
    confirm () {
      if (this.title !== '' && this.descriptions !== '' && this.subtitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.title,
          subtitle: this.subtitle,
          descriptions: this.descriptions,
          id: this.ad.id
        })
        this.dialog = false
      }
    }
  }
}
</script>

<style scoped>

</style>
