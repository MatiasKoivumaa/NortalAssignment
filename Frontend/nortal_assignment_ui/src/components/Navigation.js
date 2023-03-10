import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navigation() {

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' />
      <Nav>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
          Home
        </NavLink>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/employees">
          Employees
        </NavLink>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/projects">
          Projects
        </NavLink>
      </Nav>
    </Navbar>
  );
}