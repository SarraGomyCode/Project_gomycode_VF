import React from "react";
//APIs
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  Link
} from "react-router-dom";
import { logout } from "../../JS/actions/user";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navBar-container">
      <Navbar bg="primary" variant="dark" fixed="top">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Utilisateur" id="basic-nav-dropdown">
            <NavDropdown.Item >
            <Link to="/users"> Liste des utilisateurs</Link> 
            </NavDropdown.Item>
            <NavDropdown.Item >
            <Link to="/users/add">Ajouter un utilisateur</Link> 
            </NavDropdown.Item>
          </NavDropdown>
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


        </Nav>
      
      </Navbar>
    </div>
  );
};

export default NavBar;
