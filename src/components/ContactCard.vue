<template>
  <v-dialog v-model="dialogState" width="800px">
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">{{ title }}</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs12 align-center justify-space-between>
            <v-layout align-center>
              <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-avatar size="40px" class="mr-3" v-on="on">
                <img :src="contact.photo" alt="Фото контакта">
                </v-avatar>
              </template>
              <span>Нажмите, чтобы просмотреть или загрузить фото</span>
              </v-tooltip>
              <v-text-field label="ФИО" v-model="contact.fio"
              :input="updateContact()"></v-text-field>
            </v-layout>
          </v-flex>
          <v-container fluid class="padding-0">
            <v-layout row class="label">
             <v-flex>
               <v-card-text class="px-0">Телефон</v-card-text>
            </v-flex>
             <v-flex xs1>
                <v-btn flat icon color="primary" @click="addPhoneField()">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout class="padding-0 narrow-row" row v-for="(phone, index) in contact.phones" :key="index">
                <v-text-field auto-grow class="padding-0" :hide-details="true"
                  v-model="contact.phones[index]"
                  :input="updateContact()"
                  type="tel" prepend-icon="phone"
                  placeholder="__ (___) ___ __ __"
                  prefix="+" mask="## (###) ### ## ##"
                ></v-text-field>
              <v-flex xs1 class="bottom">
                <v-btn flat icon color="primary" @click="deletePhoneField(index)">
                  <v-icon>remove</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid class="padding-0 bottom">
            <v-layout row class="label">
             <v-flex class="padding-0">
               <v-card-text class="px-0">Email</v-card-text>
            </v-flex>
             <v-flex xs1>
                <v-btn flat icon color="primary" @click="addEmailField()">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout class="medium-row" row v-for="(email, index) in contact.emails" :key="index">
              <v-flex grow>
                <v-text-field
                prepend-inner-icon="mail" class="padding-0"
                placeholder="Например, ivanpetrov@gmail.com"
                v-model="contact.emails[index]"
                :input="updateEmail(email, index)"
                :error-messages="emailErrorMessages[index]" 
                @blur="validateEmails()"/>
              </v-flex>
              <v-flex xs1 class="bottom">
                <v-btn flat icon color="primary" @click="deleteEmailField(index)">
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
          <v-text-field prepend-inner-icon="business" label="Компания"
            v-model="contact.company" :input="updateContact()"></v-text-field>
          </v-flex>
        <v-flex xs12>
          <v-text-field prepend-inner-icon="language" label="Веб-сайт"
            v-model="contact.website" :input="updateContact()"></v-text-field>
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
    <v-dialog v-model="photoDialog" width="300px">
    <v-card>
      <v-card-title class="grey lighten-4 py-3 title">Фото контакта</v-card-title>
      <v-container>
        <v-flex>
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-flex>
      </v-container>
    </v-card>
   </v-dialog>
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
  private photoDialog: boolean = false;

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

  private updateContact() {
    this.$store.dispatch('UPDATE_CURRENT_CONTACT_CLONE', this.contact);
  }

  private addPhoneField(index: number): void {
    this.contact.phones.push('');
  }

  private deletePhoneField(index: number): void {
    this.contact.phones.splice(index, 1);
  }

  private addEmailField(index: number): void {
    this.contact.emails.push('');
  }

  private deleteEmailField(index: number): void {
    this.contact.emails.splice(index, 1);
  }

  private updateEmail(updatedEmail: string, index: number) {
    if (updatedEmail) {
      this.emailErrorMessages[index] = this.validateEmail(updatedEmail);
    } else {
      this.emailErrorMessages[index] = '';
    }
    this.updateContact();
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
    let array = this.contact.phones.filter((item: string) => item);
    this.contact.phones = array;
    array = this.contact.emails.filter((item: string) => item);
    this.contact.emails = array;
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
    this.emailErrorMessages = [];
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
    this.updateContact();
  }
}
</script>

<style scoped>

.padding-0 {
  padding: 0px;
}

.bottom {
  margin: auto auto 12px auto;
}

.label {
  height: 44px;
}

.narrow-row {
  height: 50px;
}

.medium-row {
  height: 60px;
}

</style>

