import React from 'react';
import { UseAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { session } = UseAuth();
  
    if (session === undefined) {
      return <div>Loading...</div>;
    }

    return (<>{session ? <>{children}</>
    : <div className="flex flex-col items-center justify-center mt-32">
        <span className=" text-xl font-bold">
          Please log in to your account to access user features.
        </span>
    </div>
    }</>);
};
export default PrivateRoute;