import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileTabs = ({ activeTab, setActiveTab, onLogout }) => {
  const theme = useTheme();
  // Sidebar tabs for navigation
  const sidebarTabs = [
    { label: "Basic Info", key: "basic" },
    { label: "Socials", key: "socials" },
    { label: "User Avatar", key: "avatar" },
  ];

  return (
    <List sx={{ p: 0 }}>
      {sidebarTabs.map((tab) => (
        <ListItem
          key={tab.key}
          button
          selected={activeTab === tab.key}
          onClick={() => setActiveTab(tab.key)}
          sx={{
            borderRadius: "8px 0 0 8px",
            mb: 0.5,
            color: activeTab === tab.key ? theme.palette.primary.main : theme.palette.text.primary,
            background: activeTab === tab.key ? theme.palette.action.selected : "transparent",
            fontWeight: activeTab === tab.key ? 700 : 500,
            pl: 2.5,
            pr: 1,
            py: 1.2,
            minHeight: 44,
            transition: "all 0.2s",
          }}
        >
          <ListItemText primary={tab.label} />
        </ListItem>
      ))}
      <ListItem button onClick={onLogout} sx={{ color: theme.palette.error.main, mt: 4 }}>
        <ListItemIcon sx={{ color: theme.palette.error.main }}><LogoutIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};

export default ProfileTabs;
