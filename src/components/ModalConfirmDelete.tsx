import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  todoName: string;
};

const ModalConfirmDelete: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  todoName,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ style: { borderRadius: 10 } }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          backgroundColor: "#f8f8f8",
          px: 3,
          py: 2,
        }}
      >
        Confirm Delete
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: 3 }}>
        <Typography>
          Are you sure want to delete <strong>{todoName}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: "#0b4a99",
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            "&:hover": {
              backgroundColor: "#083f85",
            },
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#e0e0e0",
            color: "#0b4a99",
            backgroundColor: "#f5f5f5",
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmDelete;
