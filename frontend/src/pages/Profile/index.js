import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import {
  Person as BasicInfoIcon,
  Storage as PointsIcon,
  Code as SubmissionsIcon,
  Star as AchievementsIcon,
  OpenInNew as OpenInNewIcon,
  Edit as EditIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import axios from "axios";
import { urlConstants } from "../../apis";
import { useSelector } from "react-redux";
import { getConfig } from "../../utils/getConfig";
import { toast } from "react-toastify";

const TABS = [
  { label: "Basic Info", icon: <BasicInfoIcon />, key: "basic" },
  { label: "Points", icon: <PointsIcon />, key: "points" },
  { label: "Submissions", icon: <SubmissionsIcon />, key: "submissions" },
  { label: "Achievements", icon: <AchievementsIcon />, key: "achievements" },
];

const DEFAULT_AVATAR = "https://res.cloudinary.com/drchiragb/image/upload/v1709912345/default-avatar.png";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const theme = useTheme();
  const [socialLinks, setSocialLinks] = useState({});
  const [user, setUser] = useState({});

  const { user: userPr } = useSelector((state) => state.auth);

  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
     const file = e.target.files[0];
     const formData = new FormData();
     formData.append("profileImage", file);
     formData.append("u_id", userPr.id);

     try{
      await axios.post(urlConstants.updateSocialImage, formData, getConfig());
      toast.success("Avatar updated successfully!");
      setAvatar(URL.createObjectURL(file));

     }catch (error) {
        console.error("Error uploading avatar:", error);
     }
    }
  };

  const handleFieldSave = async (field, value) => {
    try {
      const payload = {
        id: socialLinks._id,
        u_id: userPr.id,
      };
      if (["name", "firstname"].includes(field)) payload.firstname = value;
      else if (field === "lastname") payload.lastname = value;
      else if (field === "email") payload.email = value;
      else payload[field] = value;

      await axios.post(urlConstants.updateSocialProfile, payload, getConfig());
      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`);
      if (["website", "github", "linkedin", "twitter", "instagram", "facebook"].includes(field)) {
        setSocialLinks((prev) => ({ ...prev, [field]: value }));
      } else {
        setUser((prev) => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      toast.error("Failed to update profile field.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const res = await axios.post(
          urlConstants.getSocialProfile,
          { u_id: userPr.id },
          getConfig()
        );
        setUser({
          firstname: res.data.socialProfile.firstname || '',
          lastname: res.data.socialProfile.lastname || '',
          username: res.data.socialProfile.username || '',
          summary: res.data.socialProfile.summary || '',
          email: res.data.socialProfile.email || '',
        });
        setSocialLinks(res.data.socialProfile || {});
      } catch (error) {
        console.error("Error fetching social data:", error);
      }
    };
    if (userPr?.id) fetchSocialData();
  }, [userPr.id]);

  const renderTabContent = () => {
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
            <InfoRow label="Summary" value={user.summary} onSave={(val) => handleFieldSave("summary", val)} />
            <InfoRow label="Website" value={socialLinks.website} onSave={(val) => handleFieldSave("website", val)} />
            <InfoRow label="Github" value={socialLinks.github} onSave={(val) => handleFieldSave("github", val)} />
            <InfoRow label="LinkedIn" value={socialLinks.linkedin} onSave={(val) => handleFieldSave("linkedin", val)} />
            <InfoRow label="X (formerly Twitter)" value={socialLinks.twitter} onSave={(val) => handleFieldSave("twitter", val)} />
          </Box>
        );
      case "points":
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}>
              Points & Statistics
            </Typography>
            <Divider />
            <InfoRow label="Total Points" value="0" />
            <InfoRow label="Problems Solved" value="0" />
            <InfoRow label="Contest Rating" value="0" />
            <InfoRow label="Global Rank" value="N/A" />
          </Box>
        );
      case "submissions":
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}>
              Recent Submissions
            </Typography>
            <Divider />
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No submissions yet. Start solving problems to see your submissions here!
              </Typography>
            </Box>
          </Box>
        );
      case "achievements":
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}>
              Achievements
            </Typography>
            <Divider />
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                Complete challenges to earn achievements!
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  const fetchProfileImage = async (u_id) => {
    try {
      const res = await axios.get(`${urlConstants.getSocialImage}/${u_id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return URL.createObjectURL(res.data);

    } catch (error) {
      console.error("Error fetching profile image:", error);
      return DEFAULT_AVATAR;
    }
  };

  useEffect(() => {
    const getAvatar = async () => {
      try {
        if(userPr?.id) {
          const imgUrl = await fetchProfileImage(userPr.id);
          setAvatar(imgUrl);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
        
      }
    };

    getAvatar();
  }, [])

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "100%",
          minHeight: 220,
          background: `linear-gradient(120deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          pb: 2
        }}
      >
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 4 }}>
          <Avatar
            src={avatar}
            alt="avatar"
            sx={{
              width: 110,
              height: 110,
              border: `4px solid ${theme.palette.background.paper}`,
              boxShadow: theme.shadows[2],
              background: theme.palette.background.paper,
              mb: 2,
            }}
          />
          <Box sx={{ textAlign: "center", color: theme.palette.common.white }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 1, color: theme.palette.common.white }}>
                {user.name}
              </Typography>
              <MuiLink
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: theme.palette.common.white, display: "flex", alignItems: "center" }}
              >
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

      <Container maxWidth="md" sx={{ mt: 4, mb: 8, flex: 1 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <List sx={{ p: 0 }}>
              {TABS.map((tab) => (
                <ListItem
                  key={tab.key}
                  button
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
                  <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>{tab.icon}</ListItemIcon>
                  <ListItemText primary={tab.label} />
                </ListItem>
              ))}
              
            </List>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], p: 0, bgcolor: "background.paper" }}>
              <CardContent sx={{ p: 0 }}>
                {renderTabContent()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          bgcolor: theme.palette.primary.dark,
          color: theme.palette.common.white,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={3} justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" color={theme.palette.grey[300]}>
                © 2025 Crazy Codequest. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <MuiLink href={socialLinks.github} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white }}>
                  <GitHubIcon />
                </MuiLink>
                <MuiLink href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white }}>
                  <LinkedInIcon />
                </MuiLink>
                <MuiLink href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white }}>
                  <TwitterIcon />
                </MuiLink>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

const InfoRow = ({ label, value, onSave }) => {
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSave = () => {
    setEditing(false);
    if (onSave) onSave(inputValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 4, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Typography sx={{ flex: 1, color: theme.palette.text.secondary, fontWeight: 500 }}>{label}</Typography>
      {editing ? (
        <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <input
            value={inputValue || ''}
            onChange={e => setInputValue(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '1rem',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              background: theme.palette.background.paper,
              color: theme.palette.text.primary
            }}
          />
          <Button size="small" color="primary" variant="contained" sx={{ ml: 1 }} onClick={handleSave}>Save</Button>
        </Box>
      ) : (
        <Typography sx={{ flex: 2, color: theme.palette.text.primary }}>{value}</Typography>
      )}
      <Button
        size="small"
        sx={{ ml: 2, color: theme.palette.primary.main, fontWeight: 500, textTransform: "none" }}
        startIcon={<EditIcon fontSize="small" />}
        onClick={() => setEditing(true)}
        disabled={editing}
      >
        Edit
      </Button>
    </Box>
  );
};

export default ProfilePage;
