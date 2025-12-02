import { UseAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';    

const AccessButton = () => {
    const { session } = UseAuth();
    const { signOutUser } = UseAuth();
    const navigate = useNavigate(); 

    const handleSignOut = async () => {
        try {
            await signOutUser(); // Call context function to sign out
            navigate("/home"); // Redirect to sign-in page after sign out
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (session === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {session 
        ? (
            <div className="flex items-center space-x-2 ">
                <button onClick={handleSignOut} className="relative group overflow-hidden rounded-full p-2 bg-black cursor-pointer">
            {/* Animation */}
                <span className="absolute inset-0 rounded-full bg-red-600 scale-0 group-hover:scale-150 transition-transform duration-500"></span>
                <span className="relative z-10 text-white">Sign out</span>
            </button>
            </div>
            ) 
        : (
            <div className="flex items-center space-x-2">
                <Link to="/login">
                    <button
                        className="relative group overflow-hidden rounded-full px-4 py-2 text-center shadow-sm cursor-pointer"
                        style={{
                        backgroundColor: "var(--bg-elevated)",
                        color: "var(--text)",
                        border: "1px solid var(--border)",
                        }}
                    >
                        <span className="absolute inset-0 rounded-full bg-sky-300 scale-0 group-hover:scale-150 transition-transform duration-500"></span>
                        <span className="relative z-10 group-hover:text-black duration-500">Log in</span>
                    </button>
                </Link>
                <Link to="/signup">
                    <button
                        className="relative group overflow-hidden rounded-full px-4 py-2 text-center cursor-pointer shadow-sm"
                        style={{
                        backgroundColor: "var(--bg-elevated)",
                        color: "var(--text)",
                        border: "1px solid var(--border)",
                        }}
                    >
                        <span className="absolute inset-0 rounded-full bg-amber-400 scale-0 group-hover:scale-150 transition-transform duration-500"></span>
                        <span className="relative z-10 group-hover:text-black duration-500">Sign up</span>
                    </button>
                </Link>
            </div>
           )
        }
        </>
    );
};

export default AccessButton;