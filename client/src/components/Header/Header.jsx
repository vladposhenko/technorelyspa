import React from 'react';
// import './header.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {logOutThunk, setAuthErrorFailure} from "../../redux/auth-reducer";
import {
    ADMIN_COMPANIES_ROUTE,
    ADMIN_USERS_ROUTE,
    COMPANIES_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "../../utils/consts";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {setUserSuccess} from "../../redux/user-reducer";
import {Badge} from "react-bootstrap";


const Header = ({ dispatch }) => {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.user.user)
    const isUserAdmin = useSelector(state => state.user.isUserAdmin)
    const handleClick = async () => {
        dispatch(setUserSuccess(null))
        dispatch(logOutThunk())
        navigate(LOGIN_ROUTE)
    }
    const userView = isAuth ? false : 'sm'
    return (
        <header className="header">
            <Navbar collapseOnSelect={true}  bg="light" expand={userView} className="mb-3">
                <Container >
                    <Navbar.Brand href="#">TMS</Navbar.Brand>
                    <Navbar.Toggle  aria-controls={`offcanvasNavbar-expand-${userView}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${userView}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${userView}`}
                        placement="end"
                    >
                        {isAuth ?
                            <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${userView}`}>
                                Technorely Management System
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <p className="mb-2 text-lg-center">?????????? ????????????????????, {user.nick_name}</p>
                            <Nav fill variant="tabs" className="justify-content-end flex-grow-1">
                                    <Nav.Link href="#" onClick={() => navigate(COMPANIES_ROUTE)}>?????? ????????????????</Nav.Link>
                                {isUserAdmin &&
                                    <>
                                        <Nav.Link href="#" onClick={() => navigate(ADMIN_USERS_ROUTE)}>?????? ????????????????????????
                                            <Badge style={{marginLeft:'20px', width:'40px'}} bg="danger">adm</Badge>
                                        </Nav.Link>
                                        <Nav.Link href="#" onClick={() => navigate(ADMIN_COMPANIES_ROUTE)}>
                                            ?????? ????????????????
                                            <Badge style={{marginLeft:'20px', width:'40px'}} bg="danger">adm</Badge>
                                        </Nav.Link>
                                    </>
                                }
                                <NavDropdown
                                    title="??????????????"
                                    id={`offcanvasNavbarDropdown-expand-${userView}`}
                                >
                                    <NavDropdown.Item onClick={() => navigate(PROFILE_ROUTE)} href="#">?????? ????????????????????</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#" onClick={handleClick}>
                                        ?????????? ???? ??????????????
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                            </>
                            : <div style={{alignSelf:'end'}}>
                                <Button size="sm" variant="secondary" onClick={() => {
                                    navigate(LOGIN_ROUTE)
                                    dispatch(setAuthErrorFailure(''))
                                } }>SignIn</Button>
                                <Button size="sm" variant="secondary" onClick={() => {
                                    navigate(REGISTRATION_ROUTE)
                                    dispatch(setAuthErrorFailure(''))
                                } } style={{marginLeft:'20px'}}>SignUp</Button>
                            </div>
                        }
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;