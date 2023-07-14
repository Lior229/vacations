import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
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
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Home */}

        {/* <ProtectedRoute>
            <Route path="/home" element={<Home/> }/>
        </ProtectedRoute> */}

        <Route path="/home" element={
            <ProtectedRoute>
            <Home/>
            </ProtectedRoute>
        }/>

        <Route path="/new" element={
            <ProtectedRoute>
            <Home/>
            </ProtectedRoute>
        }/>
        
        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

