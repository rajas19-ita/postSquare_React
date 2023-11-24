import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function EntryLayout() {
    const { user } = useAuth();

    return (
        <div className="w-full h-screen mx-auto bg-main lg:max-w-screen-lg text-[#e6e6e6] ">
            {user ? <Navigate to={"/"} replace /> : <Outlet />}
        </div>
    );
}

export default EntryLayout;
