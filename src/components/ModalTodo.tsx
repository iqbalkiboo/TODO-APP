import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

export type NewTodo = { text: string; datetime: string };

export type ModalTodoProps = {
  open: boolean;
  onClose: () => void;
  onSave: (todo: NewTodo) => void;
  initialData?: NewTodo; // Optional, if editing
};

const ModalTodo: React.FC<ModalTodoProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [text, setText] = useState("");
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
      setValue(dayjs(initialData.datetime, "DD/MM/YYYY HH:mm"));
    } else {
      setText("");
      setValue(null);
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (!text.trim() || !value) return;
    onSave({
      text: text.trim(),
      datetime: value.format("DD/MM/YYYY HH:mm"),
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ style: { borderRadius: 10 } }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          pr: 5,
          py: 2,
          px: 3,
          backgroundColor: "#F6F6F6",
        }}
      >
        {initialData ? "Edit Todo" : "Add Todo"}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: 3, mt: 4 }}>
        <Stack gap={3}>
          <div>
            <Typography fontSize={14} fontWeight={500} mb={1}>
              Todo <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Project 1"
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ "& .MuiInputBase-root": { height: 56, borderRadius: 1 } }}
            />
          </div>

          <div>
            <Typography fontSize={14} fontWeight={500} mb={1}>
              Date Time <span style={{ color: "red" }}>*</span>
            </Typography>
            <DateTimePicker
              value={value}
              onChange={setValue}
              referenceDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  placeholder: "18/01/2024 17:00",
                  sx: {
                    "& .MuiInputBase-root": {
                      height: 56,
                      borderRadius: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 3 }}>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#0b4a99",
            textTransform: "none",
            fontWeight: 500,
            px: 4,
            "&:hover": { backgroundColor: "#083f85" },
          }}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#e9edf5",
            color: "#0b4a99",
            backgroundColor: "#f6f8fc",
            textTransform: "none",
            fontWeight: 500,
            px: 4,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTodo;
