import React, {useState} from "react";
import  {Container, Nav, Navbar} from 'react-bootstrap'

const Header = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand className="text-white">
                        <Nav>
                            <Nav.Link href="/addUser">Add User</Nav.Link>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                    </Navbar.Brand>
                </Container>

            </Navbar>
        </>
    )
}

export default Header;