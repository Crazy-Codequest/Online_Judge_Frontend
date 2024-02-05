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
import { urlConstants } from "../../apis";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import Loading from "../Loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [newAvatarUrl, setNewAvatarUrl] = useState({});
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setProfileMode] = useState(false);
  const [editedSocial, setEditedSocial] = useState({});
  const [editedProfile, setEditedProfile] = useState({});

  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  const handleEditClick = () => {
    setEditedProfile({
      username: userProfile.u_id.username,
      firstname: userProfile.u_id.firstname,
      lastname: userProfile.u_id.lastname,
      email: userProfile.u_id.email,
      mobile: userProfile.u_id.mobile,
      address: userProfile.u_id.address,
    });
    setEditMode((prev) => !prev);
  };

  const handleSocialEditClick = () => {
    setEditedSocial({
      website: userProfile.website,
      github: userProfile.github,
      twitter: userProfile.twitter,
      instagram: userProfile.instagram,
      facebook: userProfile.facebook,
    });
    setProfileMode((prev) => !prev);
  };

  const handleChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (field, value) => {
    setEditedSocial((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = () => {
    fileInputRef.current.click();
  };

  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const socialProfile = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getSocialProfile,
        {
          u_id: user._id,
        },
        getConfig()
      );
      setProfile(data);
      setUserProfile(data.socialProfile);
      setNewAvatarUrl(data.profileImageBuffer.img);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const saveSocialProfile = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.updateSocialProfile,
        {
          u_id: user._id,
          id: userProfile._id,
          ...editedSocial,
        },
        getConfig()
      );
      socialProfile();
      toast.success("Profile saved succesfully!");
      setEditMode(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const saveUserProfile = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.updateUserProfile,
        {
          id: user._id,
          user: editedProfile,
        },
        getConfig()
      );
      socialProfile();
      toast.success("Profile saved succesfully!");
      setEditMode(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAvatarSave = async () => {
    try {
      const formData = new FormData();
      formData.append("u_id", user._id);
      formData.append("file", dataURLtoFile(newAvatarUrl, "avatar.jpg"));
      const url = profile?.profileImageBuffer?.img
        ? urlConstants.updateAvatarUrl
        : urlConstants.uploadAvatarUrl;
      await axios.post(url, formData, getConfig());
      toast.success("Profile Image saved successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveClick = () => {
    setEditMode(false);
    saveUserProfile();
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
            <Card className="mb-4" style={{ textAlign: "center" }}>
              <CardContent className="text-center">
                <CardMedia
                  component="img"
                  alt="avatar"
                  height="150"
                  src={newAvatarUrl}
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
                  <Button
                    variant="outlined"
                    className="ms-1"
                    onClick={handleAvatarSave}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4" style={{ width: "100%", margin: "1rem" }}>
              <CardContent>
                {editMode ? (
                  <>
                    <Button
                      className="mr-2 mb-2"
                      variant="contained"
                      color="primary"
                      onClick={saveUserProfile}
                    >
                      Save
                    </Button>
                    <Button
                      className="mr-2 mb-2"
                      variant="contained"
                      color="primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <TextField
                      fullWidth
                      label="User Name"
                      variant="outlined"
                      value={editedProfile.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      className="mb-2"
                    />
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      value={editedProfile.firstname}
                      onChange={(e) =>
                        handleChange("firstname", e.target.value)
                      }
                      className="mb-2"
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      value={editedProfile.lastname}
                      onChange={(e) => handleChange("lastname", e.target.value)}
                      className="mb-2"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={editedProfile.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="mb-2"
                    />
                    <TextField
                      fullWidth
                      label="Mobile"
                      variant="outlined"
                      value={editedProfile.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      className="mb-2"
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      variant="outlined"
                      value={editedProfile.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="mb-2"
                    />
                  </>
                ) : (
                  <>
                    <Button
                      className="mr-2 mb-2"
                      variant="contained"
                      color="primary"
                      onClick={saveUserProfile}
                    >
                      Save
                    </Button>
                    <Button
                      className="mr-2 mb-2"
                      variant="contained"
                      color="primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
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
                    <ProfileInfoRow
                      label="Email"
                      value={userProfile.u_id.email}
                    />
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
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            {/* Social Link Card */}
            <Card className="mb-4">
              <CardContent>
                <List className="rounded-3">
                  {editProfile ? (
                    <>
                      <Button
                        className="mr-2 mb-2"
                        variant="contained"
                        color="primary"
                        onClick={saveSocialProfile}
                      >
                        Save
                      </Button>
                      <Button
                        className="mr-2 mb-2"
                        variant="contained"
                        color="primary"
                        onClick={handleSocialEditClick}
                      >
                        Edit
                      </Button>
                      <TextField
                        fullWidth
                        label="Website"
                        variant="outlined"
                        value={editedSocial.website}
                        onChange={(e) =>
                          handleSocialChange("website", e.target.value)
                        }
                        className="mb-2"
                      />
                      <TextField
                        fullWidth
                        label="Github"
                        variant="outlined"
                        value={editedSocial.github}
                        onChange={(e) =>
                          handleSocialChange("github", e.target.value)
                        }
                        className="mb-2"
                      />
                      <TextField
                        fullWidth
                        label="Twitter"
                        variant="outlined"
                        value={editedSocial.twitter}
                        onChange={(e) =>
                          handleSocialChange("twitter", e.target.value)
                        }
                        className="mb-2"
                      />
                      <TextField
                        fullWidth
                        label="Instagram"
                        variant="outlined"
                        value={editedSocial.instagram}
                        onChange={(e) =>
                          handleSocialChange("instagram", e.target.value)
                        }
                        className="mb-2"
                      />
                      <TextField
                        fullWidth
                        label="Facebook"
                        variant="outlined"
                        value={editedSocial.facebook}
                        onChange={(e) =>
                          handleSocialChange("facebook", e.target.value)
                        }
                        className="mb-2"
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        className="mr-2 mb-2"
                        variant="contained"
                        color="primary"
                        onClick={saveSocialProfile}
                      >
                        Save
                      </Button>
                      <Button
                        className="mr-2 mb-2"
                        variant="contained"
                        color="primary"
                        onClick={handleSocialEditClick}
                      >
                        Edit
                      </Button>
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
                    </>
                  )}
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
