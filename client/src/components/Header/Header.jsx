import React, {useState} from 'react';
// import './header.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../redux/auth-reducer";
import {ADMIN_ROUTE, COMPANIES_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {setIsUserAdmin, setUser} from "../../redux/user-reducer";
import {setCurrentCompany} from "../../redux/companies-reducer";


const Header = () => {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const isUserAdmin = useSelector(state => state.user.isUserAdmin)
    const handleClick = async () => {
        await localStorage.removeItem('token')
        dispatch(setAuth(false))
        dispatch(setUser({}))
        dispatch(setCurrentCompany({}))
        dispatch(setIsUserAdmin(false))
        navigate(LOGIN_ROUTE)
    }
    const userView = isAuth ? false : 'sm'
    return (
        <header className="header">
            <Navbar collapseOnSelect={true}  bg="light" expand={userView} className="mb-3">
                <Container >
                    <Navbar.Brand href="#">TMS</Navbar.Brand>
                    <Navbar.Toggle collapseOnSelect={false} aria-controls={`offcanvasNavbar-expand-${userView}`} />
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
                            <p className="mb-2">Добро пожаловать, {user.nick_name}</p>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#" onClick={() => navigate(COMPANIES_ROUTE)}>Мои Компании</Nav.Link>
                                <NavDropdown
                                    title="Профиль"
                                    id={`offcanvasNavbarDropdown-expand-${userView}`}
                                >
                                    <NavDropdown.Item onClick={() => navigate(PROFILE_ROUTE)} href="#">Моя информация</NavDropdown.Item>
                                    {isUserAdmin &&
                                        <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)} href="#">
                                            Страница администратора
                                        </NavDropdown.Item>
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#" onClick={handleClick}>
                                        Выйти из профиля
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                            </>
                            : <div style={{alignSelf:'end'}}>
                                <Button size="sm" variant="secondary" onClick={() => navigate(LOGIN_ROUTE)}>SignIn</Button>
                                <Button size="sm" variant="secondary" onClick={() => navigate(REGISTRATION_ROUTE)} style={{marginLeft:'20px'}}>SignUp</Button>
                            </div>
                        }
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
                {/*<div className="header__wrapper">*/}
                {/*    <p className="logo">TMS</p>*/}
                {/*    {!isAuth &&*/}
                {/*        <div className="header__auth">*/}
                {/*            <button onClick={() => navigate('/signin')} className="header__auth-btn">SignIn</button>*/}
                {/*            <button onClick={() => navigate('/signup')} className="header__auth-btn">SignUp</button>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*    {isAuth &&*/}
                {/*        <div>*/}
                {/*            <span className="m-lg-4">{user.nick_name}</span>*/}
                {/*            <Button onClick={handleClick} variant="danger" size="sm">LogOut</Button>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
        </header>
    );
};

export default Header;