import React, { useEffect, useState } from "react";

//icons
import { IoExitOutline } from "react-icons/io5";
import { IoIosOptions } from "react-icons/io";

//react-router-dom
import { NavLink, Link, useParams } from "react-router-dom";

//components
import Logo from "../logo/Logo";

//context
import { useAuth } from "../../context/AuthContext";

//styles
import "./header.css";

const mainMenuValues = ["dashboard", "movies", "series", "celebrities"];

function Header() {
  const [activeMenuBar, setActiveMenubar] = useState(false);
  const { user, signoutUser, isAuth } = useAuth();
  const { auth } = useParams();

  useEffect(() => {
    setActiveMenubar(false);
    function listenerWindowScroll(event) {
      if (activeMenuBar) return setActiveMenubar(false);
    }
    window.addEventListener("scroll", listenerWindowScroll);
    return window.addEventListener("scroll", listenerWindowScroll);
  }, []);

  function handleClickMenubar(event) {
    setActiveMenubar(!activeMenuBar);
  }

  function handleNavLinkClick(event) {
    setActiveMenubar(false);
  }

  return (
    <header className="header">
      <Link to={"/"} className="site-logo">
        <Logo />
        <span>CINEMAHOME</span>
      </Link>
      {isAuth && (
        <nav className={`${activeMenuBar ? "active" : ""}`}>
          <ul className="menu-content">
            {mainMenuValues.map((menuItem, index) => (
              <li key={`${index + 1}`}>
                <NavLink
                  to={`${menuItem}`}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    isActive ? "header-navLink-selected" : "header-navLink"
                  }
                >
                  {menuItem}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="header-auth-container">
        {auth === "signin" ? (
          <Link to="/auth/signup" className="auth-link signup">
            signup
          </Link>
        ) : auth === "signup" ? (
          <Link to="/auth/signin" className="auth-link signin">
            signin
          </Link>
        ) : !Object.keys(user).length ? (
          <>
            <Link to="/auth/signup" className="auth-link signup">
              Sign Up
            </Link>
            <Link to="/auth/signin" className="auth-link signin">
              Sign In
            </Link>
          </>
        ) : (
          <div className="header-auth-user">
            <h2 className="user-username">{user.username}</h2>
            <IoIosOptions
              className="user-menubar"
              onClick={handleClickMenubar}
            />
            <IoExitOutline
              className="user-IoExitOutline"
              onClick={signoutUser}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
