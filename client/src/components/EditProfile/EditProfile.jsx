import React from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {updateUserProfile} from "../../redux/user-reducer";
import {useLocation, useNavigate} from "react-router-dom";
import {EDIT_PROFILE_ADMIN} from "../../utils/consts";
import {updateAdminUserThunk} from "../../redux/admin-reducer";

const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const currentUser = useSelector(state => state.admin.currentUser)
    const meUser = useSelector(state => state.user.user)
    let user = pathname === EDIT_PROFILE_ADMIN ? currentUser : meUser

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
        if(pathname === EDIT_PROFILE_ADMIN) {
            dispatch(updateAdminUserThunk(user.id, data))
        } else {
            const id = user.id
            dispatch(updateUserProfile({
                id,
                ...data
            }))
        }
        navigate(-1)
    }
    return (
        <div>
            <Card className="p-5" style={{width:'600px'}}>
                <Card.Title>Редактирование профиля</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-lg-start mb-3">Имя: </p>
                    <Form.Control
                        {...register('first_name', {
                            value: user.first_name,
                            required:"Поле обязательно к заполнению",
                            minLength: {
                                value:2,
                                message:"Минимум 2 символа"
                            },
                        })}
                        className="mt-3" placeholder="Имя"/>
                    <div className="text-danger mt-2">{errors?.first_name && <p>{errors?.first_name?.message || 'Ошибка'}</p>}</div>
                    <p className="text-lg-start mb-3">Фамилия: </p>
                    <Form.Control
                        {...register('last_name', {
                            value:user.last_name,
                            required:"Поле обязательно к заполнению",
                            minLength: {
                                value:2,
                                message:"Минимум 2 символа"
                            },
                        })}
                        className="mt-3" placeholder="Фамилия"/>
                    <div className="text-danger mt-2">{errors?.last_name && <p>{errors?.last_name?.message || 'Ошибка'}</p>}</div>
                    <p className="text-lg-start mb-3">Номер телефона: </p>
                    <Form.Control
                        {...register('phone_number', {
                            value:user.phone_number,
                            required:"Поле обязательно к заполнению",
                            pattern:/[0-9]/,
                        })}
                        className="mt-3" placeholder="Номер телефона"/>
                    <div className="text-danger mt-2">{errors?.phone_number && <p>{errors?.phone_number?.message || 'Ошибка'}</p>}</div>
                    <p className="text-lg-start mb-3">Никнейм: </p>
                    <Form.Control
                        {...register('nick_name', {
                            value:user.nick_name,
                            required:"Поле обязательно к заполнению",
                        })}
                        className="mt-3" placeholder="Никнейм"/>
                    <div className="text-danger mt-2">{errors?.nick_name && <p>{errors?.nick_name?.message || 'Ошибка'}</p>}</div>
                    <p className="text-lg-start mb-3">Описание: </p>
                    <Form.Control
                        {...register('description', {
                            value:user.description,
                            required:"Поле обязательно к заполнению",
                        })}
                        className="mt-3" placeholder="Описание"/>
                    <div className="text-danger mt-2">{errors?.description && <p>{errors?.description?.message || 'Ошибка'}</p>}</div>
                    <p className="text-lg-start mb-3">Должность: </p>
                    <Form.Control
                        {...register('position', {
                            value:user.position,
                            required:"Поле обязательно к заполнению",
                        })}
                        className="mt-3" placeholder="Должность"/>
                    <div className="text-danger mt-2">{errors?.position && <p>{errors?.position?.message || 'Ошибка'}</p>}</div>
                    <Button type="submit" style={{width: '100%'}} className="mt-3" variant="secondary">Редактировать</Button>
                </Form>
            </Card>
        </div>
    );
};

export default EditProfile;