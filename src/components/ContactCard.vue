<template>
    <v-dialog v-model="dialogState" width="800px">
      <v-card>
    <v-card-title class="grey lighten-4 py-4 title">
      Новый контакт
    </v-card-title>
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
        <v-flex xs11>
          <v-text-field
            v-for="(phone, index) in contact.phones"
            :key="index" v-model="contact.phones[index]"
            type="tel" prepend-icon="phone"
            placeholder="__ (___) ___ __ __"
            prefix="+" mask="## (###) ### ## ##"
          ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn flat icon color="primary">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs11>
          <v-text-field v-for="(email, index) in contact.emails"
          :key="index" prepend-inner-icon="mail"
          placeholder="Email"
          v-model="contact.emails[index]"
          :input="validateEmail(email)" :error-messages="emailErrorMessage" />
        </v-flex>
        <v-flex xs1>
          <v-btn flat icon color="primary">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
       <v-flex xs4>
          <v-text-field prepend-inner-icon="event_note" placeholder="День рождения" v-model="contact.birthday"></v-text-field>
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
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="closeDialog()">Закрыть</v-btn>
      <v-btn flat @click="closeDialog()">Изменить</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';

@Component({
  props: {
    contact: {
      type: Contact,
      required: false,
      default: new Contact('', ['']),
    },
  },
})

export default class ContactCard extends Vue {
  private emailMask: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z]{2,4}$/;
  private emailErrorMessage: string = '';

  get dialogState() {
      return this.$store.getters.DIALOG_STATE;
  }
  set dialogState(state: boolean) {
      if (!state) {
        this.closeDialog();
      }
  }
  private validateEmail(value: string): void {
    if (value != null && typeof value !== 'undefined') {
      value = value.trim();
    }
    if (value && !this.emailMask.test(value)) {
      this.emailErrorMessage = 'Некорректный e-mail адрес.';
    } else {
      this.emailErrorMessage = '';
    }
  }
  private closeDialog(): void {
    this.$store.dispatch('CLOSE_DIALOG');
  }
}
</script>

