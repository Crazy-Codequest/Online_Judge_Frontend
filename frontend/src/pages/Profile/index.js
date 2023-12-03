import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Language as GlobeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { urlConstants } from "../../apis";
import { useSelector } from "react-redux";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import Loading from "../Loader/Loader";

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const handleAvatarChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const socialProfile = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getSocialProfile,
        {
          u_id: "6551cf43aa1c26f08576935e",
          id: "656c11cb2d8a8e0d07b3a03d",
        },
        getConfig()
      );
      setUserProfile(data.socialProfile);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const navigate = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  useEffect(() => {
    socialProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section style={{ backgroundColor: "#eee", padding: "2rem" }}>
      <Container py={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {/* User Card */}
            <Card className="mb-4" style={{ textAlign: "center" }}>
              <CardContent className="text-center">
                <CardMedia
                  component="img"
                  alt="avatar"
                  height="150"
                  image={avatarUrl}
                  className="rounded-circle mx-auto"
                  style={{ width: "150px", margin: "0 auto" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAvatarChange}
                  className="mt-1"
                >
                  Change Avatar
                </Button>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  className="mt-1"
                >
                  {`${userProfile.u_id.firstname} ${userProfile.u_id.lastname}`}
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <div className="d-flex justify-content-center mt-1">
                  <Button className="mr-2" variant="contained" color="primary">
                    Follow
                  </Button>
                  <Button variant="outlined" className="ms-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information Card */}
            <Card className="mb-4" style={{ width: "100%" }}>
              <CardContent>
                <ProfileInfoRow
                  label="User Name"
                  value={userProfile.u_id.username}
                />
                <Divider />
                <ProfileInfoRow
                  label="First Name"
                  value={userProfile.u_id.firstname}
                />
                <Divider />
                <ProfileInfoRow
                  label="Last Name"
                  value={userProfile.u_id.lastname}
                />
                <Divider />
                <ProfileInfoRow label="Email" value={userProfile.u_id.email} />
                <Divider />
                <ProfileInfoRow
                  label="Mobile"
                  value={userProfile.u_id.mobile}
                />
                <Divider />
                <ProfileInfoRow
                  label="Address"
                  value={userProfile.u_id.address}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            {/* Social Link Card */}
            <Card className="mb-4">
              <CardContent>
                <List className="rounded-3">
                  <SocialListItem
                    icon={<GlobeIcon />}
                    text={userProfile.website}
                    onClick={() => navigate(userProfile.website)}
                  />
                  <SocialListItem
                    onClick={() => navigate(userProfile.github)}
                    icon={<GitHubIcon />}
                    text="github"
                  />
                  <SocialListItem
                    onClick={() => navigate(userProfile.twitter)}
                    icon={<TwitterIcon />}
                    text="twitter"
                  />
                  <SocialListItem
                    onClick={() => navigate(userProfile.instagram)}
                    icon={<InstagramIcon />}
                    text="instagram"
                  />
                  <SocialListItem
                    onClick={() => navigate(userProfile.facebook)}
                    icon={<FacebookIcon />}
                    text="facebook"
                  />
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

const SocialListItem = ({ icon, text, onClick }) => (
  <ListItem
    onClick={onClick}
    style={{ cursor: "pointer" }}
    className="d-flex justify-content-between align-items-center p-3"
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText>{text}</ListItemText>
  </ListItem>
);

const ProfileInfoRow = ({ label, value }) => (
  <Grid container>
    <Grid item sm={3}>
      <Typography variant="subtitle2">{label}</Typography>
    </Grid>
    <Grid item sm={9}>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        style={{ padding: "8px 0" }}
      >
        {value}
      </Typography>
    </Grid>
  </Grid>
);

export default ProfilePage;
