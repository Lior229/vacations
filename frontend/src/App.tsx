import React from 'react';
import './App.css';
import AuthMenu from './components/AuthArea/AuthMenu/AuthMenu';
import Router from './components/Router/Router';

function App() {
    return (
            <>
                <Router />
                <AuthMenu />
            </>
    );
}

export default App;
