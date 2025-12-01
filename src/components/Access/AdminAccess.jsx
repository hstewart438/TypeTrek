import { UseAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';    

const AdminAccess = () => {
    const { session } = UseAuth();

    if (session === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {session 
            ? (
                <div className="flex items-center space-x-2 ">
                    <Link to="/admin">Admin</Link>
                </div>
                ) 
            : (null)
            }
        </>
    );
};

export default AdminAccess;