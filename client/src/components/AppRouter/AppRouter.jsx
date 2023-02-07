import React from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../../routes";
import Welcome from "../../pages/Welcome";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const {isAuth, isLoading} = useSelector(state => state.auth);
    const isAdmin = useSelector(state => state.user.isUserAdmin);
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route isLoading={isLoading}  key={path} exact path={path} element={<Component/>}/>
            )}

            {publicRoutes.map(({path, Component}) =>
                <Route isLoading={isLoading}  key={path} exact path={path} element={<Component/>}/>
            )}
            {isAdmin && isAuth && adminRoutes.map(({path, Component}) =>
                <Route isLoading={isLoading} key={path} exact path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Welcome/>}></Route>
        </Routes>
    );
};

export default AppRouter;