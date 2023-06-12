import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

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
    await signUp(user_info);
  };

  return (
    <div className="flex flex-col h-full pb-16 md:pb-0 md:pl-20 w-full items-center justify-center">
      <div className="h-[34rem] w-[19rem] bg-[#34495e] text-[#e6e6e6] rounded-md">
        <div className="flex flex-col gap-2 p-5">
          <div className="flex items-center justify-center  mt-4 mb-8">
            <h1 className="text-3xl font-medium">postSquare</h1>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="uname" className="font-medium">
                Username
              </label>
              <input
                type="text"
                id="uname"
                name="uname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-black rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" focus:outline-none text-black rounded-md p-2 "
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className=" focus:outline-none text-black rounded-md p-2"
                required
              />
            </div>

            <button
              className="rounded-md bg-[#273544] self-stretch py-3 uppercase font-medium 
          text-sm active:scale-95"
              type="submit"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </form>
          {error ? (
            <span className="ml-1 mt-1 italic">
              <p className="text-red-400">{error}</p>
            </span>
          ) : null}
          <span className="flex gap-2 ml-1 mt-2">
            <p>Already have an account?</p>
            <p className="text-blue-400 font-medium">
              <Link to="/">Login</Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
