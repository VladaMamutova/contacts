<template>
  <v-app>
    <app-header />
    <v-content>
      <nav-bar />
      <contact-list />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader';
import NavBar from './components/NavBar';
import ContactList from './components/ContactList';

export default {
  name: 'App',
  components: {
    AppHeader,
    NavBar,
    ContactList,
  },
  data() {
    return {
      //
    };
  },
};
</script>
