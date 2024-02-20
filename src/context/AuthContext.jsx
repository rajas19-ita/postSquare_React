import { createContext, useReducer, useEffect, useState } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        case "UPDATE_USER":
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    const decodedJWT = JSON.parse(
                        atob(user.token.split(".")[1])
                    );

                    if (decodedJWT.exp * 1000 < Date.now()) {
                        localStorage.removeItem("user");
                        return { user: null };
                    }
                    return { user };
                } else {
                    return { user: null };
                }
            } catch (err) {
                localStorage.removeItem("user");
                return { user: null };
            }
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                const decodedJWT = JSON.parse(atob(user.token.split(".")[1]));

                if (decodedJWT.exp * 1000 < Date.now()) {
                    localStorage.removeItem("user");
                    return;
                }

                dispatch({ type: "LOGIN", payload: user });
            }
        } catch (err) {
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isNew, setIsNew }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
