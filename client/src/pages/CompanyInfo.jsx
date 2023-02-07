import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyByName, setIsEditMode} from "../redux/companies-reducer";
import {Button, Card, Spinner} from "react-bootstrap";
import BackButton from "../components/UI/BackButton";
import Container from "react-bootstrap/Container";


const CompanyInfo = () => {
    const { name } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentCompany = useSelector(state => state.companies.currentCompany)
    const isLoading = useSelector(state => state.auth.isLoading)

    useEffect(() => {
        dispatch(getCompanyByName(name))
    },[])

    const handleClick = () => {
        dispatch(setIsEditMode(true))
        navigate('/companies/edit')
    }
    if(isLoading) return <Spinner/>
    return (
        <div className="content position-relative d-flex flex-column align-items-center justify-content-center" style={{display:'block', width:'100%'}}>
            <Container>
                <Button variant="secondary" onClick={() => navigate(-1)} style={{position:'absolute', left:'20px',  top:'0',}} >
                    <BackButton/>
                </Button>
                <div className="d-flex justify-content-center align-items-center gap-5">
                    <div>
                        <Card.Img style={{width:'250px'}} className="m-auto mt-3"
                                  src="https://www.seekpng.com/png/full/475-4758272_line-logo-black-png-logo.png"></Card.Img>
                        <h3 className="fw-bold mt-3" style={{fontSize: '25px'}}>{currentCompany?.name}</h3>
                    </div>
                    <div className="align-self-center">
                        <p className="fw-bold" style={{fontSize: '25px'}}>Данные о компании: </p>
                        <Card style={{width:'600px'}} className="p-4 mt-4 flex-wrap">
                            <Card.Text className="mb-4">
                                Адрес компании: <i>{currentCompany?.address}</i>
                            </Card.Text>
                            <Card.Text className="mb-4">
                                Количество работников: <i>{currentCompany?.number_of_employees}</i>
                            </Card.Text>
                            <Card.Text className="mb-4">
                                Сфера деятельности: <i>{currentCompany?.service_of_activity}</i>
                            </Card.Text>
                            <Card.Text className="mb-4">
                                Описание компании: <i>{currentCompany?.description}</i>
                            </Card.Text>
                            <Card.Text className="mb-4">
                                Тип компании: <i>{currentCompany?.type}</i>
                            </Card.Text>
                            <Button variant="secondary" onClick={handleClick}>Редактировать</Button>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CompanyInfo;