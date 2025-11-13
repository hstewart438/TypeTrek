import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import { router } from './router';

//render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </React.StrictMode>
);