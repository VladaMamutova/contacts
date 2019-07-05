<template>
  <v-chip :text-color="textColor" dark
  :color="group.color" 
  :disabled="disabled"
  :selected="selected"
  :outline="!selected && !disabled"
  @click="selectGroup()">
    {{ group.name }}
  </v-chip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Group from '../types/group';

@Component({
    name: 'group-chip',
    props: {
        group: {
          type: Group,
          required: true,
        },
        disabled: {
          type: Boolean,
          default: false,
        },
        selected: {
          type: Boolean,
          default: false,
        },
    },
})

export class GroupChip extends Vue {
  get textColor(): string {
    if (!this.$props.selected && !this.$props.disabled) {
      return this.$props.group.color;
    } else {
      return 'white';
    }
  }
  private selectGroup(): void {
    if (!this.$props.disabled && !this.$props.selected) {
      this.$props.selected = !this.$props.selected;
      this.$store.dispatch('CHANGE_GROUP_TO_FILTER', this.$props.group.key);
    }
  }
}

export default GroupChip;
</script>
