import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import { router } from './router';

import './styles/index.css';
import ThemeToggle from "./components/ThemeToggle"; 

//render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="app-root">
        <AuthContextProvider>
            <RouterProvider router={router}/>
            <ThemeToggle /> 
        </AuthContextProvider>
        </div>
    </React.StrictMode>
);