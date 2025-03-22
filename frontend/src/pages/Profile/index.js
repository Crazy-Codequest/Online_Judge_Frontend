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
  Box,
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

const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/drchiragb/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ekj2agnn";
const cloudName = "drchiragb";


const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  const [newAvatarUrl, setNewAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setProfileMode] = useState(false);
  const [editedSocial, setEditedSocial] = useState({});
  const [editedProfile, setEditedProfile] = useState({});


  const [loading, setLoading] = useState(true);


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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("public_id", `${user._id}-profilepic`); 

    try{
      const res = await axios.post(CLOUDINARY_URL, formData);
      setNewAvatarUrl(res.data.secure_url);
    }catch(e){
      console.log(e);
      
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

  useEffect(() => {
    if(user._id){
      const profileUrl =
        `https://res.cloudinary.com/${cloudName}/image/upload/${
          user._id
        }-profilepic?timestamp=${new Date().getTime()}`;
        console.log(profileUrl);
        setNewAvatarUrl(profileUrl);
    }
  }, [user])

  if (loading) {
    return <Loading />;
  }

return (
  <section sx={{ padding: "2rem" }}>
    <Container sx={{ width: "100%", minHeight: "100vh", py: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Profile Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ textAlign: "center", mb: 4, p: 3 }}>
            <CardContent>
              <CardMedia
                component="img"
                alt="avatar"
                height="200"
                src={
                  newAvatarUrl ||
                  `https://res.cloudinary.com/drchiragb/image/upload/${user._id}-profilepic`
                }
                sx={{
                  width: "200px",
                  height: "200px",
                  margin: "0 auto",
                  borderRadius: "50%",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAvatarChange}
                sx={{ mt: 2 }}
              >
                Change Avatar
              </Button>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {`${userProfile.u_id.firstname} ${userProfile.u_id.lastname}`}
              </Typography>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button sx={{ mr: 2 }} variant="contained" color="primary">
                  Follow
                </Button>
                {/* <Button variant="outlined" onClick={handleAvatarSave}>
                  Save
                </Button> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* User Information */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: "100%", p: 3 }}>
            <CardContent>
              {editMode ? (
                <>
                  <Button
                    sx={{ mr: 2, mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={saveUserProfile}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="secondary"
                    onClick={handleEditClick}
                  >
                    Cancel
                  </Button>
                  {[
                    "username",
                    "firstname",
                    "lastname",
                    "email",
                    "mobile",
                    "address",
                  ].map((field) => (
                    <TextField
                      key={field}
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      variant="outlined"
                      value={editedProfile[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  ))}
                </>
              ) : (
                <>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleEditClick}
                  >
                    Edit Profile
                  </Button>
                  {[
                    "username",
                    "firstname",
                    "lastname",
                    "email",
                    "mobile",
                    "address",
                  ].map((field) => (
                    <Box
                      key={field}
                      sx={{ display: "flex", alignItems: "center", mb: 2 }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ flex: 1, fontWeight: "bold" }}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {userProfile.u_id[field]}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              {editProfile ? (
                <>
                  <Button
                    sx={{ mr: 2, mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={saveSocialProfile}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="secondary"
                    onClick={handleSocialEditClick}
                  >
                    Cancel
                  </Button>
                  {[
                    "website",
                    "github",
                    "twitter",
                    "instagram",
                    "facebook",
                  ].map((field) => (
                    <TextField
                      key={field}
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      variant="outlined"
                      value={editedSocial[field]}
                      onChange={(e) =>
                        handleSocialChange(field, e.target.value)
                      }
                      sx={{ mb: 2 }}
                    />
                  ))}
                </>
              ) : (
                <>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleSocialEditClick}
                  >
                    Edit Social Links
                  </Button>
                  {[
                    {
                      icon: <GlobeIcon />,
                      text: userProfile.website,
                      url: userProfile.website,
                    },
                    {
                      icon: <GitHubIcon />,
                      text: "GitHub",
                      url: userProfile.github,
                    },
                    {
                      icon: <TwitterIcon />,
                      text: "Twitter",
                      url: userProfile.twitter,
                    },
                    {
                      icon: <InstagramIcon />,
                      text: "Instagram",
                      url: userProfile.instagram,
                    },
                    {
                      icon: <FacebookIcon />,
                      text: "Facebook",
                      url: userProfile.facebook,
                    },
                  ].map(({ icon, text, url }) => (
                    <SocialListItem
                      key={text}
                      icon={icon}
                      text={text}
                      onClick={() => navigate(url)}
                    />
                  ))}
                </>
              )}
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
