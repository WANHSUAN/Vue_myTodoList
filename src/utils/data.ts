import {Todo} from "../types/todo";

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch("http://localhost:3004/todos");

    if (!response.ok) {
      throw new Error("Failed to fetch todos.");
    }

    const todos = await response.json();

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function saveTodos(text: string, addTodo: (todo: Todo) => void) {
  try {
    const response = await fetch("http://localhost:3004/todos", {
      method: "POST",
      body: JSON.stringify({
        title: text,
        isCompleted: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to save todos.");
    }

    const newTodo = await response.json();
    const {id} = newTodo;

    const todo = {
      id: id,
      title: text,
      isCompleted: false,
    };
    addTodo(todo);
  } catch (error) {
    console.error("Error saving todos:", error);
  }
}

export async function editTodo(id: number, text: string) {
  try {
    const response = await fetch(`http://localhost:3004/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: text,
        isCompleted: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to save todos.");
    }
  } catch (error) {
    console.error("Error saving todos:", error);
  }
}

export async function deleteTodos(id: number) {
  try {
    const response = await fetch(`http://localhost:3004/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to save todos.");
    }
  } catch (error) {
    console.error("Error saving todos:", error);
  }
}

export async function deleteAllTodos(ids: number[]) {
  if (ids.length === 0) return;
  try {
    await Promise.all(
      ids.map(async (id) => {
        const response = await fetch(`http://localhost:3004/todos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete todos.");
        }
      })
    );
  } catch (error) {
    console.error("Error deleting todos:", error);
  }
}
