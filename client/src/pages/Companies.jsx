import React, {useEffect} from 'react';
import {Button, ListGroup} from "react-bootstrap";
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
                <h2 className="fw-bold" style={{fontSize: '30px'}}>Here is your active companies</h2>
                <ListGroup className="mt-3">
                    {companies && companies?.map((company) =>
                        <ListGroup.Item
                            action
                            onClick={() => navigate('/companies/' + company.name)}
                            style={{cursor:'pointer'}}>
                            {company.name}
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <div className='pt-5'>
                    <Button variant="secondary" onClick={() => navigate('/companies/create')}>Создать новую компанию</Button>
                </div>
            </div>
        </div>
    );
};

export default Companies;