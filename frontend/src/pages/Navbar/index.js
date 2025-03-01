import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import GreyCircle from "../../components/GreyCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { user } = useSelector((state) => state.auth);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#f8f9fa",
        color: "#0000008c",
        boxShadow: "none",
        borderBottom: "0.2px solid #ddd",
        px: 0,
        py: 0.5,
      }}
    >
      <Toolbar sx={{ minHeight: "0 !important", padding: 0, width: "100%" }}>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Box
          sx={{
            width: "25%",
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/problems")}
            color="inherit"
          >
            Home
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/problems")}
            color="inherit"
          >
            Problems
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/competitions")}
            color="inherit"
          >
            Contest
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/compiler")}
            color="inherit"
          >
            Playground
          </Button>
        </Box>
        <Box sx={{ width: "60%", textAlign: "center" }}>
          <Typography
            className="nav-title"
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
          >
            Online Judge
          </Typography>
        </Box>
        <Box
          sx={{
            width: "25%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchOutlinedIcon />
          <GreyCircle sx={{ ml: 2 }}>
            <DarkModeOutlinedIcon sx={{ width: 18 }} />
          </GreyCircle>

          <NotificationsNoneOutlinedIcon />

          <GreyCircle sx={{ ml: 5 }} onClick={handleMenuClick}>
            <Typography>C</Typography>
          </GreyCircle>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick("/admin")}>
            Admin
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("/compiler")}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("/profile")}>
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("user");
              dispatch(logout());
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
