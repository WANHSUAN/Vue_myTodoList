<script lang="ts">
import {PropType, defineComponent, ref} from "vue";
import {Todo} from "../types/todo";
import {saveTodos} from "../utils/data";

export default defineComponent({
  name: "Header",
  props: {
    addTodo: {
      type: Function as PropType<(todo: Todo) => void>,
      required: true,
    },
  },
  setup(props) {
    const title = ref("");
    const add = () => {
      const text = title.value;
      if (!text.trim()) {
        alert("Please fill in your todo!");
        return;
      }
      saveTodos(text, props.addTodo);
      title.value = "";
    };

    return {
      title,
      add,
    };
  },
});
</script>

<template>
  <div class="todoHeader">
    <input
      type="text"
      placeholder="Add your todo"
      @keyup.enter="add"
      v-model="title"
    />
    <button class="addButton" @click="add">
      <img src="https://cdn-icons-png.flaticon.com/512/864/864380.png" />
    </button>
  </div>
</template>
