<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>

        <v-list subheader>
          <v-subheader>Все контакты</v-subheader>
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

            <v-list-tile-action-text v-show="item.groupName != ''">
              <v-chip color="secondary" text-color="white">
                {{ item.groupName }}
              </v-chip>
            </v-list-tile-action-text>
          </v-list-tile>
        </v-list>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';

@Component({})

export default class ContactList extends Vue {
  get contacts(): Contact[] {
    return this.$store.getters.CONTACTS;
  }
  private created(): void {
    this.$store.dispatch('FILL_CONTACTS_IN_DEFAULT');
  }
}
</script>
