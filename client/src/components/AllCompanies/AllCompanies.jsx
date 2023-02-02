import React, {useEffect} from 'react';
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";
import {getAllCompanies, getAllUsers} from "../../redux/admin-reducer";
import Paginator from "../Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {withLoading} from "../../hoc/withLoading";
import Company from "../Company/Company";

const AllCompanies = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                        // <Card
                        //     style={{cursor:'pointer', width:'30%'}}>
                        //     <Card.Header as="h3">{company.name}</Card.Header>
                        //     <Card.Img style={{width:'50px'}} className="m-auto mt-3"
                        //               src="https://www.seekpng.com/png/full/475-4758272_line-logo-black-png-logo.png"></Card.Img>
                        //     <Button
                        //             disabled
                        //             onClick={() => navigate('/admin/companies/' + company.name)}
                        //             style={{width: '50%', margin:'20px auto'}}
                        //             variant="outline-secondary">Детальнее(в разработке)</Button>
                        // </Card>
                    ))}
                </ListGroup>
            }
            <Paginator handleClick={handleClick} totalCount={totalCountOfCompanies}/>
        </div>
    );
};

export default AllCompanies;