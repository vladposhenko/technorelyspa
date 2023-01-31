import React, {useEffect} from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getUserCompanies} from "../redux/companies-reducer";
import {useNavigate} from "react-router-dom";

const Companies = () => {
    const dispatch = useDispatch()
    const companies = useSelector(state => state.companies.companiesList)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getUserCompanies())
    },[])

    return (
        <div className="content p-0" style={{display:'block', width:'100%'}}>
            <div className="p-4">
                <h2 className="fw-bold mb-2" style={{fontSize: '30px'}}>Мои компании</h2>
                <div className='pt-3'>
                    <Button variant="secondary" onClick={() => navigate('/companies/create')}>Создать новую компанию</Button>
                </div>
                <div className="mt-3 d-flex flex-row flex-wrap justify-content-center gap-3">
                    {companies && companies?.map((company) =>
                        <Card
                            onClick={() => navigate('/companies/' + company.name)}
                            style={{cursor:'pointer', width:'30%'}}>
                            <Card.Header as="h3">{company.name}</Card.Header>
                            <Card.Img style={{width:'50px'}} className="m-auto mt-3"
                                      src="https://www.seekpng.com/png/full/475-4758272_line-logo-black-png-logo.png"></Card.Img>
                            <Card.Text className="mt-3">
                                Сфера деятельности: {company.service_of_activity}
                            </Card.Text>
                            <Button style={{width: '50%', margin:'20px auto'}} variant="outline-secondary">Детальнее</Button>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Companies;