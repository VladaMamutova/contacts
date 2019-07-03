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
              <group-chip :group="item.group" :disabled="true"></group-chip>
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
import Groups from '../types/groups';

@Component({
  components: {
    GroupsBar,
    GroupChip,
  },
})

export default class ContactList extends Vue {
  private sortedContactList: Contact[] = [];
  get contacts(): Contact[] {
    return this.sortByName(this.filterByGroup(this.$store.getters.CONTACTS, this.groupToFilter));
  }
  private created(): void {
    this.$store.dispatch('FILL_CONTACTS_IN_DEFAULT');
  }
  private sortByName(contacts: Contact[]): Contact[] {
    const sortedContactList = contacts.sort(this.compareContacts);
    return sortedContactList;
  }
  private compareContacts(contactA: Contact, contactB: Contact): number {
    if (contactA.fio > contactB.fio) {
      return 1;
    }
    if (contactA.fio < contactB.fio) {
      return -1;
    }
    return 0;
  }
  /**
   * Возвращает отфильтрованный по определённой группу массив контактов.
   * Если переданая группа не определена (group === Groups.None),
   * то будет возвращён изначальный массив контактов.
   * @param contacts - Массив контактов для фильтрации.
   * @param group - Группа контакта для фильтрации массива.
   * @returns Отфильтрованный по группе `group` массив контактов.
   */
  private filterByGroup(contacts: Contact[], group: Groups): Contact[] {
    let filteredContacts = [] as Contact[];
    if (group === Groups.None) {
      filteredContacts = contacts;
    } else {
      filteredContacts = contacts.filter((contact) => contact.group.key === group);
    }
    return filteredContacts;
  }
  get groupToFilter(): Groups {
    return this.$store.getters.GROUP_TO_FILTER;
  }
}
</script>
