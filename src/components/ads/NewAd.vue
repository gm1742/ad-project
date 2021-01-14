<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          xs="12"
          class="ma-auto justify-center"
        >
          <h1>New ad</h1>
          <v-form v-model="valid" ref="form" validation>
            <v-text-field
              v-model="title"
              :rules="[rules.required]"
              label="Title"
            ></v-text-field>
            <v-text-field
              v-model="subtitle"
              :rules="[rules.required]"
              type="text"
              name="input-10-1"
              label="Subtitle"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-textarea
              v-model="descriptions"
              :rules="[rules.required]"
              type="text"
              name="input-10-1"
              label="Text"
              @click:append="show1 = !show1"
            ></v-textarea>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          xs="12"
          class="ma-auto justify-center"
        >
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="fileUpload"
          >
            Upload
            <v-icon
              right
              dark
            >
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          <input
            type="file"
            name="fileUpload"
            ref="fileUpload"
            accept="image/*"
            style="display: none"
            @change="onFileChange"
          >
          <img src="" height="100px">
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          xs="12"
          class="ma-auto justify-center"
        >
          <img :src="imgSrc" v-if="imgSrc" class="imageUpload">
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          xs="12"
          class="ma-auto justify-center"
        >
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="!valid || !img || loading"
            @click="createAd"
          >
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'NewAd',
  data () {
    return {
      show1: false,
      valid: false,
      title: '',
      show: false,
      img: null,
      imgSrc: '',
      subtitle: '',
      descriptions: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => (`The email and password you entered don't match`),
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() || this.img) {
        const ad = {
          title: this.title,
          subtitle: this.subtitle,
          descriptions: this.descriptions,
          show: this.show,
          img: this.img
        }
        console.log(ad)
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/adlist')
          }).catch(() => {})
      }
    },
    fileUpload () {
      return this.$refs.fileUpload.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = ev => {
        this.imgSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.img = file
    }
  }
}
</script>

<style scoped>
.imageUpload{
  max-width: 150px;
  height: auto;
  object-fit: cover;
  object-position: center;
}
</style>
