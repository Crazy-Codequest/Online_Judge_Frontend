import {
  Sidebar as ReactSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import PersonIcon from "@mui/icons-material/Person";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Typography } from "@mui/material";

const Sidebar = ({
  setOpenCreateDialog,
  sidebarCollapsed,
  setSidebarCollapsed,
  setCurrentState,
  setOpenProblemCreateDialog,
}) => {
  const collapseSidebar = () => {
    setSidebarCollapsed(true);
  };
  const dispatch = useDispatch();

  return (
    <ReactSidebar
      collapsed={sidebarCollapsed}
      collapseSidebar={collapseSidebar}
      style={{
        width: "20%",
      }}
    >
      <Menu>
        <MenuItem
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="menu1"
          icon={<MenuRoundedIcon />}
        >
          <Typography variant="h6">Admin</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setCurrentState("Problems")}
          icon={<GridViewRoundedIcon />}
        >
          {" "}
          <Typography>Dashboard</Typography>
        </MenuItem>
        <SubMenu label={<Typography>Users </Typography>} icon={<PersonIcon />}>
          <MenuItem
            onClick={() => setCurrentState("Users")}
            icon={<AccountCircleRoundedIcon />}
          >
            <Typography> User Table </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentState("Users");
              setOpenCreateDialog(true);
            }}
            icon={<ShieldRoundedIcon />}
          >
            <Typography> Create User </Typography>
          </MenuItem>
        </SubMenu>
        <SubMenu
          label={<Typography>Problems </Typography>}
          icon={<SettingsApplicationsRoundedIcon />}
        >
          <MenuItem
            onClick={() => setCurrentState("Problems")}
            icon={<AccountCircleRoundedIcon />}
          >
            <Typography>Problem Table </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentState("Problems");
              setOpenProblemCreateDialog(true);
            }}
            icon={<ShieldRoundedIcon />}
          >
            <Typography>Create Problem </Typography>
          </MenuItem>
        </SubMenu>
        <SubMenu
          label={<Typography>Competitions</Typography>}
          icon={<PersonIcon />}
        >
          <MenuItem
            onClick={() => setCurrentState("Competitions")}
            icon={<AccountCircleRoundedIcon />}
          >
            <Typography> Competition Table </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentState("Competitions");
              setOpenCreateDialog(true);
            }}
            icon={<ShieldRoundedIcon />}
          >
            <Typography> Create Competition </Typography>
          </MenuItem>
        </SubMenu>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("user");
            dispatch(logout());
          }}
          icon={<LogoutRoundedIcon />}
        >
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </ReactSidebar>
  );
};
export default Sidebar;
