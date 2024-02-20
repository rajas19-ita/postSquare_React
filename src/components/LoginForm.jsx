import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import Button from "./Button";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, error, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = { email, password };
        setEmail("");
        setPassword("");
        login(userInfo);
    };

    return (
        <div
            className="h-[28rem] w-[19rem] p-5
            bg-[#34495e]  rounded-md text-sm"
        >
            <h1 className="text-center text-3xl font-bold italic tracking-wide mt-4 mb-10">
                postSquare
            </h1>

            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email focus:outline-none p-2 bg-[#34495e] 
                            border-b-[1px] border-b-[#cfcfcf] placeholder:text-[#b8b8b8] "
                    placeholder="Email"
                    autoComplete="on"
                    required
                />
                <label className="sr-only" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-6 focus:outline-none p-2 bg-[#34495e]
                            border-b-[1px] border-b-[#cfcfcf] placeholder:text-[#b8b8b8] "
                    placeholder="Password"
                    required
                />

                <Button
                    className="self-stretch uppercase font-medium tracking-wide "
                    type="submit"
                    loading={isLoading}
                    primary
                >
                    Login
                </Button>
            </form>
            {error ? (
                <p className="text-red-400 ml-1 mt-3 italic tracking-wide ">
                    {error}
                </p>
            ) : null}
            <span className="flex gap-2 ml-1 mt-4 ">
                <p>Don't have an account?</p>
                <p className="text-blue-400 font-medium tracking-wide">
                    <Link to="/signup">Sign Up</Link>
                </p>
            </span>
        </div>
    );
}

export default LoginForm;
