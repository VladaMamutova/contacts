import Vue from 'vue';
import Vuex from 'vuex';
import Contact from './types/contact';
import Groups from './types/groups';
import Pages from './types/pages';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerState: true, // Состояние выдвижного меню.
    selectedPage: Pages.ContactList, // Выбранная страница меню.
    contacts: [] as Contact[], // Список контактов.
    currentContactId: -1, // Id текущего просматриваемого контакта.
    currentContactClone: new Contact(), // Копия текущего контакта (редактируемая).
    groupToFilter: Groups.None, // Группа, по которой отфильтрован список контактов.
    dialogState: false, // Состояние диалогового окна карточки контакта.
  },
  getters : {
    DRAWER_STATE: (state) => {
      return state.drawerState;
    },
    SELECTED_PAGE: (state) => {
      return state.selectedPage;
    },
    CONTACTS: (state) => {
      return state.contacts;
    },
    CURRENT_CONTACT_ID: (state) => {
      return state.currentContactId;
    },
    CURRENT_CONTACT_CLONE: (state) => {
      return state.currentContactClone;
    },
    GROUP_TO_FILTER: (state) => {
      return state.groupToFilter;
    },
    DIALOG_STATE: (state) => {
      return state.dialogState;
    },
  },
  mutations: {
    // Мутации списка контактов.
    ADD_CONTACT: (state, payload: Contact): void => {
      let newId: number = -1;
      let index: number = -1;
       // Генерируем уникальный id контакта.
      do {
        newId = Math.floor(Math.random() * 50000);
        index = state.contacts.findIndex((contact) => contact.id === newId);
      }
      while (index > -1);
      // Изменяем id на сгенерированный и добавляем в список контактов.
      payload.id = newId;
      state.contacts.push(payload);
    },
    SET_CONTACT: (state, payload: Contact): void => {
      const index = state.contacts.findIndex((contact) => contact.id === payload.id);
      if (index > -1) {
        state.contacts[index].set(payload);
      }
    },
    DELETE_CONTACT: (state, payload: Contact): void => {
      const index = state.contacts.findIndex((contact) => contact.id === payload.id);
      if (index > -1) {
        const newContactList = [];
        for (let i = 0; i < state.contacts.length; i++) {
          if (i !== index) {
            newContactList.push(state.contacts[i]);
          }
        }
        state.contacts = newContactList;
      }
    },
    SET_CURRENT_CONTACT_ID: (state, payload: number): void => {
      // Установка id текущего контакта и его клона при валидном id.
      const index = state.contacts.findIndex((contact) => contact.id === payload);
      state.currentContactId = payload;
      if (index > -1) {
        state.currentContactClone = state.contacts[index].clone();
      } else {
        state.currentContactClone = new Contact();
      }
    },
    SET_CURRENT_CONTACT_CLONE: (state, payload: Contact): void => {
      state.currentContactClone = payload;
    },
    CLEAR_CONTACTS: (state): void => {
      state.contacts = [];
    },
    // Сохранение списка контактов в localStorage.
    LOAD_TO_LOCAL_STORAGE: (state): void => {
      // Сериализуем список контактов.
      for (let i = 0; i < state.contacts.length; i++) {
        const serialObj = JSON.stringify(state.contacts[i]);
        // Записываем его в хранилище по ключу "ContactsFindAll"
        localStorage.setItem(i.toString(), serialObj);
        // console.log(i.toString());
        // console.log(serialObj);
      }
    },
    // UPLOAD_FROM_LOCAL_STORAGE: (state): void => {
      // for (let i = 0; i < localStorage.length; i++) {
        // const key = localStorage.key(i);
        // if (key !== null) {
        // let v = JSON.parse(key);
          // console.log(v);
          // console.log(v.id);
          // const contact = JSON.parse(key, function(key, value) {
            // if (key === 'id') {
              // return Number.parseInt(value, 10);
            // }
            // if (key === 'fio') {
              // return value;
            // }
            // return value;
          // });
          // console.log(key);
          // const item = JSON.parse(key);

          // console.log(contact);
          // console.log(contact.fio);
          // const contact = JSON.parse(item);
          // console.log(contact.id);
          // const item = localStorage.getItem(key);
          // if (item !== null) {
            // console.log(item);
            // const contact = JSON.parse(item);

            // state.contacts.push(new Contact(contact.fio, contact.phones,
              // group.key, contact.emails, contact.website,
              // contact.birthday, contact.company, contact.photo, contact.id));
          // }
        // }
      // }
    // },
    // Мутации компонентов.
    SWITCH_DRAWER_STATE: (state): void => {
      state.drawerState = !state.drawerState;
    },
    CLOSE_DRAWER: (state): void => {
      state.drawerState = false;
    },
    SET_SELECTED_PAGE: (state, payload: Pages): void => {
      state.selectedPage = payload;
    },
    SET_GROUP_TO_FILTER: (state, payload: Groups): void => {
      state.groupToFilter = payload;
    },
    SET_DIALOG_STATE: (state, payload: boolean ): void => {
      state.dialogState = payload;
    },
  },
  actions: {
    // Действия со списком контактов.
    SELECT_CONTACT_ID: async (context, payload: number) => {
      context.commit('SET_CURRENT_CONTACT_ID', payload);
    },
    CLOSE_CURRENT_CONTACT: async (context) => {
      context.commit('SET_CURRENT_CONTACT', new Contact());
    },
    UPDATE_CURRENT_CONTACT_CLONE: async (context, payload: Contact) => {
      context.commit('SET_CURRENT_CONTACT_CLONE', payload);
    },
    UPDATE_CONTACT: async (context, payload: Contact) => {
      // Действие обновления контакта: если идентификатор контакта не задан,
      // значит будет создан новый контакт, если же id задан
      // и служит идентификатором для какой-то записи,
      // то будет обновлён существующий контакт.
      if (payload !== null && payload !== undefined) {
        if (payload.id !== -1) {
          context.commit('SET_CONTACT', payload);
        } else {
          context.commit('ADD_CONTACT', payload);
        }
      }
    },
    DELETE_CONTACT: async (context, payload: Contact) => {
      if (payload !== null && payload !== undefined) {
        if (payload.id !== -1) {
          context.commit('DELETE_CONTACT', payload);
        }
      }
    },
    FILL_CONTACTS_IN_DEFAULT: async (context) => {
      const defaultContacts: Contact[] = [
        new Contact('Сестричка', ['380713333333', '380714445577'], Groups.Family,
        ['likamamutova@gmail.com', 'likamamutova@yandex.ru'], 'https:\\\\vk.com\\likamamutova', '2000-07-11',
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/d4537dd9748a1f' +
        '5ae17faba22640ee02/5DB829CF/t51.2885-19/s150x150/49756238_337247823540542' +
        '_2823749351384285184_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Мама', ['380716767666'], Groups.Family,
        ['tatyanamamutova@gmail.com'], undefined, '1973-06-11'),
        new Contact('Папа', ['380718989888'], Groups.Family,
        ['alexmamutov@gmail.com'], undefined, '1973-04-06'),
        new Contact('Алина Ермолаева', ['380714545454'], Groups.Friends,
        ['mandxalinka@gmail.com'], 'https://www.behance.net/mandxalinka', '1999-01-08',
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/d8b7f85e448d41be55' +
        'babdcbe397c826/5DBD6E53/t51.2885-19/s150x150/41726968_1085408181626092' +
        '_597941335449665536_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Катя Головачёва', ['380719090999'], Groups.Friends,
        ['ekaterinagolovachova@gmail.com'], '', '1999-07-05',
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/a166d138' +
        'b8febccedee2b00812c8d3ab/5DC3F72C/t51.2885-15/e35/13687028' +
        '_1033094640071914_701415249_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Дубянская Анастасия Олеговна', ['380712345678']),
        new Contact('Владислава Колосова', ['380711212111'], Groups.Сolleagues,
        ['vladislavakolosova@gmail.com'], 'https:\\\\github.com\\vladislavakolosova', undefined,
        undefined, 'https://scontent-frt3-2.cdninstagram.com/vp/a0bd7f0b' +
        '7d41539e2143565aa9675c81/5DC4C658/t51.2885-19/s150x150/17076485' +
        '_1219216521508731_699949115127103488_a.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com'),
        new Contact('Владислав Овдейчук', ['380713636333'], Groups.Сolleagues,
        ['vladislavovdeychyk@gmail.com'], 'https:\\\\github.com\\vladislavovdeychyk'),
        new Contact('Морозов Кирилл Константинович', ['380710099876']),
        new Contact('Иванченко Юрий Сергеевич', ['380716543111'], Groups.Сolleagues),
      ];
      defaultContacts.forEach((element) => {
        context.commit('ADD_CONTACT', element);
      });
    },
    CLEAR_CONTACTS: async (context) => {
      context.commit('CLEAR_CONTACTS');
    },
    LOAD_TO_LOCAL_STORAGE: async (context) => {
      context.commit('LOAD_TO_LOCAL_STORAGE');
    },
    UPLOAD_FROM_LOCAL_STORAGE: async (context) => {
      context.commit('UPLOAD_FROM_LOCAL_STORAGE');
    },
    // Действия для обновления свойств компонентов.
    SWITCH_DRAWER_STATE: async (context) => {
      context.commit('SWITCH_DRAWER_STATE');
    },
    CLOSE_DRAWER: async (context) => {
      context.commit('CLOSE_DRAWER');
    },
    SELECT_PAGE: async (context, payload: Pages) => {
      context.commit('SET_SELECTED_PAGE', payload);
    },
    SHOW_DIALOG: async (context) => {
      context.commit('SET_DIALOG_STATE', true);
    },
    CLOSE_DIALOG: async (context) => {
      context.commit('SET_DIALOG_STATE', false);
    },
    CHANGE_GROUP_TO_FILTER: async (context, payload: Groups) => {
      context.commit('SET_GROUP_TO_FILTER', payload);
    },
  },
});
