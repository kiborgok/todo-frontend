import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useIntl } from "react-intl";
import Switch from "react-switch";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import {
    FaTachometerAlt,
    // FaGem,
    // FaList,
    // FaRegLaughWink,
    // FaHeart,
    FaCogs,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
} from "react-icons/fa";
import sidebarBg from "../assets/bg1.jpg";
import { getCurrentUser } from "../services/auth";

const Aside = ({
    image,
    collapsed,
    rtl,
    toggled,
    handleCollapsedChange,
    handleRtlChange,
    handleImageChange,
    handleToggleSidebar
}) => {
    const intl = useIntl();
    const user = getCurrentUser();
    return (
        <ProSidebar
            image={image ? sidebarBg : false}
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: "24px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 14,
                        letterSpacing: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {intl.formatMessage({ id: "sidebarTitle" })}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaTachometerAlt />}>
                        <Link to="/">Dashboard</Link>
                    </MenuItem>
                    {/* <MenuItem icon={<FaGem />}>
            {" "}
            <Link to="/calender">Components</Link>
          </MenuItem> */}
                </Menu>
                <Menu iconShape="circle">
                    {/* <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={intl.formatMessage({ id: "withSuffix" })}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={intl.formatMessage({ id: "withPrefix" })}
            icon={<FaHeart />}
          >
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 3</MenuItem>
          </SubMenu>
          <SubMenu
            title={intl.formatMessage({ id: "multiLevel" })}
            icon={<FaList />}
          >
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 2 </MenuItem>
            <SubMenu title={`${intl.formatMessage({ id: "submenu" })} 3`}>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.2 </MenuItem>
              <SubMenu title={`${intl.formatMessage({ id: "submenu" })} 3.3`}>
                <MenuItem>
                  {intl.formatMessage({ id: "submenu" })} 3.3.1{" "}
                </MenuItem>
                <MenuItem>
                  {intl.formatMessage({ id: "submenu" })} 3.3.2{" "}
                </MenuItem>
                <MenuItem>
                  {intl.formatMessage({ id: "submenu" })} 3.3.3{" "}
                </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu> */}
                    {user ? (
                        <SubMenu
                            title={intl.formatMessage({ id: "settings" })}
                            icon={<FaCogs />}
                        >
                            <MenuItem>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Switch
                                        height={16}
                                        width={30}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        onChange={handleCollapsedChange}
                                        checked={collapsed}
                                        onColor="#219de9"
                                        offColor="#bbbbbb"
                                    />
                                    <span style={{ marginLeft: "8px" }}>
                                        {" "}
                                        {intl.formatMessage({ id: "collapsed" })}
                                    </span>
                                </div>
                            </MenuItem>
                            <MenuItem>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Switch
                                        height={16}
                                        width={30}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        onChange={handleRtlChange}
                                        checked={rtl}
                                        onColor="#219de9"
                                        offColor="#bbbbbb"
                                    />
                                    <span style={{ marginLeft: "8px" }}>
                                        {" "}
                                        {intl.formatMessage({ id: "rtl" })}
                                    </span>
                                </div>
                            </MenuItem>
                            <MenuItem>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Switch
                                        height={16}
                                        width={30}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        onChange={handleImageChange}
                                        checked={image}
                                        onColor="#219de9"
                                        offColor="#bbbbbb"
                                    />
                                    <span style={{ marginLeft: "8px" }}>
                                        {" "}
                                        {intl.formatMessage({ id: "image" })}
                                    </span>
                                </div>
                            </MenuItem>
                        </SubMenu>
                    ) : null}
                </Menu>
                {!user && (
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaSignInAlt />}>
                            <Link to="/login">SignIn</Link>
                        </MenuItem>
                        <MenuItem icon={<FaUserPlus />}>
                            {" "}
                            <Link to="/register">SignUp</Link>
                        </MenuItem>
                    </Menu>
                )}
            </SidebarContent>

            {user && (
                <SidebarFooter style={{ textAlign: "center" }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: "20px 24px",
                        }}
                    >
                        <NavLink to="/signout" className="sidebar-btn">
                            <FaSignOutAlt />
                            <span> {intl.formatMessage({ id: "signout" })}</span>
                        </NavLink>
                    </div>
                </SidebarFooter>
            )}
        </ProSidebar>
    );
};

export default Aside;