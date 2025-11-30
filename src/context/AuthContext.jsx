import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient'; // adjust path

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    //sign up
    const signUpNewUser = async ({ email, firstName, lastName, password }) => {
        const { error, data } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        if (error) {
            console.error("Error signing up: ", error);
            return { success: false, error };
        }
        return { success: true, data };
    };

    //sign in
    const signInUser = async ({ email, password }) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            //remove data before deployment, don't want it displaying
            if (error) {
                console.error("Sign in error has occured: ", error);
                return {success: false, error: error.message};
            }
            console.log("Sign in has been successful: ", data);
            return {success: true, data}
        } catch (error) {
            console.error("An error has occured signing in: ", error)
            return {
                success: false,
                error: "An unexpected error occurred. Please try again.",
            };
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription?.unsubscribe();
    }, []);

    //Signout
    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    };
    
    //page
    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    return useContext(AuthContext);
};