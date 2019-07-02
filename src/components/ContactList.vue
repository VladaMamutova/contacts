<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>

        <v-list subheader>
          <v-subheader>Все контакты</v-subheader>

          <groups-bar />

          <v-list-tile
            v-for="item in contacts"
            :key="item.fio"
            avatar
          >
            <v-list-tile-avatar>
              <img :src="item.photo">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.fio"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.phones[0]"></v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action-text v-if="item.isInGroup()">
              <group-chip :group="item.group"></group-chip>
            </v-list-tile-action-text>
          </v-list-tile>
        </v-list>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import GroupsBar from './GroupsBar.vue';
import Contact from '../types/contact';
import GroupChip from './GroupChip.vue';

@Component({
  components: {
    GroupsBar,
    GroupChip,
  }
})

export default class ContactList extends Vue {
  get contacts(): Contact[] {
    return this.$store.getters.CONTACTS;
  }
  private created(): void {
    this.$store.dispatch('FILL_CONTACTS_IN_DEFAULT');
  }
}
</script>
