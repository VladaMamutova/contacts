<template>
  <v-app>
    <app-header />
    <v-content>
      <nav-bar />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    AppHeader,
    NavBar
  },
  data () {
    return {
      //
    }
  }
}
</script>
