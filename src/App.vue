<template>
  <v-app>
    <app-header />
    <v-content>
      <nav-bar />
      <contact-list />
      <birthday-list />
      <import-export-bar />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader';
import NavBar from './components/NavBar';
import ContactList from './components/ContactList';
import BirthdayList from './components/BirthdayList';
import ImportExportBar from './components/ImportExportBar';

export default {
  name: 'App',
  components: {
    AppHeader,
    NavBar,
    ContactList,
    BirthdayList,
    ImportExportBar,
  },
  data() {
    return {
      //
    };
  },
};
</script>
