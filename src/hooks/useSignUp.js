import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";

const useSignUp = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (user_info) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_info),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
      console.log(json);
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

  return { isLoading, error, signUp };
};

export default useSignUp;
