import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { FadeLoader } from "react-spinners";

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
        <div className="flex  h-full  w-full items-center justify-center">
            <div
                className=" h-[30rem] w-[19rem] bg-[#34495e] 
                text-[#e6e6e6] rounded-md  p-5 text-[0.875rem]"
            >
                <h1
                    className="flex justify-center mt-4 mb-10 text-3xl
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

                    <button
                        className="rounded-md bg-sidebar self-stretch py-3 uppercase 
                            font-medium active:scale-95  h-11 
                             hover:bg-[#1f2a36] active:bg-[#1f2a36] 
                            active:text-[#b8b8b8]  transition-all ease-out tracking-wide"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <FadeLoader
                                color="#8f8f8f"
                                height={7}
                                margin={-9}
                                radius={8}
                                width={3}
                                speedMultiplier={2}
                                cssOverride={{
                                    margin: "auto",
                                    top: "1rem",
                                    left: "1rem",
                                }}
                            />
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
                {error ? (
                    <p className="text-red-400 ml-1 mt-3 italic  tracking-wide">
                        {error}
                    </p>
                ) : null}
                <span className="flex gap-2 ml-1 mt-4 ">
                    <p>Already have an account?</p>
                    <p className="text-blue-400 font-medium tracking-wide">
                        <Link to="/">Login</Link>
                    </p>
                </span>
            </div>
        </div>
    );
}

export default SignUpForm;
