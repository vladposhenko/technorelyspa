import React, {useEffect} from 'react';
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";
import Paginator from "../Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../redux/admin-reducer";



const AllUsers = () => {
    const dispatch = useDispatch()
    const {users, totalCountOfUsers} = useSelector(state => state.admin)
    const isLoading = useSelector(state => state.auth.isLoading)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const handleClick = (page) => {
        dispatch(getAllUsers(page))
    }
    return (
        <div className="content p-0" style={{display:'block', width:'100%', marginTop:'-30px'}}>
            <h3 className="mt-5 fw-bold mb-5" style={{fontSize:'30px'}}>Все пользователи системы</h3>
            {isLoading ? <Spinner className="mb-5"/>
            :<ListGroup className="mt-3 d-flex flex-row flex-wrap justify-content-center gap-3 mb-5">
                    {users.map((user) => (
                        <Card
                            key={user.id}
                            style={{cursor:'pointer', width:'30%', }}>
                            <Card.Header as="h3">{user.nick_name}</Card.Header>
                            <div className="d-flex flex-column gap-3 pb-4 pt-4">
                                   <img className="m-auto" width='50' src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt=""/>
                                    <p>{user.first_name} {user.last_name}</p>
                                    <Button style={{width: '50%', margin:'0 auto'}} variant="outline-secondary">Детальнее</Button>
                            </div>
                        </Card>
                    ))}
                </ListGroup>
            }
            <Paginator handleClick={handleClick} totalCount={totalCountOfUsers}/>
        </div>

    );
};

export default AllUsers;