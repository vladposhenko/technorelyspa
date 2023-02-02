import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row, Spinner} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {useLocation, useNavigate} from "react-router-dom";
import {COMPANIES_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {loginThunk, registrationThunk, setAuthError} from "../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";


const Auth = () => {
    const { isAuth, isLoading, serverError } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {
        register,
        formState: {
            errors, isValid
        },
        reset,
        handleSubmit
    } = useForm({
        mode:"onBlur"
    })
    const isLogin = location.pathname === LOGIN_ROUTE
    useEffect(() => {
        if(isAuth) {
            navigate(COMPANIES_ROUTE)
        }
    },[isAuth])


    const onSubmit = (data) => {
        if (isLogin) {
            dispatch(loginThunk(data.email, data.password))
        } else {
            dispatch(registrationThunk(data))
        }
        reset()
    }
    if(isLoading) return <Spinner/>
    return (
        <div className="d-flex justify-content-center align-items-center" style={{color:'#000'}}>
            <Container className="d-flex justify-content-center align-items-center">
                <Card style={{width: 600}} className="p-5 border-1">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                        {!isLogin &&
                            <React.Fragment>
                                <Form.Control
                                    {...register('first_name', {
                                        required:"Поле обязательно к заполнению",
                                        minLength: {
                                            value:2,
                                            message:"Минимум 2 символа"
                                        },
                                    })}
                                    className="mt-3"
                                    placeholder="Введите имя*"
                                />
                                <div className="text-danger mt-2">{errors?.first_name && <p>{errors?.first_name?.message || 'Ошибка'}</p>}</div>
                                <Form.Control
                                    {...register('last_name', {
                                        required:"Поле обязательно к заполнению",
                                        minLength: {
                                            value:2,
                                            message:"Минимум 2 символа"
                                        },
                                    })}
                                    className="mt-3"
                                    placeholder="Введите фамилию*"
                                />
                                <div className="text-danger mt-2">{errors?.last_name && <p>{errors?.last_name?.message || 'Ошибка'}</p>}</div>
                            </React.Fragment>
                        }
                        <Form.Control
                            {...register('email', {
                                required:"Поле обязательно к заполнению",
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                            className="mt-3"
                            placeholder="Введите ваш email*"
                        />
                        <div className="text-danger mt-2">{errors?.email && <p>{errors?.email?.message || 'Некорректный email'}</p>}</div>
                        <Form.Control
                            {...register('password', {
                                required:"Поле обязательно к заполнению",
                                minLength: {
                                    value:4,
                                    message:'Минимум 4 символа'
                                }
                            })}
                            className="mt-3"
                            type="password"
                            placeholder="Введите ваш пароль*"
                        />
                        <div className="text-danger mt-2">{errors?.password && <p>{errors?.password?.message || 'Некорректный email'}</p>}</div>
                        {!isLogin &&
                            <React.Fragment>
                                <Form.Control
                                    type="number"
                                    {...register('phone_number', {
                                        required:"Поле обязательно к заполнению",
                                        pattern:/[0-9]/,
                                    })}
                                    className="mt-3"
                                    placeholder="Введите номер телефона*"
                                />
                                <div className="text-danger mt-2">{errors?.phone_number && <p>{errors?.phone_number?.message || 'Введите числа 0 - 9'}</p>}</div>
                                <Form.Control
                                    {...register('nick_name', {
                                        required:"Поле обязательно к заполнению",
                                    })}
                                    className="mt-3"
                                    placeholder="Введите ваш никнейм*"
                                />
                                <div className="text-danger mt-2">{errors?.nick_name && <p>{errors?.nick_name?.message || 'error'}</p>}</div>
                                <Form.Control
                                    {...register('description', {
                                        required:"Поле обязательно к заполнению",
                                    })}
                                    className="mt-3"
                                    placeholder="Введите описание"
                                />
                                <div className="text-danger mt-2">{errors?.description && <p>{errors?.description?.message || 'error'}</p>}</div>
                                <Form.Control
                                    {...register('position', {
                                        required:"Поле обязательно к заполнению",
                                    })}
                                    className="mt-3"
                                    placeholder="Введите вашу должность"
                                />
                                <div className="text-danger mt-2">{errors?.position && <p>{errors?.position?.message || 'error'}</p>}</div>
                            </React.Fragment>
                        }
                        <Row className="d-flex justify-content-between mt-3">
                            {serverError && <p className="text-danger pt-2 pb-4">{serverError}</p>}
                            <div className="align-self-start">
                                {isLogin ? 'Нет аккаунта? ' : 'Уже зарегистрированы? '}
                                <a href="javascript:void(0)" onClick={() => {
                                    navigate(isLogin ? '/signup' : '/signin')
                                    dispatch(setAuthError(''))
                                } }>
                                    {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
                                </a>
                            </div>
                            <Button
                                type="submit"
                                className="mt-3" variant="secondary" >{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;