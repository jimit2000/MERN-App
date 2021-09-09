import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../App";

const Navbar = () => {
  const { state } = useContext(UserAuth);
  return (
    <>
      <div id="navSection">
        <nav className="navbar navbar-expand-md navbar-dark  " id="navStyle">
          <NavLink exact className="navbar-brand" to="/">
            JM Knowledge
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link navStyle"
                  activeClassName="activeLink"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {state ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navStyle"
                      activeClassName="activeLink"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navStyle"
                      activeClassName="activeLink"
                      to="/add_post"
                    >
                      Add Post
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navStyle"
                      activeClassName="activeLink"
                      to="/contact"
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navStyle"
                      activeClassName="activeLink"
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navStyle"
                      activeClassName="activeLink"
                      to="/signin"
                    >
                      signin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link navStyle"
                      activeClassName="activeLink"
                      to="/signup"
                    >
                      signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
