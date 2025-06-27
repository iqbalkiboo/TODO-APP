import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmptyImage from "../assets/img/Frame11326.png";
import ModalTodo, { NewTodo } from "../components/ModalTodo";
import TodoList from "../components/TodoList";

type Todo = {
  id: number;
  text: string;
  datetime: string;
  completed: boolean;
};

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalTodo, setModalTodo] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSaveTodo = (newTodo: NewTodo) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTodo.text,
        datetime: newTodo.datetime,
        completed: false,
      },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <NoteAltIcon />
        <Typography variant="h6">Todo</Typography>

        <Button
          onClick={() => setModalTodo(true)}
          startIcon={<AddIcon fontSize="small" />}
          sx={{
            border: "1px solid #d3dbe4",
            ml: 2,
            borderRadius: 2,
            px: 2,
            py: 0.5,
            textTransform: "none",
            color: "#4f4f4f",
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#f5f5f5",
              border: "1px solid #d3dbe4",
            },
          }}
        >
          Create Todo
        </Button>
      </Box>

      {todos.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 8 }}
        >
          <img
            src={EmptyImage}
            alt="Empty Todo"
            style={{ width: 150, height: "auto", opacity: 0.5 }}
          />
          <Typography sx={{ mt: 2, color: "#a0a4ab" }}>
            You Don't Have a Todo Yet
          </Typography>
        </Box>
      ) : (
        <TodoList
          todos={todos.map((todo) => ({
            ...todo,
            checked: todo.completed,
          }))}
          onToggle={toggleComplete}
          onDelete={handleDelete}
        />
      )}

      <ModalTodo
        open={modalTodo}
        onClose={() => setModalTodo(false)}
        onSave={handleSaveTodo}
      />
    </Box>
  );
};

export default TodoPage;
