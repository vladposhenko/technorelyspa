import React, {useEffect} from 'react';
import './welcome.css'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {COMPANIES_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Button, Spinner} from "react-bootstrap";
const Welcome = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const isLoading = useSelector(state => state.auth.isLoading)
    const navigate = useNavigate()
    useEffect(() => {
        if(isAuth) navigate(COMPANIES_ROUTE)
    }, [isAuth])
    if(isLoading || undefined) return <Spinner/>
    return (
        <div  className="content">
            <div>
                <h1 className="welcome__title">Welcome to Technorely Management System</h1>
                <p className="welcome__description">Here you can manage your companies.</p>
                <div>
                    <Button onClick={() => navigate(LOGIN_ROUTE)} variant="secondary" style={{width:'100px'}} className="mt-3">Start</Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;