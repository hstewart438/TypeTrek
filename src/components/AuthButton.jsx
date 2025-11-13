import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';    
import Signup from './Signup';  
import Signout from './Signout';

const AuthButton = ({ children }) => {
    const { session } = UserAuth();

    return (
        <>
        {session ? (<Signout/>) : (<Link to="/signin">Sign in</Link>) }
        </>
    );
};

export default AuthButton;