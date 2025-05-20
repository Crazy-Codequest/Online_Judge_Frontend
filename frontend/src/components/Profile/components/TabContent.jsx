import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import InfoRow from "../InfoRow";
import AvatarPlayground from "../../../views/profile/UserAvatarSection";
import { setAvatarProps } from "../../../features/auth/dataSlice";
import { useDispatch } from "react-redux";

const ProfileTabContent = ({
  activeTab,
  user,
  socialLinks,
  handleFieldSave
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setAvatar = () => {
      const avatarProps = localStorage.getItem("avatar");
      if (avatarProps) dispatch(setAvatarProps(JSON.parse(avatarProps)));
    }
    
    setAvatar();
  }, [activeTab]);

  switch (activeTab) {
    case "basic":
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}>
            Basic Info
          </Typography>
          <Divider />
          <InfoRow label="Firstname" value={user.firstname} onSave={(val) => handleFieldSave("firstname", val)} />
          <InfoRow label="Lastname" value={user.lastname} onSave={(val) => handleFieldSave("lastname", val)} />
          <InfoRow label="Username" value={user.username} onSave={(val) => handleFieldSave("username", val)} />
          <InfoRow label="Email" value={user.email} onSave={(val) => handleFieldSave("email", val)} />
          <InfoRow label="Phone" value={user.mobile} onSave={(val) => handleFieldSave("mobile", val)} />
        </Box>
      );
    case "socials":
      return (
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}
          >
            Basic Info
          </Typography>
          <Divider />
          <InfoRow
            label="Website"
            value={socialLinks.website}
            onSave={(val) => handleFieldSave("website", val)}
          />
          <InfoRow
            label="Github"
            value={socialLinks.github}
            onSave={(val) => handleFieldSave("github", val)}
          />
          <InfoRow
            label="LinkedIn"
            value={socialLinks.linkedin}
            onSave={(val) => handleFieldSave("linkedin", val)}
          />
          <InfoRow
            label="X (formerly Twitter)"
            value={socialLinks.twitter}
            onSave={(val) => handleFieldSave("twitter", val)}
          />
        </Box>
      );
      case "avatar":
         return <AvatarPlayground />
    default:
      return null;
  }
};

export default ProfileTabContent;
