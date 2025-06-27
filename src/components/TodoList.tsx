import React from "react";
import { Box, Typography } from "@mui/material";
import TodoCard from "./TodoCard";

type TodoItem = {
  id: number;
  text: string;
  datetime: string;
  checked: boolean;
  subtodos?: TodoItem[];
};

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  const checkedTodos = todos.filter((todo) => todo.checked);
  const notCheckedTodos = todos.filter((todo) => !todo.checked);

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
      {/* Not Checked */}
      <Box flex={1} border="1px solid #e0e0e0" borderRadius={2} p={2}>
        <Typography fontWeight={600} mb={2}>
          Not Checked
        </Typography>
        {notCheckedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            checked
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </Box>

      {/* Checked */}
      <Box flex={1} border="1px solid #e0e0e0" borderRadius={2} p={2}>
        <Typography fontWeight={600} mb={2}>
          Checked
        </Typography>
        {checkedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            checked
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TodoList;
