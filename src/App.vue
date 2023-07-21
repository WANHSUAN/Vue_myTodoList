<script lang="ts">
import {computed, defineComponent, onMounted, reactive, toRefs} from "vue";
import {Todo} from "../src/types/todo";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import TodoFilter from "./components/TodoFilter.vue";
import {deleteAllTodos, getTodos} from "./utils/data";

export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
    TodoFilter,
  },
  setup() {
    const state = reactive<{todos: Todo[]; filter: string}>({
      todos: [],
      filter: "all",
    });

    onMounted(async () => {
      state.todos = await getTodos();
    });

    const useFilteredTodos = (todos: Todo[], filter: string) => {
      switch (filter) {
        case "done":
          return todos.filter((todo) => todo.isCompleted);
        case "todo":
          return todos.filter((todo) => !todo.isCompleted);
        default:
          return todos;
      }
    };

    const filteredTodos = computed(() => {
      return useFilteredTodos(state.todos, state.filter);
    });

    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };

    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };

    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
    };

    const editTodo = (index: number, updatedTodo: Todo) => {
      state.todos.splice(index, 1, updatedTodo);
    };

    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = isCompleted;
      });
    };

    const clearAllTodos = async () => {
      if (window.confirm("Delete All todos?")) {
        const AllTodos = state.todos.map((todo) => todo.id);

        deleteAllTodos(AllTodos)
          .then(() => {
            state.todos;
          })
          .catch((error) => {
            console.error("Error deleting todos:", error);
          });
        getTodos();
        state.todos = [];
      }
    };

    const clearAllCompletedTodos = () => {
      if (window.confirm("Delete completed todos?")) {
        const completedTodos = state.todos.filter((todo) => todo.isCompleted);
        const completedTodoIds = completedTodos.map((todo) => todo.id);

        deleteAllTodos(completedTodoIds)
          .then(() => {
            state.todos = state.todos.filter((todo) => !todo.isCompleted);
          })
          .catch((error) => {
            console.error("Error deleting todos:", error);
          });
        getTodos();
      }
    };

    return {
      ...toRefs(state),
      filteredTodos,
      addTodo,
      deleteTodo,
      updateTodo,
      editTodo,
      checkAll,
      clearAllTodos,
      clearAllCompletedTodos,
    };
  },
});
</script>

<template>
  <div class="todoContainer">
    <div class="todoWrap">
      <h1>To Do List</h1>
      <Header :addTodo="addTodo" />
      <TodoFilter :selected="filter" @change-filter="filter = $event" />
      <List
        :todos="filteredTodos"
        :deleteTodo="deleteTodo"
        :updateTodo="updateTodo"
        :editTodo="editTodo"
      />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllCompletedTodos="clearAllCompletedTodos"
        :clearAllTodos="clearAllTodos"
      />
    </div>
  </div>
</template>

<style scoped></style>
