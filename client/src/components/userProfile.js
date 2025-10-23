import { useAuth0 } from '@auth0/auth0-react';

function UserProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <>Loading!</>
    }

    return (
        isAuthenticated && (
            <>
                <img src={user.picture} alt="Profile image not loaded"/>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </>
        )
    );
}

export default UserProfile;