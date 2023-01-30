import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createUserCompany, setIsEditMode, updateUserCompany} from "../../redux/companies-reducer";

const CompanyForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isEditMode = useSelector(state => state.companies.isEditMode)
    const currentCompany = useSelector(state => state.companies.currentCompany)
    const [name, setName] = useState(currentCompany.name || '')
    const [address, setAddress] = useState(currentCompany.address || '')
    const [serviceOfActivity, setServiceOfActivity] = useState(currentCompany.service_of_activity || '')
    const [numberOfEmployees, setNumberOfEmployees] = useState(currentCompany.number_of_employees || '')
    const [description, setDescription] = useState(currentCompany.description || '')
    const [type, setType] = useState(currentCompany.type || '')
    const handleClick = () => {
        if(isEditMode) {
            dispatch(updateUserCompany({
                id:currentCompany.id,
                name,
                address,
                service_of_activity:serviceOfActivity,
                number_of_employees: numberOfEmployees,
                description,
                type
            }))
            dispatch(setIsEditMode(false))
            navigate('/companies')
        } else {
            dispatch(createUserCompany({
                name,
                address,
                service_of_activity:serviceOfActivity,
                number_of_employees: numberOfEmployees,
                description,
                type
            }))
            navigate('/companies')
        }

    }
    return (
        <div className="content position-relative" style={{display:'block', width:'100%'}}>
            <Button variant="secondary" onClick={() => navigate(-1)} style={{position:'absolute', left:'20px', top:'0', borderRadius:'50%'}} >/-</Button>
            <h2 className="mb-3 fw-bold" style={{fontSize:'20px'}}>Создание новой компании</h2>
            <Form className="d-flex flex-column" style={{width: '30%', margin: '50px auto'}}>

                <p className="text-lg-start mb-3">Имя компании: </p>
                <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите название компании"
                ></Form.Control>
                <p className="text-lg-start mb-3 mt-3">Адрес компании: </p>
                <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Введите адрес компании"
                ></Form.Control>
                <p className="text-lg-start mb-3 mt-3">Сфера деятельности: </p>
                <Form.Control
                    value={serviceOfActivity}
                    onChange={(e) => setServiceOfActivity(e.target.value)}
                    placeholder="Введите сферу деятельности"
                ></Form.Control>
                <p className="text-lg-start mb-3 mt-3">Количество работников: </p>
                <Form.Control
                    value={numberOfEmployees}
                    onChange={(e) => setNumberOfEmployees(e.target.value)}
                    placeholder="Введите количество работников компании"
                ></Form.Control>
                <p className="text-lg-start mb-3 mt-3">Описание компании: </p>
                <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="textarea"
                    placeholder="Введите  описание компании"
                ></Form.Control>
                <p className="text-lg-start mb-3 mt-3">Тип компании: </p>
                <Form.Control
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Введите тип компании"
                ></Form.Control>
                <Button variant="secondary" onClick={handleClick}  className="mt-3" > {isEditMode ? 'Редактировать' : 'Создать компанию'} </Button>
            </Form>
        </div>
    );
};

export default CompanyForm;