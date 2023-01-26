import React from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompanies, getAllUsers} from "../redux/admin-reducer";

const Admin = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.admin.users)
    const companies = useSelector(state => state.admin.companies)
    return (
        <div className="content p-0" style={{display:'block', width:'100%'}}>
           <Card className="p-3">
               <Card.Title>Админ панель</Card.Title>
               <div>
                   <Button
                       onClick={() => dispatch(getAllUsers())}
                       className="m-lg-2"
                       size="sm"
                       variant="secondary">Все пользователи системы</Button>
                   <Button size="sm" variant="secondary" onClick={() => dispatch(getAllCompanies())}>Все компании системы</Button>
               </div>
           </Card>
            <Card className="mt-5">
                {users &&
                    users.map((user) => <Card.Text>{user.nick_name}</Card.Text> )
                }
                {companies &&
                    companies.map((company) => <Card.Text>{company.name}</Card.Text>)
                }
            </Card>
        </div>
    );
};

export default Admin;