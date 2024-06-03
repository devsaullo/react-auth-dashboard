import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthCtx = createContext({})

export const useAuthUser = () => {
    return useContext(AuthCtx);
}

export const AuthUserCtxProvider = ({children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])

    const values = {
        user, loading
    }

    return (
        <AuthCtx.Provider value={values}>
            {children}
        </AuthCtx.Provider>
    )

}