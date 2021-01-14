<template>
  <div>
    <v-container>
      <v-container>
        <v-row no-gutters justify="center">
          <v-col
            cols="6"
          >
            <h2>Registration</h2>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="You e-mail"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.confirmPasswordRules, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm password"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn
                color="primary"
                @click="submit"
                :disabled="!valid || loading"
                :loading="loading"
              >
                Create
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      show1: false,
      valid: false,
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Required.',
        confirmPasswordRules: value => value === this.password || 'Password should match.',
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
    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
