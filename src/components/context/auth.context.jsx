import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext(
    {
        email: "",
        phone: "",
        fullName: "",
        avatar: "",
        role: "",
        id: "",
    }
);
export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        avatar: "",
        role: "",
        id: "",
    });
    const [isAppLoading, setIsAppLoading] = useState(false);
    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )

}

