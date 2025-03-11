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
import { CardMedia, IconButton, Popover, TextField, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import logo from "../../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useIsTab } from "../../hooks/use-is-tab";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useContext, useState } from "react";
import { setSearch } from "../../features/auth/dataSlice";
import {ThemeContext} from "../../ThemeContext";

export default function Navbar() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTab  = useIsTab();
  const isMobile = useIsMobile();
  const {user} = useSelector((state) => state.auth);  
  const {search} = useSelector((state) => state.data);

  const [anchorElLeft, setAnchorElLeft] = useState(null);
  const [anchorElRight, setAnchorElRight] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [anchorSettingsEl, setAnchorSettingsEl] = useState(null);

  const { themePref, toggleTheme } = useContext(ThemeContext);

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

  const handleSettingsClose = () => {
    setAnchorSettingsEl(null);
  };

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      toggleTheme(newTheme);
    }
    setAnchorSettingsEl(null);
  };

  const handleMenuLeftItemClick = (path) => {
    navigate(path);
    handleLeftMenuClose();
  };

  const handleMenuRightItemClick = (path) => {
    navigate(path);
    handleRightMenuClose();
  };

  const handleSettingsMenuOpen = (e) => {
    setAnchorSettingsEl(e.currentTarget);
  };

  const settingsId = "primary-theme-menu";
  const isSettingsOpen = Boolean(anchorSettingsEl);


  const renderTheme = (
    <Popover
      id={settingsId}
      open={isSettingsOpen}
      anchorEl={anchorSettingsEl}
      onClose={handleSettingsClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <ToggleButtonGroup
        value={themePref}
        exclusive
        onChange={handleThemeChange}
        aria-label="theme selection"
      >
        <ToggleButton value="light" aria-label="Light">
          <Typography p={1}>Light</Typography>
        </ToggleButton>
        <ToggleButton value="dark" aria-label="Dark">
          <Typography p={1}>Dark</Typography>
        </ToggleButton>
        <ToggleButton value="system" aria-label="System">
          <Typography p={1}>System</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Popover>
  );



  return (
    <Box
      position="relative"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        px: 0,
        py: 0.5,
        borderBottom: `1px solid ${palette.border.primary}`,
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
              variant="text"
            >
              Home
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/problems")}
              color="inherit"
              variant="text"
            >
              Problems
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/competitions")}
              color="inherit"
              variant="text"
            >
              Contest
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/compiler")}
              color="inherit"
              variant="text"
            >
              Playground
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-end", sm: "center" },
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
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          {showSearch ? (
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/problem/search?terms=${search}`);
                }
              }}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              onBlur={() => setShowSearch(false)}
              size="small"
              value={search}
            />
          ) : (
            <SearchOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setShowSearch(true)}
            />
          )}
          <GreyCircle sx={{ ml: { xs: 0, md: 2 } }}>
            <DarkModeOutlinedIcon
              size="large"
              aria-controls={settingsId}
              onClick={handleSettingsMenuOpen}
              sx={{ width: 18 }}
            />
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
      {renderTheme}
    </Box>
  );
}
