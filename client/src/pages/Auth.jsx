import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row, Spinner} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {useLocation, useNavigate} from "react-router-dom";
import {COMPANIES_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {loginThunk, registrationThunk} from "../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";


const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [nickname, setNickName] = useState('')
    const [description, setDescription] = useState('')
    const [position, setPosition] = useState('')
    const navigate = useNavigate()
    const error = useSelector(state => state.auth.error)
    const isAuth = useSelector(state => state.auth.isAuth)
    const isLoading = useSelector(state => state.auth.isLoading)
    const dispatch = useDispatch()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    useEffect(() => {
        if(isAuth) {
            navigate(COMPANIES_ROUTE)
        }
    },[isAuth])


    const handleClick = () => {
        if (isLogin) {
            dispatch(loginThunk(email, password))
        } else {
            dispatch(registrationThunk({
                email,
                password,
                phone_number:phoneNumber,
                last_name:lastName,
                first_name:firstName,
                nick_name: nickname,
                description,
                position
            }))
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{color:'#000'}}>
            <Container className="d-flex justify-content-center align-items-center">
                <Card style={{width: 600}} className="p-5 border-1">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        {!isLogin &&
                            <React.Fragment>
                                <Form.Control
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите имя*"
                                />
                                <Form.Control
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите фамилию*"
                                />
                            </React.Fragment>
                        }
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-3"
                            placeholder="Введите ваш email*"
                        />
                        <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-3"
                            type="password"
                            placeholder="Введите ваш пароль*"
                        />
                        {!isLogin &&
                            <React.Fragment>
                                <Form.Control
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите номер телефона*"
                                />
                                <Form.Control
                                    value={nickname}
                                    onChange={(e) => setNickName(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите ваш никнейм*"
                                />
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите описание"
                                />
                                <Form.Control
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите вашу должность"
                                />
                            </React.Fragment>
                        }
                        <Row className="d-flex justify-content-between mt-3">
                            <div className="align-self-start">
                                {isLogin ? 'Нет аккаунта? ' : 'Уже зарегистрированы? '}
                                <a href="javascript:void(0)" onClick={() => navigate(isLogin ? '/signup' : '/signin')}>
                                    {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
                                </a>
                            </div>
                            <Button
                                onClick={handleClick}
                                className="mt-3" variant={"outline-success"}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                        </Row>
                        {error &&
                            <p className="mt-3 text-danger">{error}</p>
                        }
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;