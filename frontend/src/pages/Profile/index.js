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

const PROFILE_DATA = {
  name: "Chirag Bagde",
  username: "chiragsbagde",
  gender: "Male",
  location: "Your location",
  birthday: "Your birthday",
  summary: "Tell us about yourself (interests, experience, etc.)",
  website: "Your blog, portfolio, etc.",
  github: "Your Github username or url",
  linkedin: "Your LinkedIn username or url",
  twitter: "Your X (formerly Twitter) username or url",
  experience: {
    work: "Add a workplace",
    education: "Add a school",
  },
  skills: "Your Skills.",
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const theme = useTheme();

  const user = PROFILE_DATA;

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

  

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}>
              Basic Info
            </Typography>
            <Divider />
            <InfoRow label="Name" value={user.name} />
            <InfoRow label="Username" value={user.username} />
            <InfoRow label="Location" value={user.location} />
            <InfoRow label="Summary" value={user.summary} />
            <InfoRow label="Website" value={user.website} />
            <InfoRow label="Github" value={user.github} />
            <InfoRow label="LinkedIn" value={user.linkedin} />
            <InfoRow label="X (formerly Twitter)" value={user.twitter} />
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

  const {user: userPr} = useSelector((state) => state.auth);

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
    const fetchSocialData = async () => {
      try {
        const res = await axios.post(
          urlConstants.getSocialProfile,
          { u_id: userPr.id },
          getConfig()
        );
        console.log(res.data);
        
      }catch (error) {
        console.error("Error fetching social data:", error);
      };
    };
    fetchSocialData();
  }, []);

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
      {/* Header */}
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

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 8, flex: 1 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Sidebar */}
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
          {/* Main Card */}
          <Grid item xs={12} md={9}>
            <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], p: 0, bgcolor: "background.paper" }}>
              <CardContent sx={{ p: 0 }}>
                {renderTabContent()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
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
                <MuiLink href={user.github} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white }}>
                  <GitHubIcon />
                </MuiLink>
                <MuiLink href={user.linkedin} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white }}>
                  <LinkedInIcon />
                </MuiLink>
                <MuiLink href={user.twitter} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.common.white }}>
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

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", px: 4, py: 2, borderBottom: `1px solid ${useTheme().palette.divider}` }}>
    <Typography sx={{ flex: 1, color: useTheme().palette.text.secondary, fontWeight: 500 }}>{label}</Typography>
    <Typography sx={{ flex: 2, color: useTheme().palette.text.primary }}>{value}</Typography>
    <Button size="small" sx={{ ml: 2, color: useTheme().palette.primary.main, fontWeight: 500, textTransform: "none" }} startIcon={<EditIcon fontSize="small" />}>
      Edit
    </Button>
  </Box>
);

export default ProfilePage;
