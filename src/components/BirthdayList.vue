<template>
  <v-layout row v-show="isSelectedPage()">
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
        <v-list subheader>
          <v-subheader>Дни рождения</v-subheader>
          <v-list-tile v-for="contact in contacts" :key="contact.id" avatar @click="showDialog(contact.id)">
            <v-list-tile-avatar><img :src="contact.photo"></v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="contact.fio"></v-list-tile-title>
              <v-list-tile-sub-title v-html="contact.getFormattedBirthday()"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';
import Groups from '../types/groups';
import Pages from '../types/pages';

@Component({})

export default class BirthdayList extends Vue {
  private isSelectedPage(): boolean {
    return this.$store.getters.SELECTED_PAGE === Pages.BirthdayList;
  }

  get contacts(): Contact[] {
    // Копируем массив контактов, чтобы фильтрация
    // и сортировка не изменяли источник.
    let contacts: Contact[] = this.$store.getters.CONTACTS.slice(0);
    contacts = contacts.filter((contact: Contact) => contact.birthday);
    contacts = this.sortByBirthday(contacts);
    return contacts;
  }

  private showDialog(contactId: number = -1): void {
    this.$store.dispatch('SELECT_CONTACT_ID', contactId);
    this.$store.dispatch('SHOW_DIALOG');
  }

  private sortByBirthday(contacts: Contact[]): Contact[] {
    contacts.sort(this.compareContacts);
    const birthdayArray = [] as string[];
    contacts.forEach((contact) => {
      birthdayArray.push(contact.getMonthDateOfBirthday());
    });
    const monthDayOfNow = (new Date().getMonth() + 1).toString().padStart(2, '0') +
      new Date().getDay().toString().padStart(2, '0');
    const nextBirthday = this.binary_search(birthdayArray, monthDayOfNow);
    const array: Contact[] = [];
    for (let i = nextBirthday; i < contacts.length; i++) {
      array[i - nextBirthday] = contacts[i];
    }
    Array.prototype.push.apply(array, contacts.splice(0, nextBirthday));
    return array;
  }

  private compareContacts(contactA: Contact, contactB: Contact): number {
    const birthdayA: string = contactA.getMonthDateOfBirthday();
    const birthdayB: string = contactB.getMonthDateOfBirthday();

    let result = 0;
    if (birthdayA > birthdayB) {
      result = 1;
    } else if (birthdayA < birthdayB) {
      result = -1;
    }

    return result;
  }

  private binary_search(list: string[], item: string): number {
  let low = 0;
  let high = list.length - 1;

  let mid = 0;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    const guess = list[mid];
    if (guess === item) {
      return mid;
    }
    if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return mid;
}
}
</script>
