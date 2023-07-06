import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../HomeArea/Home/Home';
import React, { FC } from 'react';
import styles from './Router.module.scss';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../AuthArea/Register/Register';
import Login from '../AuthArea/Login/Login';

interface RouterProps { }

const Router: FC<RouterProps> = () => (
    <Routes>
        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/*  Default route*/}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

