import React, { useMemo } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { createAvatar } from "@dicebear/core";
import * as collection from "@dicebear/collection";

const UserAvatarSection = ({ avatar, user, onAvatarChange }) => {
  // Use DiceBear to generate avatar SVG (fallback to provided avatar if not available)
  const dicebearSvg = useMemo(() => {
    if (user?.username) {
      return createAvatar(collection.identicon, { seed: user.username }).toDataUriSync();
    }
    return avatar;
  }, [user?.username, avatar]);

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        User Avatar
      </Typography>
      <Avatar src={dicebearSvg} alt={user?.username || "avatar"} sx={{ width: 120, height: 120, mb: 2 }} />
      <Button variant="outlined" component="label">
        Change Avatar
        <input type="file" accept="image/*" hidden onChange={onAvatarChange} />
      </Button>
    </Box>
  );
};

export default UserAvatarSection;
