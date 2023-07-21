<script lang="ts">
import {defineComponent} from "vue";

interface Filter {
  label: string;
  value: string;
}

export default defineComponent({
  name: "TodoFilter",
  data() {
    return {
      filters: [
        {label: "All", value: "all"},
        {label: "Todo", value: "todo"},
        {label: "Done", value: "done"},
      ] as Filter[],
    };
  },
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="filters">
    <span
      class="filter"
      v-for="filter in filters"
      :key="filter.value"
      :class="{active: filter.value === selected}"
      @click="$emit('change-filter', filter.value)"
    >
      {{ filter.label }}
    </span>
  </div>
</template>
