<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {Todo} from "../types/todo.ts";
import {deleteTodos, editTodo} from "../utils/data";

export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {};
  },
  setup(props) {
    const bgColor = ref("white");
    const myColor = ref("black");
    const editing = ref(false);
    const updatedTitle = ref("");

    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgColor.value = "pink";
        myColor.value = "white";
      } else {
        bgColor.value = "white";
        myColor.value = "black";
      }
    };
    const delTodo = () => {
      if (window.confirm("Delete todo?")) {
        props.deleteTodo(props.index);
        deleteTodos(props.todo.id);
      }
    };

    const isCom = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        props.updateTodo(props.todo, val);
      },
    });

    const startEditing = () => {
      editing.value = true;
      updatedTitle.value = props.todo.title;
    };

    const finishEditing = () => {
      editing.value = false;
      props.todo.title = updatedTitle.value;
      editTodo(props.todo.id, updatedTitle.value);
    };

    return {
      mouseHandler,
      bgColor,
      myColor,
      delTodo,
      isCom,
      editing,
      updatedTitle,
      startEditing,
      finishEditing,
    };
  },
});
</script>

<template>
  <li
    class="todoItem"
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{backgroundColor: bgColor, color: myColor}"
  >
    <label class="todoContent" v-if="!editing">
      <input class="checkItem" type="checkbox" v-model="isCom" />
      <span class="todoMessage">{{ todo.title }}</span>
    </label>
    <label class="todoButton" v-if="!editing">
      <button class="todoEdit" @click="startEditing">
        <img src="https://cdn-icons-png.flaticon.com/512/2951/2951136.png" />
      </button>
      <button class="deleteTodo" @click="delTodo">
        <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" />
      </button>
    </label>

    <label v-else class="editContent">
      <input
        class="editInput"
        v-model="updatedTitle"
        @keyup.enter="finishEditing"
      />
      <label class="todoButton">
        <button class="todoFinishEdit" @click="finishEditing">Submit</button>
      </label>
    </label>
  </li>
</template>
