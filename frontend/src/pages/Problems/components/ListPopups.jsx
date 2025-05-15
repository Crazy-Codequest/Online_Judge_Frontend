import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";

export const EditListDialog = (props) => {
  return (
    <Dialog 
      open={props.open} 
      onClose={() => {
        props.setOpenNewListDialog(false);
        props.setOpenEditDialog(false);
        props.setEditingList(null);
        props.setNewListName("");
        props.setListDescription("");
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 24,
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: 22 }}>
        {props.editingList ? "Edit List" : "Create New List"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="List Name"
          fullWidth
          value={props.newListName}
          onChange={(e) => props.setNewListName(e.target.value)}
          sx={{ mb: 2, borderRadius: 2 }}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={props.listDescription}
          onChange={(e) => props.setListDescription(e.target.value)}
          sx={{ borderRadius: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button onClick={() => {
          props.setOpenNewListDialog(false);
          props.setOpenEditDialog(false);
          props.setEditingList(null);
          props.setNewListName("");
          props.setListDescription("");
        }}>
          Cancel
        </Button>
        <Button 
          onClick={props.editingList ? props.handleEditList : props.handleCreateList} 
          variant="contained"
        >
          {props.editingList ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteListDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.setOpenDeleteDialog(false);
        props.setListToDelete(null);
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 24,
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: 22 }}>Delete List</DialogTitle>
      <DialogContent>
        <Typography sx={{ fontWeight: 500 }}>
          Are you sure you want to delete the list "{props.listToDelete?.name}"? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button onClick={() => {
          props.setOpenDeleteDialog(false);
          props.setListToDelete(null);
        }}>
          Cancel
        </Button>
        <Button onClick={props.handleDeleteList} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
