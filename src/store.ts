import Vue from 'vue';
import Vuex from 'vuex';
import Contact from './types/contact';
import { Group } from './types/group';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerState: true, // Состояние выдвижного меню.
    contacts: [] as Contact[],
  },
  getters : {
    DRAWER_STATE: (state) => {
      return state.drawerState;
    },
    CONTACTS: (state) => {
      return state.contacts;
    },
  },
  mutations: {
    SWITCH_DRAWER_STATE: (state): void => {
      state.drawerState = !state.drawerState;
    },
    CLOSE_DRAWER: (state): void => {
      state.drawerState = false;
    },
    FILL_CONTACTS_IN_DEFAULT: (state, payload: Contact[] ): void => {
      state.contacts = payload;
    },
  },
  actions: {
    SWITCH_DRAWER_STATE: async (context) => {
      context.commit('SWITCH_DRAWER_STATE');
    },
    CLOSE_DRAWER: async (context) => {
      context.commit('CLOSE_DRAWER');
    },
    FILL_CONTACTS_IN_DEFAULT: async (context) => {
      const defaultContacts: Contact[] = [
        new Contact('Сестричка', ['+380713333333'], Group.Family,
        ['likamamutova@gmail.com', 'likamamutova@yandex.ru'], 'https:\\vk.com\likamamutova', '11.07.2000',
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/d4537dd9748a1f' +
        '5ae17faba22640ee02/5DB829CF/t51.2885-19/s150x150/49756238_337247823540542' +
        '_2823749351384285184_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Мама', ['+380716767666'], Group.Family,
        ['tatyanamamutova@gmail.com'], undefined, '11.06.1973'),
        new Contact('Папа', ['+380718989888'], Group.Family,
        ['alexmamutov@gmail.com'], undefined, '06.04.1973'),
        new Contact('Алина Ермолаева', ['+380714545454'], Group.Friends,
        ['mandxalinka@gmail.com'], 'https://www.behance.net/mandxalinka', '08.01.1999',
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/d8b7f85e448d41be55' +
        'babdcbe397c826/5DBD6E53/t51.2885-19/s150x150/41726968_1085408181626092' +
        '_597941335449665536_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Катя Головачёва', ['+380719090999'], Group.Friends,
        ['ekaterinagolovachova@gmail.com'], '', '05.07.1999',
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/a166d138' +
        'b8febccedee2b00812c8d3ab/5DC3F72C/t51.2885-15/e35/13687028' +
        '_1033094640071914_701415249_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Дубянская Анастасия Олеговна', ['+380712345678']),
        new Contact('Владислава Колосова', ['+380711212111'], Group.Сolleagues,
        ['vladislavakolosova@gmail.com'], 'https:\\github.com\vladislavakolosova', undefined,
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/a0bd7f0b' +
        '7d41539e2143565aa9675c81/5DC4C658/t51.2885-19/s150x150/17076485' +
        '_1219216521508731_699949115127103488_a.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Владислав Овдейчук', ['+380713636333'], Group.Сolleagues,
        ['vladislavovdeychyk@gmail.com'], 'https:\\github.com\vladislavovdeychyk'),
        new Contact('Морозов Кирилл Константинович', ['+380710099876']),
        new Contact('Иванченко Юрий Сергеевич', ['+380716543111'], Group.Сolleagues),
      ];
      context.commit('FILL_CONTACTS_IN_DEFAULT', defaultContacts);
    },
  },
});
