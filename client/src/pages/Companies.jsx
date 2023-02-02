import React, {useEffect} from 'react';
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteMyCompany, getUserCompanies} from "../redux/companies-reducer";
import {useNavigate} from "react-router-dom";
import {deleteCompany} from "../http/companiesApi";
import {withLoading} from "../hoc/withLoading";
import Paginator from "../components/Paginator/Paginator";
import {getAllUsers} from "../redux/admin-reducer";
import Company from "../components/Company/Company";

const Companies = () => {
    const dispatch = useDispatch()
    const companies = useSelector(state => state.companies.companiesList)
    const totalCountMyCompanies = useSelector(state => state.companies.totalCountMyCompanies)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getUserCompanies())
    },[])
    const handleClick = page => {
        dispatch(getUserCompanies(page))
    }
    const handleCardDelete = id => {
        dispatch(deleteMyCompany(id))
    }
    const handleCardDetails = name => {
        navigate('/companies/' + name)
    }
    return (
        <div className="content p-0" style={{display:'block', width:'100%'}}>
            <div className="p-4">
                <h2 className="fw-bold mb-2" style={{fontSize: '30px'}}>Мои компании</h2>
                <div className='pt-3'>
                    <Button variant="secondary" onClick={() => navigate('/companies/create')}>Создать новую компанию</Button>
                </div>
                <div className="mt-3 d-flex flex-row flex-wrap justify-content-center gap-3 mb-3">
                    {companies && companies?.map((company) =>
                        <Company company={company} handleCardDelete={handleCardDelete} handleCardDetails={handleCardDetails}/>
                    )}
                </div>
                <Paginator handleClick={handleClick} totalCount={totalCountMyCompanies}/>
            </div>
        </div>
    );
};

export default Companies;