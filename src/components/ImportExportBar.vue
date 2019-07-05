<template>
<div>
<v-layout row v-show="isSelectedPage()">
  <v-flex xs12 sm10 offset-sm1>
   <v-card>
    <v-list subheader>
       <v-subheader>Импорт</v-subheader>
       <div class="button">
         <v-btn large color="primary" @click="uploadFromLocalStorage()">С локального хранилища</v-btn>
         <v-btn large @click="fillDefaultContactList()">Список по умолчанию</v-btn>
         <v-btn large @click="clearContactList()">Очистить список</v-btn>
       </div>
     </v-list>
   </v-card>
  </v-flex>
</v-layout>
<v-layout row v-show="isSelectedPage()">
  <v-flex xs12 sm10 offset-sm1>
   <v-card>
     <v-list subheader>
       <v-subheader>Экспорт</v-subheader>
      <v-btn large color="primary" class="button" @click="loadToLocalStorage()">В локальное хранилище</v-btn>
     </v-list>
   </v-card>
  </v-flex>
</v-layout>
</div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Pages from '../types/pages';

@Component({})

export default class ImportExportBar extends Vue {
  private isSelectedPage(): boolean {
    return this.$store.getters.SELECTED_PAGE === Pages.ImportExport;
  }

  private loadToLocalStorage() {
    this.$store.dispatch('LOAD_TO_LOCAL_STORAGE');
  }

  private uploadFromLocalStorage() {
    this.$store.dispatch('UPLOAD_FROM_LOCAL_STORAGE');
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

