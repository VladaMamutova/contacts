<template>
  <v-chip :color="group.color" text-color="white">
    {{ group.name }}
  </v-chip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Group from '../types/group';

@Component({
    name: 'group-chip',
    props: {
        group: Group
    }
})

export class GroupChip extends Vue {
}

export default GroupChip;
</script>

