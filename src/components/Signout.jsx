import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signout = () => {
    const { signOutUser } = UserAuth();
    const navigate = useNavigate(); 

    const handleSignOut = async () => {
        try {
            await signOutUser(); // Call context function to sign out
            navigate('/home'); // Redirect to sign-in page after sign out
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
        <button onClick={handleSignOut} className="p-1 mt-1 border border-2 bg-red-500 text-white rounded">
            Sign Out
        </button>
        </>
    );
}


export default Signout;