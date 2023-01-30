import React from 'react';
import {Card, ListGroup, Tab, Tabs} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompanies, getAllUsers, setAllCompanies, setUsers} from "../redux/admin-reducer";
import AllUsers from "../components/AllUsers/AllUsers";



const Admin = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.admin.users)
    const totalCountOfUsers = useSelector(state => state.admin.totalCountOfUsers)
    const companies = useSelector(state => state.admin.companies)
    const handleCompaniesClick = () => {
        dispatch(getAllCompanies())
    }
    const handleUsersClick = () => {
        dispatch(getAllUsers())
    }
    return (
        <div className="content p-0" style={{display:'block', width:'100%', marginTop:'-30px'}}>
               <div>
                   <Tabs
                       defaultActiveKey="home"
                       transition={false}
                       id="noanim-tab-example"
                       className="mb-3 justify-content-center mt-3"
                   >
                       <Tab  eventKey="home" title="Пользователи">
                           <AllUsers totalCountOfUsers={totalCountOfUsers} handleUsersClick={handleUsersClick}  users={users}/>
                       </Tab>
                       {/*<Tab eventKey="profile" title="Компании">*/}
                       {/*    <AllCompanies handleCompaniesClick={handleCompaniesClick}  companies={companies}/>*/}
                       {/*</Tab>*/}
                   </Tabs>
                   {/*<Button*/}
                   {/*    style={{border:'none', borderBottom:'1px solid #6c757d', borderRadius:'0'}}*/}
                   {/*    onClick={handleUsersClick}*/}
                   {/*    className="m-lg-3 p-3"*/}
                   {/*    size="sm"*/}
                   {/*    variant="outline-secondary">Все пользователи системы</Button>*/}
                   {/*<Button style={{border:'none', borderBottom:'1px solid #6c757d', borderRadius:'0'}}*/}
                   {/*         size="sm" variant={companies.length ? "secondary" : "outline-secondary"}*/}
                   {/*        className="p-3"*/}
                   {/*        onClick={handleCompaniesClick}>Все компании системы</Button>*/}
               </div>

        </div>
    );
};

export default Admin;