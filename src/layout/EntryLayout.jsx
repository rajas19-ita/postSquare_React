import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function EntryLayout() {
    const { user } = useAuth();

    return (
        <div className="w-full h-screen  bg-main mx-auto text-[#e6e6e6] lg:max-w-screen-lg">
            <div className="flex flex-col h-full justify-center items-center">
                {user ? <Navigate to={"/"} replace /> : <Outlet />}
            </div>
        </div>
    );
}

export default EntryLayout;
