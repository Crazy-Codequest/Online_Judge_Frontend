import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import GreyCircle from "../../components/GreyCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CardMedia, IconButton } from "@mui/material";
import logo from "../../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useIsTab } from "../../hooks/use-is-tab";
import { useIsMobile } from "../../hooks/use-is-mobile";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTab  = useIsTab();
  const isMobile = useIsMobile();
  const {user} = useSelector((state) => state.auth);  

  const [anchorElLeft, setAnchorElLeft] = React.useState(null);
  const [anchorElRight, setAnchorElRight] = React.useState(null);


  const handleLeftMenuClick = (event) => {
    setAnchorElLeft(event.currentTarget);
  };

  const handleRightMenuClick = (event) => {
    setAnchorElRight(event.currentTarget);
  };

  const handleLeftMenuClose = () => {
    setAnchorElLeft(null);
  };

  const handleRightMenuClose = () => {
    setAnchorElRight(null);
  };


  const handleMenuLeftItemClick = (path) => {
    navigate(path);
    handleLeftMenuClose();
  };

   const handleMenuRightItemClick = (path) => {
     navigate(path);
     handleRightMenuClose();
   };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "#0000008c",
        boxShadow: "none",
        borderBottom: "0.2px solid #ddd",
        px: 0,
        py: 0.5,
      }}
    >
      <Toolbar sx={{ minHeight: "0 !important", padding: 0, width: "100%" }}>
        {isTab && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={handleLeftMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        {!isTab && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/")}
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
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "end", sm: "center" },
            alignItems: "center",
            flexGrow: 1,
            mr: { xs: 2, sm: 0 },
          }}
        >
          <CardMedia
            sx={{ width: 35, height: 35, mr: 1 }}
            component="img"
            src={logo}
          />
          <Typography
            className="nav-title"
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
          >
            CodeQuest
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchOutlinedIcon />
          <GreyCircle sx={{ ml: { xs: 0, md: 2 } }}>
            <DarkModeOutlinedIcon sx={{ width: 18 }} />
          </GreyCircle>

          <NotificationsNoneOutlinedIcon />

          <GreyCircle
            sx={{ ml: { xs: 0, md: 5 } }}
            onClick={handleRightMenuClick}
          >
            <Typography>C</Typography>
          </GreyCircle>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElLeft}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElLeft)}
          onClose={handleLeftMenuClose}
        >
          <MenuItem onClick={() => handleMenuLeftItemClick("/")}>Home</MenuItem>
          <MenuItem onClick={() => handleMenuLeftItemClick("/problems")}>
            Problems
          </MenuItem>
          <MenuItem onClick={() => handleMenuLeftItemClick("/competitions")}>
            Contest
          </MenuItem>
          <MenuItem onClick={() => handleMenuLeftItemClick("/compiler")}>
            Playground
          </MenuItem>
          {isMobile && (
            <>
              {user.role === "admin" && (
                <MenuItem onClick={() => handleMenuRightItemClick("/admin")}>
                  Admin
                </MenuItem>
              )}
              <MenuItem onClick={() => handleMenuRightItemClick("/compiler")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => handleMenuRightItemClick("/profile")}>
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
            </>
          )}
        </Menu>
        <Menu
          id="left-menu-appbar"
          anchorEl={anchorElRight}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElRight)}
          onClose={handleRightMenuClose}
        >
          {user.role === "admin" && (
            <MenuItem onClick={() => handleMenuRightItemClick("/admin")}>
              Admin
            </MenuItem>
          )}
          <MenuItem onClick={() => handleMenuRightItemClick("/compiler")}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => handleMenuRightItemClick("/profile")}>
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
