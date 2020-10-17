import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


class NavBarComponent extends React.Component {

    render() {
        return (
            <Navbar className="navbar" bg="light" expand="lg">
                <Navbar.Brand href="#home">Keep Budget</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Log out</Nav.Link>
                        <Nav.Link href="#link">Settings</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}



export default NavBarComponent;
