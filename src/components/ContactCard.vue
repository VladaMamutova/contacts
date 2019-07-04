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
              <v-btn flat icon color="primary">
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
              :input="validateEmail(email)" :error-messages="emailErrorMessage" />
            </v-flex>
            <v-flex xs1 class="bottom" v-if="email">
              <v-btn flat icon color="primary">
                <v-icon>remove</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';

@Component({})

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

  get contact(): Contact {
    return this.$store.getters.CURRENT_CONTACT_CLONE;
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

<style scoped>
.unpadding {
  padding: 0px;
}
.bottom {
  margin: auto auto 12px auto;
}
</style>

