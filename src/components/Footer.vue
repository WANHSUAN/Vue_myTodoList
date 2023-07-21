<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {Todo} from "../types/todo";

export type CheckAllFunction = (checked: boolean) => void;
export type ClearCompletedFunction = () => void;
export type ClearAllFunction = () => void;

export default defineComponent({
  name: "Footer",
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
    checkAll: {
      type: Function as PropType<CheckAllFunction>,
      required: true,
    },
    clearAllCompletedTodos: {
      type: Function as PropType<ClearCompletedFunction>,
      required: true,
    },
    clearAllTodos: {
      type: Function as PropType<ClearAllFunction>,
      required: true,
    },
  },
  setup(props) {
    const count = computed(() => {
      return props.todos.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      );
    });
    const isCheckAll = computed({
      get() {
        return count.value > 0 && props.todos.length === count.value;
      },
      set(val) {
        props.checkAll(val);
      },
    });
    return {
      count,
      isCheckAll,
    };
  },
});
</script>

<template>
  <div class="todoFooter">
    <label class="completedCheck">
      <input type="checkbox" v-model="isCheckAll" />
      <div>Completed {{ count }}</div>
      <div>All {{ todos.length }}</div>
    </label>
    <button class="clearCompleted" @click="clearAllCompletedTodos">
      Clear Completed Todos
    </button>
    <button class="clearAll" @click="clearAllTodos">Clear All Todos</button>
  </div>
</template>
