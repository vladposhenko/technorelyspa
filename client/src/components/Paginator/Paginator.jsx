import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";

const Paginator = ({totalCount = 36, handleClick}) => {
    const [activePage, setActivePage] = useState(0)
    const countOfPages = Math.ceil((totalCount / 6)) - 1;
    let items = [];

    for (let number = 0; number <= countOfPages; number++) {
        items.push(
            <Pagination.Item onClick={() => {
                setActivePage(number)
                handleClick(number)
            }} key={number} active={number === activePage}>
                {number + 1}
            </Pagination.Item>,
        );
    }
    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                {items}
            </Pagination>
        </div>
    );
};

export default Paginator;