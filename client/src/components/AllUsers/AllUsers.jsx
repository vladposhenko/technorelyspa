import React, {useEffect} from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import Paginator from "../Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../redux/admin-reducer";

const AllUsers = () => {
    const dispatch = useDispatch()
    const {users, totalCountOfUsers} = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const handleClick = (page) => {
        dispatch(getAllUsers(page))
    }
    return (
        <div className="content p-0" style={{display:'block', width:'100%', marginTop:'-30px'}}>
            <h3 className="mt-5 fw-bold mb-5" style={{fontSize:'30px'}}>Все пользователи системы</h3>
            <ListGroup className="mt-3 d-flex flex-row flex-wrap justify-content-center gap-3 mb-5">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        style={{cursor:'pointer', width:'30%'}}>
                        <Card.Header as="h3">{user.nick_name}</Card.Header>
                        <Button style={{width: '50%', margin:'20px auto'}} variant="outline-secondary">Детальнее</Button>
                    </Card>
                ))}
            </ListGroup>
            <Paginator handleClick={handleClick} totalCount={totalCountOfUsers}/>
        </div>

    );
};

export default AllUsers;