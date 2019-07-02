<template>
  <div id="bar">
     <group-chip v-for="group in groups" :key="group.key" :group="group"></group-chip>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {GroupChip} from './GroupChip.vue'
import Group from '../types/group';
import Groups from '../types/groups';

@Component({
  components: {
    GroupChip,
  }
})

export default class GroupBar extends Vue {
  private groups: Array<Group> = [
    new Group(Groups.Family),
    new Group(Groups.Friends),
    new Group(Groups.Сolleagues),
  ]
}
</script>

<style scoped>
#bar {
  padding: 0 16px 16px 16px;
}
</style>
