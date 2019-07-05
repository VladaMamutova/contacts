<template>
  <v-navigation-drawer v-model=drawerState :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.text" @click="selectPage(item.page)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Pages from '../types/pages';

@Component({})

export default class NavBar extends Vue {
  // data
  private items: Array<{ page: Pages, icon: string, text: string }> = [
    { page: Pages.ContactList, icon: 'contacts', text: 'Все контакты' },
    { page: Pages.BirthdayList, icon: 'event_note', text: 'Дни рождения'},
    { page: Pages.Export, icon: 'import_contacts', text: 'Экспорт'},
  ];
  // computed
  get drawerState(): boolean {
    return this.$store.getters.DRAWER_STATE;
  }
  set drawerState(state) {
    if (!state) {
      this.$store.dispatch('CLOSE_DRAWER');
    }
  }
  private selectPage(page: Pages) {
    this.$store.dispatch('SELECT_PAGE', page);
  }
}
</script>

<style scoped>
.v-list__tile__title {
  font-size: medium;
}
</style>
