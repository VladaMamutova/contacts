<template>
  <v-layout row v-show="isSelectedPage()">
    <v-flex xs12 sm10 offset-sm1>
     <v-card>
      <v-list subheader>
         <v-subheader>Настройки</v-subheader>
         <div class="button">
           <v-btn large @click="fillDefaultContactList()">Cписок по умолчанию</v-btn>
           <v-btn large @click="clearContactList()">Очистить список</v-btn>
         </div>
       </v-list>
     </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Pages from '../types/pages';

@Component({})

export default class ImportExportBar extends Vue {
  private isSelectedPage(): boolean {
    return this.$store.getters.SELECTED_PAGE === Pages.Settings;
  }

  private fillDefaultContactList() {
    this.$store.dispatch('FILL_CONTACTS_IN_DEFAULT');
  }

  private clearContactList() {
    this.$store.dispatch('CLEAR_CONTACTS');
  }
}
</script>

<style lang="css" scoped>
.button {
  margin: 5px 35px 5px 35px;
}
</style>
