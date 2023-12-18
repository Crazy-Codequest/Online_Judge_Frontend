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
      className="admin-panel"
    >
      <Menu>
        <MenuItem
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="menu1"
          icon={<MenuRoundedIcon />}
        >
          <h2>Admin</h2>
        </MenuItem>
        <MenuItem icon={<GridViewRoundedIcon />}> Dashboard </MenuItem>
        <SubMenu label="Users" icon={<PersonIcon />}>
          <MenuItem
            onClick={() => setCurrentState("Users")}
            icon={<AccountCircleRoundedIcon />}
          >
            {" "}
            User Table{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentState("Users");
              setOpenCreateDialog(true);
            }}
            icon={<ShieldRoundedIcon />}
          >
            {" "}
            Create Users{" "}
          </MenuItem>
        </SubMenu>
        <SubMenu label="Problems" icon={<SettingsApplicationsRoundedIcon />}>
          <MenuItem
            onClick={() => setCurrentState("Problems")}
            icon={<AccountCircleRoundedIcon />}
          >
            {" "}
            Problem Table{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentState("Problems");
              setOpenProblemCreateDialog(true);
            }}
            icon={<ShieldRoundedIcon />}
          >
            {" "}
            Create Problem{" "}
          </MenuItem>
        </SubMenu>
        <SubMenu label="Competitions" icon={<PersonIcon />}>
          <MenuItem
            onClick={() => setCurrentState("Competitions")}
            icon={<AccountCircleRoundedIcon />}
          >
            {" "}
            Competition Table{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCurrentState("Competitions");
              setOpenCreateDialog(true);
            }}
            icon={<ShieldRoundedIcon />}
          >
            {" "}
            Create Competition{" "}
          </MenuItem>
        </SubMenu>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("user");
            dispatch(logout());
          }}
          icon={<LogoutRoundedIcon />}
        >
          {" "}
          Logout{" "}
        </MenuItem>
      </Menu>
    </ReactSidebar>
  );
};
export default Sidebar;
