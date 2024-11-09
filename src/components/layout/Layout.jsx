import React, {useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {useUser} from "../../contexts/UserContext";
import UserAvatar from "../table/avatar/UserAvatar";

// icons
import {ReactComponent as NavButtonIcon} from "../../assets/icons/navButton.svg";
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import {ReactComponent as StudentIcon} from "../../assets/icons/student.svg";
import {ReactComponent as UserPlusIcon} from "../../assets/icons/userPlus.svg";
import {ReactComponent as SettingsIcon} from "../../assets/icons/settings.svg";
import {ReactComponent as HelpIcon} from "../../assets/icons/help.svg";
import {ReactComponent as LogOutIcon} from "../../assets/icons/logOut.svg";
import {ReactComponent as BookmarkIcon} from "../../assets/icons/bookmark.svg";
import {ReactComponent as ProfileIcon} from "../../assets/icons/profile.svg";

import logo from "/src/assets/logo.png";
import style from "./Layout.module.css";

// Utility function to check roles
const checkRole = (role, allowedRoles) => {
  return allowedRoles.includes(role);
};

// Define navigation items and their allowed roles
const navItems = [
  {
    section: "GENERAL",
    items: [
      {to: "/", icon: <HomeIcon/>, label: "Home", roles: ["Admin", "Staff", "Recruiter"]},
      {to: "/companyprofile", icon: <ProfileIcon/>, label: "プロファイル", roles: ["Recruiter"]},
      {to: "/student", icon: <StudentIcon/>, label: "学生検索", roles: ["Admin", "Staff", "Recruiter"]},
      {to: "/staff", icon: <UserPlusIcon/>, label: "職員", roles: ["Admin"]},
      {to: "/profile", icon: <ProfileIcon/>, label: "プロファイル", roles: ["Student"]},
      {to: "/recruiter", icon: <UserPlusIcon/>, label: "リクレーター", roles: ["Admin", "Staff", "Student"]},
      {to: "/bookmarked", icon: <BookmarkIcon/>, label: "気になる", roles: ["Recruiter"]},
    ],
  }, {
    section: "GENERAL",
    items: [
      {to: "/settings", icon: <SettingsIcon/>, label: "設定", roles: ["Admin", "Staff", "Recruiter", "Student"]},
      {to: "/help", icon: <HelpIcon/>, label: "ヘルプ", roles: ["Admin", "Staff", "Recruiter", "Student"]},
    ],
  },
];

const Layout = () => {
  const {activeUser, updateUser, userId, role} = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  const [japanTime, setJapanTime] = useState("");
  const [uzbekistanTime, setUzbekistanTime] = useState("");

  const handleResize = () => {
    setSmallScreen(window.innerWidth > 768);
    setIsMenuOpen(window.innerWidth > 768);
  };

  const updateTime = () => {
    const now = new Date();
    const options = {hour: "2-digit", minute: "2-digit"};

    const japanTimeString = now.toLocaleTimeString("ja-JP", {
      ...options,
      timeZone: "Asia/Tokyo",
    });
    const uzbekistanTimeString = now.toLocaleTimeString("uz-UZ", {
      ...options,
      timeZone: "Asia/Tashkent",
    });

    setJapanTime(japanTimeString);
    setUzbekistanTime(uzbekistanTimeString);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavButtonClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={isMenuOpen ? style.menuOpen : style.menuClose}>
      <div className={style.topBar}>
        <div className={style.left}>
          <div className={style.logo}>
            <div>
              <img src={logo} alt="Logo"/>
            </div>
            <div>JDU Portfolio</div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.navButton} onClick={handleNavButtonClick}>
            <NavButtonIcon/>
          </div>
          <div className={style.topBarBox}>
            <div className={style.timeBox}>
              <div style={{textAlign: "right"}}>
                <div className={style.timeText}>Japan</div>
                <div className={style.time}>{japanTime}</div>
              </div>
              <svg
                width="13"
                height="32"
                viewBox="0 0 13 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{margin: "0 4px"}}
              >
                <path
                  d="M5.22727 14.3864V15.6364H0.136364V14.3864H5.22727ZM12.5866 14.3864V15.6364H7.49574V14.3864H12.5866Z"
                  fill="#101828"
                />
                <path
                  d="M5.69886 17.8182L1.94886 31.75H0.431818L4.18182 17.8182H5.69886Z"
                  fill="#101828"
                />
                <path
                  d="M10.7553 0.102272L7.70845 11.4219H6.47585L9.52273 0.102272H10.7553Z"
                  fill="#667085"
                />
              </svg>

              <div>
                <div className={style.timeText}>Uzbekistan</div>
                <div className={style.time}>{uzbekistanTime}</div>
              </div>
            </div>
            <div className={style.loginUser}>
              <UserAvatar
                photo={activeUser?.photo}
                name={activeUser?.name}
                studentId={activeUser?.studentId}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.sideBar}>
        <header className={style.left}>
          <nav>
            {navItems.map((section, index) => (
              <ul key={"ul-" + index}>
                <span className={style.navGroup}>{section.section}</span>
                {section.items
                  .filter((item) => checkRole(role, item.roles))
                  .map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.to}
                        className={({isActive}) =>
                          isActive ? style.active : ""
                        }
                      >
                        {item.icon}
                        <div>{item.label}</div>
                      </NavLink>
                    </li>
                  ))}
              </ul>
            ))}

            <ul className={style.NavbarBottom}>
              <li>
                <NavLink
                  to="/logout"
                  className={({isActive}) => (isActive ? style.active : "")}
                >
                  <LogOutIcon/>
                  <div>ログアウト</div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {isMenuOpen && !smallScreen && (
          <div
            className={style.overlay}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
            }}
          />
        )}
        <main className={style.right} id={style.main}>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
