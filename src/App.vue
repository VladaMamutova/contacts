<template>
  <v-app>
    <app-header />
    <v-content>
      <nav-bar />
      <contact-list />
      <birthday-list />
      <settings />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader';
import NavBar from './components/NavBar';
import ContactList from './components/ContactList';
import BirthdayList from './components/BirthdayList';
import Settings from './components/Settings';

export default {
  name: 'App',
  components: {
    AppHeader,
    NavBar,
    ContactList,
    BirthdayList,
    Settings,
  },
  data() {
    return {
      //
    };
  },
};
</script>
