import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, ListGroup, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {logOutThunk} from "../redux/auth-reducer";
import {getUserCompanies} from "../redux/companies-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {COMPANIES_ROUTE, PROFILE_EDIT_ROUTE} from "../utils/consts";
import {getOneUserThunk} from "../redux/admin-reducer";
import BackButton from "../components/UI/BackButton";

const Profile = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const meUser = useSelector(state => state.user.user)
    const isUserAdmin = useSelector(state => state.user.isUserAdmin)
    const currentUser = useSelector(state => state.admin.currentUser)
    const isLoading = useSelector(state => state.auth.isLoading)
    const companies = useSelector(state => state.companies.companiesList)
    let user = params.id ? currentUser : meUser
    let companiesView = companies.slice(0, 4)
    let companiesMap = companies.length > 4 ? companiesView : companies
    useEffect(() => {
        if(params.id) dispatch(getOneUserThunk(params.id))
        dispatch(getUserCompanies())
    },[])
    if(isLoading) return <Spinner/>
    return (
        <Container>
            <div className=" gap-5 position-relative p-3">
                <div className="d-flex justify-content-center flex-column">
                    <Card style={{height: '100%'}} className="p-5 d-flex justify-content-center  align-items-center flex-grow-0 flex-row">
                        {params.id &&
                            <Button variant="secondary"
                                    onClick={() => navigate(-1)}
                            >
                                <BackButton/>
                            </Button>
                        }
                        <div className="p-5 d-flex flex-column align-items-center align-self-end">
                            {!params.id &&
                                isUserAdmin &&
                                <Button style={ {position:'absolute', right: '15px', top:'15px' } } size="small" disabled variant="danger">
                                    ??????????????????????????
                                </Button>

                            }
                            <img width='200' className="mt-5" src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt=""/>
                            <Card.Text className="mb-4 mt-4">
                                {user?.first_name} {user?.last_name}
                            </Card.Text>
                            <Card.Text>Email: {user?.email}</Card.Text>
                            {!params.id &&
                                <Button onClick={() => dispatch(logOutThunk())} variant="secondary" className="mt-4">?????????? ???? ??????????????</Button>
                            }
                        </div>
                        <div style={{height:'100%'}} className="p-5 d-flex flex-column gap-3 align-self-end justify-content-between">
                            <Card.Title>???????????? ????????????????????????</Card.Title>
                            <Card.Text>??????: {user?.first_name}</Card.Text>
                            <Card.Text>??????????????: {user?.last_name}</Card.Text>
                            <Card.Text>??????????????: {user?.nick_name}</Card.Text>
                            <Card.Text>?????????? ????????????????: {user?.phone_number}</Card.Text>
                            <Card.Text>????????????????: {user?.description}</Card.Text>
                            <Card.Text>??????????????????: {user?.position}</Card.Text>
                            <Button onClick={() => {
                                if(location.pathname === ('/admin/profile/' + params.id)) {
                                    navigate('/admin/profile/edit')
                                } else {
                                    navigate(PROFILE_EDIT_ROUTE)
                                }
                            } } variant="secondary">????????????????</Button>
                        </div>
                    </Card>
                    <div style={{height:'100%'}} className="d-flex flex-column gap-4 mt-4">
                        <Card className="p-5">
                            <Card.Title>????????????????</Card.Title>
                            <Card.Text className="mb-3">????????????????????  ????????????????: {params.id ? user?.company?.length : companies.length}</Card.Text>
                            <ListGroup>
                                {params.id
                                    ? user?.company?.map((company) => (
                                        <ListGroup.Item onClick={() => navigate('/companies/' + company.name)}
                                                        action
                                                        variant="outline-secondary"
                                                        key={company.name}>{company.name}</ListGroup.Item>
                                    ))
                                    : companiesMap.map((company) => (
                                        <ListGroup.Item onClick={() => navigate('/companies/' + company.name)}
                                                        action variant="outline-secondary"
                                                        key={company.name}>{company.name}</ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            {!params.id &&
                                <Button onClick={() => navigate(COMPANIES_ROUTE)} className="mt-3" variant="secondary">
                                    {companies.length ? '???????????????????? ??????' : '?????????????? ????????????????' }
                                </Button>
                            }
                        </Card>
                    </div>
                </div>

            </div>
        </Container>

    );
};

export default Profile;