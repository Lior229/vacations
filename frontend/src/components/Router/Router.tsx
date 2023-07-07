import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../HomeArea/Home/Home';
import React, { FC } from 'react';
import styles from './Router.module.scss';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

interface RouterProps { }

const Router: FC<RouterProps> = () => (
    <Routes>
        {/*  Default route*/}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Home */}
        <Route path="/home" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
        }/>

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/*  Default route*/}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

