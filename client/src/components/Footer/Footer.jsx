import React from 'react';
import './footer.css'
import {Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Footer = () => {
    return (
        <footer className="footer">
            <Navbar bg="light" className="justify-content-between">
                <Container>
                    <p>Created by Vladyslav Poshenko</p>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="">Telegram</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="https://github.com/vladposhenko" eventKey="link-1">Github</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </footer>
    );
};

export default Footer;