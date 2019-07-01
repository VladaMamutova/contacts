<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="cyan darken-3" dark app>
      <v-toolbar-title class="headline">
        <v-toolbar-side-icon @click.stop="switchDrawerState()"></v-toolbar-side-icon>
        <span class="text-uppercase">Контакты</span>
        <span class="font-weight-light">НайдиВсех</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Поиск"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({})

export default class AppHeader extends Vue {
  // methods
  switchDrawerState() : void {
    this.$store.dispatch('SWITCH_DRAWER_STATE');
  }
}
</script>

<style scoped>
.v-toolbar__title {
    width: 320px;
}
</style>
