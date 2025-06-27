import React from "react";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Props = {
  todo: {
    id: number;
    text: string;
    datetime: string;
  };
  checked: boolean;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
};

const TodoCard: React.FC<Props> = ({ todo, checked, onToggle, onDelete }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border="1px solid #ddd"
      borderRadius={2}
      p={2}
      mb={1}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Checkbox
          checked={checked}
          onChange={() => onToggle(todo.id)}
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
        />
        <Typography fontWeight={500}>{todo.text}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography fontSize={12} color="gray">
          {todo.datetime}
        </Typography>
        {onDelete && (
          <IconButton onClick={() => onDelete(todo.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TodoCard;
