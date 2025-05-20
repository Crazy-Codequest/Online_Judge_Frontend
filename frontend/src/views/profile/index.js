import React from "react";
import { Container, Grid, Box, Card, CardContent, Typography, Link as MuiLink, useTheme } from "@mui/material";
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Person as BasicInfoIcon, Storage as PointsIcon, Code as SubmissionsIcon, Star as AchievementsIcon } from "@mui/icons-material";
import ProfileHeader from "../../components/Profile/components/Header";
import ProfileTabs from "../../components/Profile/components/Tabs";
import ProfileTabContent from "../../components/Profile/components/TabContent";
import { useProfilePage } from "../../hooks/use-profile-page.hook";

const TABS = [
  { label: "Basic Info", icon: <BasicInfoIcon />, key: "basic" },
  { label: "Points", icon: <PointsIcon />, key: "points" },
  { label: "Submissions", icon: <SubmissionsIcon />, key: "submissions" },
  { label: "Achievements", icon: <AchievementsIcon />, key: "achievements" },
];

const ProfilePage = () => {
  const theme = useTheme();
  const {
    activeTab,
    setActiveTab,
    fileInputRef,
    avatar,
    user,
    socialLinks,
    handleAvatarChange,
    handleFieldSave,
    deleteProfileImage,
  } = useProfilePage();

  const isDark = theme.palette.mode === "dark";
  const gradient = isDark
    ? "linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)"
    : "linear-gradient(-150deg, #e3e3e3 15%, #f5f5f5 70%, #dbeafe 94%)";
  
    const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProfileHeader
        deleteProfileImage={deleteProfileImage}
        avatar={avatar}
        user={user}
        fileInputRef={fileInputRef}
        handleAvatarChange={handleAvatarChange}
      />
      <Container maxWidth="md" sx={{ mt: 4, mb: 8, flex: 1 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <ProfileTabs
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={user}
              socialLinks={socialLinks}
              dicebearAvatarUrl={avatar}
              onLogout={handleLogout}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: theme.shadows[2],
                p: 0,
                bgcolor: "background.paper",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <ProfileTabContent
                  activeTab={activeTab}
                  user={user}
                  socialLinks={socialLinks}
                  handleFieldSave={handleFieldSave}
                />
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
          mt: "auto",
          background: gradient,
          color: theme.palette.common.white,
        }}
      >
        <Container maxWidth="md">
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body2" color={theme.palette.primary.main}>
                © 2025 Crazy Codequest. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", gap: 2 }}>
                <MuiLink
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: theme.palette.primary.main }}
                >
                  <GitHubIcon />
                </MuiLink>
                <MuiLink
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: theme.palette.primary.main }}
                >
                  <LinkedInIcon />
                </MuiLink>
                <MuiLink
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: theme.palette.primary.main }}
                >
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

export default ProfilePage;
