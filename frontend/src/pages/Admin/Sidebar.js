import {
  Sidebar as ReactSidebar,
  Menu,
  MenuItem,
  SubMenu,
  side,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";

const Sidebar = ({
  setOpenCreateDialog,
  sidebarCollapsed,
  setSidebarCollapsed,
  setCurrentState,
}) => {
  const collapseSidebar = () => {
    setSidebarCollapsed(true);
  };

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
            onClick={() => setOpenCreateDialog(true)}
            icon={<ShieldRoundedIcon />}
          >
            {" "}
            Create Users{" "}
          </MenuItem>
        </SubMenu>
        <SubMenu label="Problems" icon={<SettingsApplicationsRoundedIcon />}>
          <MenuItem icon={<AccountCircleRoundedIcon />}>
            {" "}
            Problem Table{" "}
          </MenuItem>
          <MenuItem icon={<ShieldRoundedIcon />}> Create Problem </MenuItem>
        </SubMenu>
        <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
      </Menu>
    </ReactSidebar>
  );
};
export default Sidebar;
