<template>
  <v-dialog v-model="dialogState" width="800px">
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">{{ title }}</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex align-center justify-space-between>
            <v-layout align-center row wrap>
              <v-flex class="contact-photo-box">
              <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-avatar size="50px" class="mr-3" v-on="on">
                <img :src="contact.photo" class="contact-photo"
                  alt="Фото контакта" @click="showPhotoDialog()">
                </v-avatar>
              </template>
              <span>Нажмите, чтобы просмотреть или загрузить фото</span>
              </v-tooltip>
              </v-flex>
              <v-flex grow>
                <v-text-field label="ФИО" class="big-text-field" v-model="contact.fio"
                :input="updateContact()"></v-text-field>
              </v-flex>
              <v-flex>
                <v-combobox v-model="selectedGroup"
                :items="groupsName" chips placeholder="Не определена"
                  clearable prepend-inner-icon="group" label="Группа">
                  <template v-slot:selection="data">
                    <v-chip :selected="data.selected" :color="contact.group.color"
                      text-color="white" close @input="remove(data.item)">
                      <strong>{{ data.item }}</strong>&nbsp;
                    </v-chip>
                  </template>
                </v-combobox>
              </v-flex>
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
          <v-layout row wrap>
            <v-flex>
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
             :nudge-right="40" lazy transition="scale-transition"
              offset-y full-width max-width="290px" min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="dateFormatted" label="Дата рождения"
                  persistent-hint prepend-inner-icon="event"
                  @blur="date = parseDate(dateFormatted)" readonly v-on="on"/>
              </template>
              <v-date-picker v-model="contact.birthday" locale="ru" no-title
              @input="menu = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex>
              <v-text-field prepend-inner-icon="business" label="Компания"
                v-model="contact.company" :input="updateContact()">
              </v-text-field>
            </v-flex>
          </v-layout>
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
            <v-img :src="currentPhoto" aspect-ratio="1" class="grey darken-4"></v-img>
          </v-card>
        </v-flex>
        <v-flex grow class="py-2">
          <v-layout class="py-1">URL</v-layout>
          <v-textarea class="margin-0" v-model="photo" no-resize box rows="3"></v-textarea>
        </v-flex>
      </v-container>
      <v-card-actions>
         <v-spacer></v-spacer>
        <v-btn flat @click="savePhoto()">Сохранить</v-btn>
        <v-btn flat color="primary" @click="closePhotoDialog()">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
   </v-dialog>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Contact from '../types/contact';
import Group from '../types/group';
import Groups from '../types/groups';

@Component({})

export default class ContactCard extends Vue {
  private title: string = '';
  private action: string = '';
  private deleteAction: string = '';

  private emailMask: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z]{2,4}$/;
  private emailErrorMessages: string[] = [];

  private menu: boolean = false;

  private groups: Group[] = [new Group(Groups.Family),
    new Group(Groups.Friends), new Group(Groups.Сolleagues)];
  private defaultPhoto: string = new Contact().photo;

  get dialogState() {
    return this.$store.getters.DIALOG_STATE;
  }

  set dialogState(state: boolean) {
      if (!state) {
        this.closeDialog();
      }
  }

  get photoDialog(): boolean {
    return this.$store.getters.PHOTO_DIALOG_STATE;
  }

  set photoDialog(state: boolean) {
      if (state) {
        this.$store.dispatch('SHOW_PHOTO_DIALOG');
      } else {
        this.$store.dispatch('CLOSE_PHOTO_DIALOG');
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

  get currentPhoto(): string {
    return this.$store.getters.CURRENT_PHOTO;
  }

  set currentPhoto(value: string) {
    this.$store.dispatch('SET_CURRENT_PHOTO', value);
  }

  get photo() {
    if (this.currentPhoto === this.defaultPhoto) {
      return '';
    } else {
      return this.currentPhoto;
    }
  }

  set photo(value: string) {
    const img: HTMLImageElement = new Image();
    img.src = value;
    img.onload = () => { this.currentPhoto =  value; };
    img.onerror = () => { this.currentPhoto = this.defaultPhoto; };
  }

  get selectedGroup(): string {
    if (this.contact.group.key === Groups.None) {
      return '';
    } else {
      return this.contact.group.name;
    }
  }

  set selectedGroup(value: string) {
    this.contact.group = this.groups.find(
      (group: Group) => group.name === value) || new Group(Groups.None);
    this.updateContact();
  }

  get groupsName(): string[] {
    return this.groups.map((group: Group) => group.name);
  }

  private savePhoto(): void {
    this.contact.photo = this.currentPhoto;
    this.photoDialog = false;
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

  private remove(item: string): void {
    this.contact.group = new Group(Groups.None);
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

  private showPhotoDialog(): void {
    this.photo = this.contact.photo;
    this.photoDialog = true;
  }

  private closePhotoDialog(): void {
    this.photoDialog = false;
  }

  private closeDialog(): void {
    this.title = '';
    this.action = '';
    this.deleteAction = '';
    this.emailErrorMessages = [];
    this.$store.dispatch('CLOSE_DIALOG');
    this.$store.dispatch('SET_CURRENT_PHOTO', '');
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

<style>

.padding-0 {
  padding: 0px;
}

.big-text-field {
  margin-top: 14px;
}

.v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
  margin: 0px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px;
    height: 0px;
}

.container {
  padding-bottom: 0px;
}

.contact-photo-box {
  max-width: 60px;
}

.contactPhoto {
  object-fit: cover;
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

