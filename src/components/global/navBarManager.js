import React from "react";
//APIs
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../JS/actions/user";
import {useDispatch } from "react-redux";
const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navBar-container">
      <Navbar bg="primary" variant="dark" fixed="top">
        <Navbar.Brand>
          <NavDropdown.Item>
            <Link to="/">Home</Link>
          </NavDropdown.Item>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Clients" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/clients">Liste des clients</Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Rapports" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/rapports">Liste des rapports</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/" onClick={() => dispatch(logout())}>
              {" "}
              <a href="#" className="btn-area">
                Logout
              </a>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
