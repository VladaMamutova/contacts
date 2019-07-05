<template>
    <v-dialog v-model="dialogState" width="800px">
      <v-card>
    <v-card-title class="grey lighten-4 py-4 title">{{ title }}</v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12 align-center justify-space-between>
          <v-layout align-center>
            <v-avatar size="40px" class="mr-3">
              <img :src="contact.photo"
                alt="Фото контакта">
            </v-avatar>
            <v-text-field placeholder="ФИО контакта" v-model="contact.fio"></v-text-field>
          </v-layout>
        </v-flex>
        <v-container fluid class="unpadding">
          <v-layout row v-for="(phone, index) in contact.phones" :key="index">
            <v-flex grow>
              <v-text-field
                v-model="contact.phones[index]"
                :input="updatePhoneTextField(phone, index)"
                type="tel" prepend-icon="phone"
                placeholder="__ (___) ___ __ __"
                prefix="+" mask="## (###) ### ## ##"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 class="bottom" v-if="phone">
              <v-btn flat icon color="primary" @click="updatePhoneTextField('', index)">
                <v-icon>remove</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid class="unpadding">
          <v-layout row v-for="(email, index) in contact.emails" :key="index">
            <v-flex grow>
              <v-text-field
              prepend-inner-icon="mail"
              placeholder="Email"
              v-model="contact.emails[index]"
              :input="updateEmailTextField(email, index)"
              :error-messages="emailErrorMessages[index]" 
              @blur="validateEmails()"/>
            </v-flex>
            <v-flex xs1 class="bottom" v-if="email">
              <v-btn flat icon color="primary" @click="updateEmailTextField('', index)">
                <v-icon>remove</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
       <v-flex xs4>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
        :nudge-right="40" lazy transition="scale-transition"
        offset-y full-width max-width="290px" min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field v-model="dateFormatted" label="Дата рождения"
            persistent-hint prepend-icon="event"
            @blur="date = parseDate(dateFormatted)" readonly v-on="on"/>
        </template>
        <v-date-picker v-model="contact.birthday" locale="ru" no-title
        @input="menu = false"></v-date-picker>
        </v-menu>
    </v-flex>
         <v-flex xs8>
          <v-text-field prepend-inner-icon="business" placeholder="Компания" v-model="contact.company"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field prepend-inner-icon="language" placeholder="Веб-сайт" v-model="contact.website"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn flat v-if="deleteAction" color="error" @click="deleteContact()">{{ deleteAction }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat @click="performAction()">{{ action }}</v-btn>
      <v-btn flat color="primary" @click="closeDialog()">Закрыть</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';

@Component({})

export default class ContactCard extends Vue {
  private title: string = '';
  private action: string = '';
  private deleteAction: string = '';

  private emailMask: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z]{2,4}$/;
  private emailErrorMessages: string[] = [];

  private menu: boolean = false;

  get dialogState() {
      return this.$store.getters.DIALOG_STATE;
  }

  set dialogState(state: boolean) {
      if (!state) {
        this.closeDialog();
      }
  }

  get contact(): Contact {
    const clone = this.$store.getters.CURRENT_CONTACT_CLONE;

    if (clone.id === -1) {
      this.title = 'Новый контакт';
      this.action = 'Создать';
    } else {
      this.title = 'Просмотр контакта';
      this.action = 'Изменить';
      this.deleteAction = 'Удалить';
    }
    if (clone.phones.length === 0) {
      clone.phones.push('');
    }
    if (clone.emails.length === 0) {
      clone.emails.push('');
    }

    return clone;
  }

  set contact(value: Contact) {
    this.$store.dispatch('UPDATE_CURRENT_CONTACT_CLONE', value);
  }

  private updatePhoneTextField(updatedPhone: string, index: number): void {
    if (!updatedPhone && index !== this.contact.phones.length - 1) {
      this.contact.phones.splice(index, 1);
    }
    if (updatedPhone && index === this.contact.phones.length - 1) {
      this.contact.phones.push('');
    }
  }

  private updateEmailTextField(updatedEmail: string, index: number): void {
    if (!updatedEmail && index !== this.contact.emails.length - 1) {
      this.contact.emails.splice(index, 1);
    }
    if (updatedEmail && index === this.contact.emails.length - 1) {
      this.contact.emails.push('');
    }
  }

  private validateEmails(): void {
    this.emailErrorMessages = [];
    for (let i = 0; i < this.contact.emails.length; i++) {
      this.emailErrorMessages[i] = this.validateEmail(this.contact.emails[i]);
    }
  }

  private validateEmail(value: string): string {
    let errorMessage = '';
    if (value != null && typeof value !== 'undefined') {
      value = value.trim();
    }
    if (value && !this.emailMask.test(value)) {
      errorMessage = 'Некорректный e-mail адрес.';
    }

    return errorMessage;
  }

  private performAction(): void {
    this.$store.dispatch('UPDATE_CONTACT', this.contact);
    this.closeDialog();
  }

  private deleteContact(): void {
    this.$store.dispatch('DELETE_CONTACT', this.contact);
    this.closeDialog();
  }

  private closeDialog(): void {
    this.title = '';
    this.action = '';
    this.deleteAction = '';
    this.$store.dispatch('CLOSE_DIALOG');
  }

  private formatDate(date: string): string {
    if (!date) {
      return '';
    }
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
  }

  private parseDate(date: string): string {
    if (!date) {
      return '';
    }
    const [month, day, year] = date.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  get dateFormatted(): string {
    return this.formatDate(this.contact.birthday.substr(0, 10));
  }

  set dateFormatted(date: string) {
    if (date === null) {
      this.contact.birthday = '';
    } else {
      this.contact.birthday = date;
    }
  }
}
</script>

<style scoped>
.unpadding {
  padding: 0px;
}
.bottom {
  margin: auto auto 12px auto;
}
</style>

