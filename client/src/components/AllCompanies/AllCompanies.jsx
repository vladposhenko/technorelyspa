import React, {useEffect} from 'react';
import {ListGroup, Spinner} from "react-bootstrap";
import {getAllCompanies} from "../../redux/admin-reducer";
import Paginator from "../Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Company from "../Company/Company";

const AllCompanies = () => {
    const dispatch = useDispatch()
    const {companies, totalCountOfCompanies} = useSelector(state => state.admin)
    const isLoading = useSelector(state => state.auth.isLoading)
    useEffect(() => {
        dispatch(getAllCompanies())
    }, [])
    const handleClick = (page) => {
        dispatch(getAllCompanies(page))
    }
    return (
        <div className="content p-0" style={{display:'block', width:'100%', marginTop:'-30px'}}>
            <h3 className="mt-5 fw-bold mb-5" style={{fontSize:'30px'}}>Все компании системы</h3>
            {isLoading ? <Spinner className="mb-5"/>
                : <ListGroup className="mt-3 d-flex flex-row flex-wrap justify-content-center gap-3 mb-5">
                    {companies?.length && companies?.map((company) => (
                        <Company company={company} isAdmin={true}/>
                    ))}
                </ListGroup>
            }
            <Paginator handleClick={handleClick} totalCount={totalCountOfCompanies}/>
        </div>
    );
};

export default AllCompanies;