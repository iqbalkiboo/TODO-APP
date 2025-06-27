import React, { useState } from "react";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ModalTodo, { NewTodo } from "./ModalTodo";

type Props = {
  todo: {
    id: number;
    text: string;
    datetime: string;
  };
  checked: boolean;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, updated: NewTodo) => void;
  editable?: boolean;
};

const TodoCard: React.FC<Props> = ({
  todo,
  checked,
  onToggle,
  onDelete,
  onUpdate,
  editable = false,
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleSaveEdit = (updated: NewTodo) => {
    if (onUpdate) {
      onUpdate(todo.id, updated);
    }
    setOpenEdit(false);
  };

  return (
    <>
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
            sx={{
              color: "green",
              "&.Mui-checked": {
                color: "green",
              },
            }}
          />

          <Typography
            fontWeight={500}
            sx={{
              cursor: editable ? "pointer" : "default",
              textDecoration: checked ? "line-through" : "none",
            }}
            onClick={() => {
              if (editable) setOpenEdit(true);
            }}
          >
            {todo.text}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            fontSize={12}
            sx={{
              color: new Date(todo.datetime) < new Date() ? "#d32f2f" : "gray",
            }}
          >
            {new Date(todo.datetime) < new Date() ? "Overdue Time - " : ""}
            {todo.datetime}
          </Typography>
          {onDelete && (
            <IconButton onClick={() => onDelete(todo.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Modal Edit */}
      {editable && (
        <ModalTodo
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSave={handleSaveEdit}
          initialData={{
            text: todo.text,
            datetime: todo.datetime,
          }}
        />
      )}
    </>
  );
};

export default TodoCard;
