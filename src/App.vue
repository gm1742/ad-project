<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          :to="'/'"
          prepend-icon="login"
          text
          class="mr-2"
        >
          <span class="material-icons">
            home
          </span>
          <span>Home</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-for="item of links"
        :key="item.id"
        :to="item.link"
        prepend-icon="login"
        text
        class="mr-2"
      >
        <span class="material-icons">
          {{item.icon}}
        </span>
        <span class="mr-2">{{item.title}}</span>
      </v-btn>
      <v-btn
        v-if="isLoggedInUser"
        @click="onLogout"
        prepend-icon="login"
        text
        class="mr-2"
      >
        <span class="material-icons">
          login
        </span>
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <div class="text-center ma-2" v-if="error">
      <v-snackbar
        :timeout="119000"
        @input="closeError"
        :value="true"
      >
        <div>{{error}}</div>

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="closeError"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    error () {
      return this.$store.getters.error
    },
    isLoggedInUser () {
      return this.$store.getters.isLoggedInUser
    },
    links () {
      if (!this.isLoggedInUser) {
        return [
          { title: 'login', link: '/login', id: '12312', icon: 'login' },
          { title: 'Registration', link: '/registrations', id: '32423423', icon: 'how_to_reg' }
        ]
      }
      if (this.isLoggedInUser) {
        return [
          { title: 'List', link: '/adlist', id: '1dsfdsfsd2312', icon: 'format_list_bulleted' },
          { title: 'New ad', link: '/newad', id: '1dsfdsfsd2332412', icon: 'note_add' },
          { title: 'Orders', link: '/orders', id: '1dsfdsfdsfsd2332412', icon: 'view_list' }
        ]
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
