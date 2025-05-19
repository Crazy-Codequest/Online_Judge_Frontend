import React from "react";
import { Box, Container, Avatar, Typography, Button, Link as MuiLink, useTheme } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ProfileHeader = ({ avatar, user, fileInputRef, handleAvatarChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gradient = !isDark
    ? 'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)'
    : 'linear-gradient(-150deg, #e3e3e3 15%, #f5f5f5 70%, #dbeafe 94%)';
  return (
    <Box sx={{ width: "100%", minHeight: 220, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", pb: 2 }}>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 4 }}>
        <Avatar
          src={avatar}
          alt="avatar"
          sx={{ width: 110, height: 110, border: `4px solid ${theme.palette.background.paper}`, boxShadow: theme.shadows[2], background: theme.palette.background.paper, mb: 2 }}
        />
        <Box sx={{ textAlign: "center", color: theme.palette.common.white }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mr: 1, color: theme.palette.common.white }}>
              {user.name}
            </Typography>
            <MuiLink href="#" target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white, display: "flex", alignItems: "center" }}>
              <OpenInNewIcon fontSize="small" />
            </MuiLink>
          </Box>
          <Typography variant="subtitle1" sx={{ color: theme.palette.grey[300], fontSize: "1rem", mb: 2 }}>
            ID: {user.username}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
            onClick={() => fileInputRef.current.click()}
          >
            Change Avatar
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileHeader;
