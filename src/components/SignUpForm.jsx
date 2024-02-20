import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import Button from "./Button";

function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, error, signUp } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_info = { username, email, password };
        setUsername("");
        setPassword("");
        setEmail("");
        signUp(user_info);
    };

    return (
        <div
            className=" h-[30rem] w-[19rem] bg-[#34495e] 
                 rounded-md  p-5 text-sm"
        >
            <h1
                className=" text-center mt-4 mb-10 text-3xl
                     font-bold italic tracking-wide"
            >
                postSquare
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="uname">
                    Username
                </label>
                <input
                    type="text"
                    id="uname"
                    name="uname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="focus:outline-none p-2 bg-[#34495e] 
                            border-b-[1px] border-b-[#cfcfcf] placeholder:text-[#b8b8b8] "
                    placeholder="Username"
                    autoComplete="on"
                />

                <label className="sr-only" htmlFor="signup-email">
                    Email
                </label>
                <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:outline-none p-2 bg-[#34495e] 
                            border-b-[1px] border-b-[#cfcfcf] placeholder:text-[#b8b8b8] "
                    placeholder="Email"
                    autoComplete="on"
                    required
                />

                <label className="sr-only" htmlFor="signup-password">
                    Password
                </label>
                <input
                    type="password"
                    id="signup-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    className="focus:outline-none mb-6 p-2 bg-[#34495e] 
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
                    Sign Up
                </Button>
            </form>
            {error ? (
                <p className="text-red-400 ml-1 mt-3 italic tracking-wide">
                    {error}
                </p>
            ) : null}
            <span className="flex gap-2 ml-1 mt-4 ">
                <p>Already have an account?</p>
                <p className="text-blue-400 font-medium tracking-wide">
                    <Link to="/login">Login</Link>
                </p>
            </span>
        </div>
    );
}

export default SignUpForm;
