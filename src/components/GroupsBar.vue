<template>
  <div id="bar">
    <group-chip v-for="group in groups" :key="group.key" :group="group" :selected="group.key == selectedGroup"></group-chip>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {GroupChip} from './GroupChip.vue';
import Group from '../types/group';
import Groups from '../types/groups';

@Component({
  components: {
    GroupChip,
  },
})

export default class GroupBar extends Vue {
  private groups: Group[] = [
    new Group(Groups.None),
    new Group(Groups.Family),
    new Group(Groups.Friends),
    new Group(Groups.Сolleagues),
  ];
  get selectedGroup(): Groups {
    return this.$store.getters.GROUP_TO_FILTER;
  }
}
</script>

<style>
#bar {
  padding: 0 16px 16px 16px;
}
/* Чтобы css-правило "#bar .v-chip__content {cursor: pointer;}" применилось,
атрибут "scoped" в теге "style" нельзя применять. 
Также можно перезаписать свойство курсора с помощью "cursor: pointer !important;". */
#bar .v-chip__content {
  cursor: pointer;
}
</style>
