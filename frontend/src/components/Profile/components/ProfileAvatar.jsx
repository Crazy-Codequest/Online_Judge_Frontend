import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { createAvatar } from "@dicebear/core";
import * as collection from "@dicebear/collection";
import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ProfileAvatar = ({ size = 30, radius = 40, userId, src = null, sx={}, onClick }) => {
  const [svgString, setSvgString] = useState();
  const {avatarProps} = useSelector(state => state.data);

  const generateAvatar = () => {
    const style = collection[avatarProps?.style] || collection.identicon;
    const avatar = createAvatar(style, {
      seed: userId || "123456",
      size,
      radius,
      ...avatarProps?.customOptions,
    });
    setSvgString(avatar.toDataUri());
  };

  useEffect(() => {
    generateAvatar();
  }, [avatarProps, userId, size, radius]);

  if (src || svgString) {
    return (
      <Avatar
        onClick={onClick}
        src={src ? src : svgString}
        sx={{ width: "2.5rem", height: "2.5rem", bgcolor: "grey.200", ...sx }}
      />
    );
  }

  return (
    <Avatar onClick={onClick} sx={{ width: "2.5rem", height: "2.5rem", ...sx }}>
      <Person />
    </Avatar>
  );
};

export default ProfileAvatar;
