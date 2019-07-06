<template>
  <v-layout row v-show="isSelectedPage()">
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
        <v-list subheader>
          <v-subheader>Все контакты</v-subheader>
          <groups-bar />
          <v-list-tile v-for="contact in contacts" :key="contact.id" avatar @click="showDialog(contact.id)">
            <v-list-tile-avatar><img :src="contact.photo"></v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="contact.fio"></v-list-tile-title>
              <v-list-tile-sub-title v-html="contact.getFormattedMainPhoneNumber()"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action-text v-if="contact.isInGroup()">
              <group-chip :group="contact.group" :disabled="true"></group-chip>
            </v-list-tile-action-text>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-btn fab bottom right color="primary" dark fixed @click="showDialog()">
      <v-icon>add</v-icon>
    </v-btn>
    <contact-card></contact-card>
  </v-layout>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';
import Groups from '../types/groups';
import GroupsBar from './GroupsBar.vue';
import GroupChip from './GroupChip.vue';
import ContactCard from './ContactCard.vue';
import Pages from '../types/pages';

@Component({
  components: {
    GroupsBar,
    GroupChip,
    ContactCard,
  },
})

export default class ContactList extends Vue {
  get contacts(): Contact[] {
    // Копируем массив контактов, чтобы фильтрация
    // и сортировка не изменяли источник.
    const contacts = this.$store.getters.CONTACTS.slice(0);
    return this.sortByName(this.filterByGroup(contacts, this.groupToFilter));
  }

  private isSelectedPage(): boolean {
    return this.$store.getters.SELECTED_PAGE === Pages.ContactList;
  }

  private showDialog(contactId: number = -1): void {
    this.$store.dispatch('SELECT_CONTACT_ID', contactId);
    this.$store.dispatch('SHOW_DIALOG');
  }

  private sortByName(contacts: Contact[]): Contact[] {
    return contacts.sort(this.compareContacts);
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
