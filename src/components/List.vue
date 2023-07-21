<script lang="ts">
import {defineComponent} from "vue";
import Item from "./Item.vue";

export default defineComponent({
  name: "List",
  components: {
    Item,
  },
  props: ["todos", "deleteTodo", "updateTodo"],
});
</script>

<template>
  <ul class="todoMain">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :index="index"
      :todo="todo"
      :deleteTodo="deleteTodo"
      :updateTodo="updateTodo"
    />
  </ul>
</template>
