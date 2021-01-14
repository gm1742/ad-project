<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        class="mr-2"
      >
        Buy
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        {{ ad.title }}
      </v-card-title>
      <v-card-actions>
        <v-row class="pl-3 pr-4">
          <v-text-field
            v-model="phone"
            label="You phone"
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="You name"
          ></v-text-field>
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
          @click="buy"
        >
          Buy
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
      phone: '',
      name: ''
    }
  },
  methods: {
    cancel () {
      this.dialog = false
      this.phone = ''
      this.name = ''
    },
    buy () {
      if (this.phone !== '' && this.name !== '') {
        this.$store.dispatch('createOrder', {
          phone: this.phone,
          name: this.name,
          adId: this.ad.id,
          ownId: this.ad.ownId
        })
        console.log({
          phone: this.phone,
          name: this.name,
          adId: this.ad.id,
          ownId: this.ad.ownId
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
