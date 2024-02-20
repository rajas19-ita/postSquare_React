import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useContext(AuthContext);

    const login = async (userInfo) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            }
        );

        const json = await response.json();

        if (!response.ok) {
            setError(json.err);
        } else {
            localStorage.setItem(
                "user",
                JSON.stringify({ ...json.user, token: json.token })
            );

            dispatch({
                type: "LOGIN",
                payload: { ...json.user, token: json.token },
            });
        }
        setIsLoading(false);
    };
    return { isLoading, error, login };
};

export default useLogin;
