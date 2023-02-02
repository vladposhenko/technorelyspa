import React from 'react';
import {Button, Card} from "react-bootstrap";

const Company = ({company, handleCardDelete, handleCardDetails , isAdmin}) => {
    return (
        <Card
            style={{cursor:'pointer', width:'370px'}}>
            <Card.Header className="d-flex justify-content-between align-items-center" as="h3">{company.name}
                {!isAdmin &&
                    <Button onClick={() => handleCardDelete(company.id)} size="sm" variant="secondary">Удалить</Button>
                }
            </Card.Header>
            <Card.Img style={{width:'50px'}} className="m-auto mt-3"
                      src="https://www.seekpng.com/png/full/475-4758272_line-logo-black-png-logo.png"></Card.Img>
            <Card.Text className="mt-3">
                Сфера деятельности: {company.service_of_activity}
            </Card.Text>

            <Button disabled={isAdmin} onClick={() => handleCardDetails(company.name)}
                    style={{width: '50%', margin:'20px auto'}} variant="outline-secondary">{isAdmin ? '(в разработке)' : 'Детальнее'}</Button>
        </Card>
    );
};

export default Company;