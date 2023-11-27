import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AppLayout() {
    const { user } = useAuth();

    return (
        <div className="w-full h-screen mx-auto bg-main lg:max-w-screen-lg text-[#e6e6e6] ">
            <Sidebar />
            <div className="h-full pb-16 md:pb-0 md:pl-20 text-[#e6e6e6] w-full ">
                {user ? <Outlet /> : <Navigate to={"/login"} replace />}
            </div>
        </div>
    );
}

export default AppLayout;
