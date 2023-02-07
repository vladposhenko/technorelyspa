import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createUserCompany, setIsEditMode, updateUserCompany} from "../../redux/companies-reducer";
import {useForm} from "react-hook-form";
import {COMPANIES_ROUTE, EDIT_COMPANY_ROUTE} from "../../utils/consts";
import BackButton from "../UI/BackButton";

const CompanyForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company = useSelector(state => state.companies.currentCompany)
    const location = useLocation()
    let currentCompany = location.pathname === EDIT_COMPANY_ROUTE ? company : null
    const {
        register,
        formState: {
            errors
        },
        reset,
        handleSubmit
    } = useForm({
        mode:"onBlur"
    })
    const onSubmit = (data) => {
        if(currentCompany) {
            dispatch(updateUserCompany({
                id:currentCompany.id,
                ...data
            }))
            dispatch(setIsEditMode(false))
            navigate(COMPANIES_ROUTE)
        } else {
            dispatch(createUserCompany(data))
            navigate(-1)
            reset()
        }

    }
    return (
        <div className="content position-relative" style={{display:'block', width:'100%'}}>
            <Button variant="secondary" onClick={() => navigate(-1)} style={{position:'absolute', left:'20px', top:'0',}} >
                <BackButton/>
            </Button>
            <h2 className="mb-3 fw-bold" style={{fontSize:'20px'}}>{currentCompany ? 'Редактирование компании' : 'Cоздание новой компании'}</h2>
            <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{width: '30%', margin: '50px auto'}}>
                <p className="text-lg-start mb-3">Имя компании: </p>
                <Form.Control
                    {...register('name', {
                        value: currentCompany?.name || '',
                        required:"Поле обязательно к заполнению",
                        minLength: {
                            value:2,
                            message:"Минимум 2 символа"
                        },
                    })}
                    placeholder="Введите название компании"
                ></Form.Control>
                <div className="text-danger mt-2">{errors?.name && <p>{errors?.name?.message || 'Ошибка'}</p>}</div>
                <p className="text-lg-start mb-3 mt-3">Адрес компании: </p>
                <Form.Control
                    {...register('address', {
                        value: currentCompany?.address || '',
                        required:"Поле обязательно к заполнению",
                        minLength: {
                            value:2,
                            message:"Минимум 2 символа"
                        },
                    })}
                    placeholder="Введите адрес компании"
                ></Form.Control>
                <div className="text-danger mt-2">{errors?.address && <p>{errors?.address?.message || 'Ошибка'}</p>}</div>
                <p className="text-lg-start mb-3 mt-3">Сфера деятельности: </p>
                <Form.Control
                    {...register('service_of_activity', {
                        value: currentCompany?.service_of_activity || '',
                        required:"Поле обязательно к заполнению",
                        minLength: {
                            value:2,
                            message:"Минимум 2 символа"
                        },
                    })}
                    placeholder="Введите сферу деятельности"
                ></Form.Control>
                <div className="text-danger mt-2">{errors?.service_of_activity && <p>{errors?.service_of_activity?.message || 'Ошибка'}</p>}</div>
                <p className="text-lg-start mb-3 mt-3">Количество работников: </p>
                <Form.Control
                    {...register('number_of_employees', {
                        value: currentCompany?.number_of_employees || '',
                        required:"Поле обязательно к заполнению",
                        minLength: {
                            value:2,
                            message:"Минимум 2 символа"
                        },
                    })}
                    placeholder="Введите количество работников компании"
                ></Form.Control>
                <div className="text-danger mt-2">{errors?.number_of_employees && <p>{errors?.number_of_employees?.message || 'Ошибка'}</p>}</div>
                <p className="text-lg-start mb-3 mt-3">Описание компании: </p>
                <Form.Control
                    {...register('description', {
                        value: currentCompany?.description || '',
                        required:"Поле обязательно к заполнению",
                        minLength: {
                            value:2,
                            message:"Минимум 2 символа"
                        },
                    })}
                    type="textarea"
                    placeholder="Введите  описание компании"
                ></Form.Control>
                <div className="text-danger mt-2">{errors?.description && <p>{errors?.description?.message || 'Ошибка'}</p>}</div>
                <p className="text-lg-start mb-3 mt-3">Тип компании: </p>
                <Form.Control
                    {...register('type', {
                        value: currentCompany?.type || '',
                        required:"Поле обязательно к заполнению",
                        minLength: {
                            value:2,
                            message:"Минимум 2 символа"
                        },
                    })}
                    placeholder="Введите тип компании"
                ></Form.Control>
                <div className="text-danger mt-2">{errors?.type && <p>{errors?.type?.message || 'Ошибка'}</p>}</div>
                <Button type="submit" variant="secondary"  className="mt-3" > {currentCompany ? 'Редактировать' : 'Создать компанию'} </Button>
            </Form>
        </div>
    );
};

export default CompanyForm;