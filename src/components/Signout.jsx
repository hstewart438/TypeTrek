import { Link, useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';

const Signout = () => {
    const { signOutUser } = UseAuth();
    const navigate = useNavigate(); 

    const handleSignOut = async () => {
        try {
            await signOutUser(); // Call context function to sign out
            navigate("/home"); // Redirect to sign-in page after sign out
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
        <button onClick={handleSignOut} className="border rounded-full border-1 px-2 py-1 bg-black text-white">
            Sign Out
        </button>
        </>
    );
}


export default Signout;