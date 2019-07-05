<template>
  <v-navigation-drawer v-model=drawerState :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.text" @click="alert('')">
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

@Component({})

export default class NavBar extends Vue {
  // data
  private items: Array<{ icon: string, text: string }> = [
    { icon: 'contacts', text: 'Все контакты' },
    { icon: 'event_note', text: 'Дни рождения'},
    { icon: 'import_contacts', text: 'Экспорт'},
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
}
</script>

<style scoped>
.v-list__tile__title {
  font-size: medium;
}
</style>
