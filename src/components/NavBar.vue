<template>
    <v-navigation-drawer
      fixed
      app
    >
              <v-list-tile  v-for="item in items" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'nav-bar',
    data(){
        return{
          drawer: true,
          items: [
            { icon: 'contacts', text: 'Все контакты' },
            { icon: 'group', text: 'Мои группы' },
            { icon: 'perm_contact_calendar', text: 'Дни рождения'},
            { icon: 'import_contacts', text: 'Экспорт'}
          ]
        }
    }
})
</script>
