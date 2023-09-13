import React from "react";
import useLogout from "../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router-dom";

function HamMenu({ setIsOpen, checkRef }) {
    const { logout } = useLogout();
    useClickOutside(() => {
        setIsOpen(false);
    }, checkRef);

    return (
        <div
            className={`absolute flex flex-col items-stretch w-36 p-2 rounded-md 
                top-[115%] md:top-auto md:left-0 md:bottom-[115%] bg-[#34495e] md:bg-[#2f4255] shadow-sm
                `}
            id="hammenu"
        >
            <ul>
                <li>
                    <Link
                        to="/editProfile"
                        className="p-3 rounded-md flex gap-2 items-center hover:bg-[#2a3a4b] 
                            active:text-[#b8b8b8] transition-all ease-out"
                    >
                        <FiEdit2 size={14} />
                        <span className="text-[0.875rem]">Edit Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        className="p-3 rounded-md flex gap-2 items-center hover:bg-[#2a3a4b]
                            active:text-[#b8b8b8] transition-all"
                        onClick={logout}
                    >
                        <BiLogOut size={16} />
                        <span className="text-[0.875rem]">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default HamMenu;
