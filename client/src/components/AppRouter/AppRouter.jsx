import React from 'react';
import {redirect, Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../../routes";
import Welcome from "../../pages/Welcome";
import {useSelector} from "react-redux";
import {ADMIN_ROUTE} from "../../utils/consts";
import Admin from "../../pages/Admin";

const AppRouter = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const isAdmin = useSelector(state => state.user.isUserAdmin);
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} element={<Component/>}/>
            )}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} element={<Component/>}/>
            )}
            {isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Welcome/>}></Route>
        </Routes>
    );
};

export default AppRouter;