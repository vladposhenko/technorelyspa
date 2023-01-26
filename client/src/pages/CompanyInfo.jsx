import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyByName, setCurrentCompany, setIsEditMode} from "../redux/companies-reducer";
import {Button, Card} from "react-bootstrap";

const CompanyInfo = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentCompany = useSelector(state => state.companies.currentCompany)

    useEffect(() => {
        dispatch(getCompanyByName(params.name))
        // return () => {
        //     dispatch(setCurrentCompany({}))
        // }
    },[])

    const handleClick = () => {
        dispatch(setIsEditMode(true))
        navigate('/companies/create')
    }
    return (
        <div className="content position-relative" style={{display:'block', width:'100%'}}>
            <Button variant="secondary" onClick={() => navigate(-1)} style={{position:'absolute', left:'20px', top:'0', borderRadius:'50%'}} >/-</Button>
            <h3 className="fw-bold" style={{fontSize: '25px'}}>{currentCompany?.name}</h3>
            <Card bg="light" className="p-4 mt-4" style={{width: '600px', margin: '0 auto'}}>
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
    );
};

export default CompanyInfo;