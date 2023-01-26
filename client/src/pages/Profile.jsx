import React from 'react';
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Profile = () => {
    const user = useSelector(state => state.user.user)
    return (
        <div >
            <Card bg="light" className="p-4 mt-4" style={{width: '900px', margin: '0 auto'}}>
                <div className="d-flex justify-content-center gap-2">
                    <Card.Text className="mb-4">
                        {user.first_name}
                    </Card.Text>
                    <Card.Text className="mb-4">
                        {user.last_name}
                    </Card.Text>
                </div>
                <Card.Text className="mb-4">
                    Никнейм: {user.nick_name}
                </Card.Text>
                <Card.Text className="mb-4">
                    Email: {user.email}
                </Card.Text>
                <Card.Text className="mb-4">
                    Номер телефона: {user.phone_number}
                </Card.Text>
                <Button variant="secondary">Редактировать данные</Button>
            </Card>
        </div>
    );
};

export default Profile;