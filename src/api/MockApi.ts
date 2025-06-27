// src/api/mockApi.ts
type User = {
  email: string;
  password?: string;
  provider: "local" | "google";
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// ---------- USER AUTH ----------

export function mockLogin(email: string, password?: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);

      if (!user) {
        if (password) {
          const newUser: User = { email, password, provider: "local" };
          localStorage.setItem("users", JSON.stringify([...users, newUser]));
          resolve(newUser);
        } else {
          reject("Email not found. Please use Google login.");
        }
      } else if (user.provider === "google") {
        resolve(user);
      } else if (user.password === password) {
        resolve(user);
      } else {
        reject("Incorrect password.");
      }
    }, 500); // simulate delay
  });
}

export function mockGoogleLogin(email: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const existing = users.find((u) => u.email === email);

      if (!existing) {
        const newUser: User = { email, provider: "google" };
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        resolve(newUser);
      } else {
        resolve(existing);
      }
    }, 500);
  });
}

// ---------- TODO LIST ----------

export function getTodos(email: string): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Record<string, Todo[]> = JSON.parse(
        localStorage.getItem("todos") || "{}"
      );
      resolve(todos[email] || []);
    }, 300);
  });
}

export function addTodo(email: string, title: string): Promise<Todo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Record<string, Todo[]> = JSON.parse(
        localStorage.getItem("todos") || "{}"
      );
      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false,
      };
      const updated = [...(todos[email] || []), newTodo];
      todos[email] = updated;
      localStorage.setItem("todos", JSON.stringify(todos));
      resolve(newTodo);
    }, 300);
  });
}

export function toggleTodo(
  email: string,
  id: number
): Promise<Todo[] | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Record<string, Todo[]> = JSON.parse(
        localStorage.getItem("todos") || "{}"
      );
      const userTodos = todos[email]?.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      if (userTodos) {
        todos[email] = userTodos;
        localStorage.setItem("todos", JSON.stringify(todos));
        resolve(userTodos);
      }
    }, 300);
  });
}

export function deleteTodo(email: string, id: number): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Record<string, Todo[]> = JSON.parse(
        localStorage.getItem("todos") || "{}"
      );
      const updated = (todos[email] || []).filter((t) => t.id !== id);
      todos[email] = updated;
      localStorage.setItem("todos", JSON.stringify(todos));
      resolve(updated);
    }, 300);
  });
}
