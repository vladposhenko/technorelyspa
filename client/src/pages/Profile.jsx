import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, ListGroup, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {logOutThunk} from "../redux/auth-reducer";
import {getUserCompanies} from "../redux/companies-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {COMPANIES_ROUTE, PROFILE_EDIT_ROUTE} from "../utils/consts";
import {getOneUserThunk, setCurrentUser} from "../redux/admin-reducer";

const Profile = () => {
    const params = useParams()
    console.log(params)
    const meUser = useSelector(state => state.user.user)
    const currentUser = useSelector(state => state.admin.currentUser)
    const isLoading = useSelector(state => state.auth.isLoading)
    let user = params.id ? currentUser : meUser
    const isUserAdmin = useSelector(state => state.user.isUserAdmin)
    const companies = useSelector(state => state.companies.companiesList)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let companiesView = companies.slice(0, 4)
    let companiesMap = companies.length > 4 ? companiesView : companies
    useEffect(() => {
        if(params.id) dispatch(getOneUserThunk(params.id))
        dispatch(getUserCompanies())
    },[])
    if(isLoading) return <Spinner/>
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-stretch gap-5 position-relative mt-5">
                <div className="d-flex">
                    <Card style={{height: '100%'}} className="p-5 d-flex  align-items-center flex-grow-0 flex-row">
                        {params.id &&
                            <Button variant="secondary"
                                    onClick={() => navigate(-1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </Button>
                        }
                        <div className="p-5 d-flex flex-column align-items-center flex-grow-0">
                            {!params.id &&
                                isUserAdmin &&
                                <Button style={ {position:'absolute', right: '15px', top:'15px' } } size="small" disabled variant="danger">
                                    Администратор
                                </Button>

                            }
                            <img width='200' className="mt-5" src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt=""/>
                            <Card.Text className="mb-4 mt-4">
                                {user?.first_name} {user?.last_name}
                            </Card.Text>
                            <Card.Text>Email: {user?.email}</Card.Text>
                            {!params.id &&
                                <Button onClick={() => dispatch(logOutThunk())} variant="secondary" className="mt-4">Выйти из профиля</Button>
                            }
                        </div>
                        <div style={{height:'100%'}} className="p-5 d-flex flex-column gap-3 justify-content-between">
                            <Card.Title>Данные пользователя</Card.Title>
                            <Card.Text>Имя: {user?.first_name}</Card.Text>
                            <Card.Text>Фамилия: {user?.last_name}</Card.Text>
                            <Card.Text>Никнейм: {user?.nick_name}</Card.Text>
                            <Card.Text>Номер телефона: {user?.phone_number}</Card.Text>
                            <Card.Text>Описание: {user?.description}</Card.Text>
                            <Card.Text>Должность: {user?.position}</Card.Text>
                            <Button onClick={() => navigate(PROFILE_EDIT_ROUTE)} variant="secondary">Изменить</Button>
                        </div>
                    </Card>
                </div>
                <div style={{height:'100%'}} className="d-flex flex-column gap-4">
                    <Card className="p-5">
                        <Card.Title>Компании</Card.Title>
                        <Card.Text className="mb-3">Количество  компаний: {params.id ? user?.company?.length : companies.length}</Card.Text>
                        <ListGroup>
                            {params.id
                            ? user?.company?.map((company) => (
                                    <ListGroup.Item onClick={() => navigate('/companies/' + company.name)} action variant="outline-secondary" key={company.name}>{company.name}</ListGroup.Item>
                                ))
                            : companiesMap.map((company) => (
                                        <ListGroup.Item onClick={() => navigate('/companies/' + company.name)} action variant="outline-secondary" key={company.name}>{company.name}</ListGroup.Item>
                                    ))
                            }
                            {/*{companiesMap.map((company) => (*/}
                            {/*    <ListGroup.Item onClick={() => navigate('/companies/' + company.name)} action variant="outline-secondary" key={company.name}>{company.name}</ListGroup.Item>*/}
                            {/*))}*/}
                        </ListGroup>
                        {!params.id &&
                            <Button onClick={() => navigate(COMPANIES_ROUTE)} className="mt-3" variant="secondary">
                                {companies.length ? 'Посмотреть все' : 'Создать компанию' }
                            </Button>
                        }
                    </Card>
                </div>
            </div>
        </Container>

    );
};

export default Profile;