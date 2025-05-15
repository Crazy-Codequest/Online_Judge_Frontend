import React from "react";
import { Box, Divider, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, Button } from "@mui/material";
import { Assignment, Edit, Delete, Add } from "@mui/icons-material";

const LeftSidebar = ({ myLists, openEditListDialog, openDeleteListDialog, setEditingList, setNewListName, setListDescription, setOpenNewListDialog, borderColor }) => (
  <Box
    sx={{
      width: 240,
      borderRight: `1px solid ${borderColor}`,
      px: 2,
      display: { xs: "none", md: "flex" },
      flexDirection: "column",
      gap: 3,
    }}
  >
    <Divider sx={{ mt: 1 }} />
    <Typography
      variant="subtitle2"
      sx={{ ml: 1, fontSize: 15, fontWeight: 600 }}
    >
      My Lists
    </Typography>
    <List>
      {myLists.map((item) => (
        <ListItem
          button
          key={item._id}
          sx={{
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Assignment />
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={item.description}
              primaryTypographyProps={{ fontSize: 16 }}
              secondaryTypographyProps={{ fontSize: 13 }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
            <Tooltip title="Edit">
              <IconButton onClick={(e) => {
                e.stopPropagation();
                openEditListDialog(item);
              }}>
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={(e) => {
                e.stopPropagation();
                openDeleteListDialog(item);
              }}>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
      ))}
    </List>
    <Button
      startIcon={<Add />}
      onClick={() => {
        setEditingList(null);
        setNewListName("");
        setListDescription("");
        setOpenNewListDialog(true);
      }}
      sx={{
        mt: 1,
        ml: 1,
        fontSize: 15,
        textTransform: "none",
        boxShadow: "none",
        bgcolor: "transparent",
        "&:hover": { bgcolor: "#f5f5f5" },
      }}
      size="medium"
    >
      New List
    </Button>
  </Box>
);

export default LeftSidebar;
