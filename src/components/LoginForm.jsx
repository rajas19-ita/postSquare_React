import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FadeLoader } from "react-spinners";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { email, password };
    setEmail("");
    setPassword("");
    await login(userInfo);
  };

  return (
    <div className="flex flex-col h-full pb-16 md:pb-0 md:pl-20 w-full items-center justify-center">
      <div className="h-[28rem] w-[19rem] bg-[#34495e] text-[#e6e6e6] rounded-md">
        <div className="flex flex-col gap-2 p-5">
          <div className="flex items-center justify-center  mt-4 mb-8">
            <h1 className="text-3xl font-medium">postSquare</h1>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              {isLoading ? (
                <FadeLoader color="#8f8f8f" speedMultiplier={2} />
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
          {error ? (
            <span className="ml-1 mt-1 italic">
              <p className="text-red-400">{error}</p>
            </span>
          ) : null}
          <span className="flex gap-2 ml-1 mt-2">
            <p>Don't have an account?</p>
            <p className="text-blue-400 font-medium">
              <Link to="/signup">Sign Up</Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
