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
      }}
    >
      <Toolbar sx={{ minHeight: "0 !important", padding: 0 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          className="nav-title"
          variant="h6"
          component="div"
          onClick={() => navigate("/")}
          sx={{ flexGrow: 1 }}
        >
          Online Judge
        </Typography>
        <Button onClick={() => navigate("/problems")} color="inherit">
          Problems
        </Button>
        <Button onClick={() => navigate("/competitions")} color="inherit">
          Contest
        </Button>
        <DarkModeOutlinedIcon sx={{ml: 1}} />
        <IconButton
          size="large"
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <AccountCircleIcon />
        </IconButton>
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
