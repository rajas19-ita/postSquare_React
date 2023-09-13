import logo from "../assets/logo.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoHome, GoHomeFill, GoPerson, GoPersonFill } from "react-icons/go";
import { TbMenu2 } from "react-icons/tb";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import { useContext, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CreatePostModal from "./CreatePostModal/CreatePostModal";
import HamMenu from "./HamMenu";
import AuthContext from "../context/AuthContext";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expMenu, setExpMenu] = useState(false);
    const menuRef = useRef();
    const { user } = useContext(AuthContext);
    const location = useLocation();

    return (
        <div
            className="fixed bottom-0 w-full h-16 bg-sidebar 
    flex md:flex-col p-4 md:h-full md:w-20 z-10 items-center md:gap-[4.5rem]"
        >
            <Link to="/" className="hidden md:block mt-2 ">
                <img src={logo} alt="postSquare logo" />
            </Link>

            <nav className="flex md:flex-col flex-grow">
                <ul className="flex flex-grow justify-around md:justify-start md:flex-col md:gap-5 ">
                    <li>
                        <Link
                            to="/"
                            className="p-[0.5rem] block rounded-[0.3rem] active:scale-90 active:text-[#b8b8b8] 
            transition-all ease-out hover:bg-[#2f4255]"
                            aria-label="Home"
                        >
                            {location.pathname === "/" && !isOpen ? (
                                <GoHomeFill size={27} />
                            ) : (
                                <GoHome size={27} />
                            )}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/editProfile"
                            className="active:scale-90 active:text-[#b8b8b8] transition-all ease-out
          p-[0.5rem] rounded-[0.3rem] hover:bg-[#2f4255] block"
                            aria-label="Profile"
                        >
                            {location.pathname === "/editProfile" && !isOpen ? (
                                <GoPersonFill size={27} />
                            ) : (
                                <GoPerson size={27} />
                            )}
                        </Link>
                    </li>
                    <li>
                        <button
                            className={`active:scale-90 active:text-[#b8b8b8] block transition-all ease-out
              p-[0.5rem] rounded-[0.3rem] hover:bg-[#2f4255] `}
                            onClick={() => setIsOpen(true)}
                            disabled={user ? false : true}
                            aria-label="Create Post"
                        >
                            {isOpen ? (
                                <BsPlusSquareFill size={27} />
                            ) : (
                                <BsPlusSquare size={27} />
                            )}
                        </button>
                    </li>
                    <li>
                        <Link
                            to="/notification"
                            className="active:scale-90 active:text-[#b8b8b8] transition-all ease-out
                                   p-[0.5rem] rounded-[0.3rem] hover:bg-[#2f4255] block"
                            aria-label="View Notifications"
                        >
                            {location.pathname === "/notification" &&
                            !isOpen ? (
                                <AiFillHeart size={27} />
                            ) : (
                                <AiOutlineHeart size={27} />
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/message"
                            className="active:scale-90 active:text-[#b8b8b8] transition-all ease-out
                            p-[0.5rem] rounded-[0.3rem] hover:bg-[#2f4255] block"
                            aria-label="View Messages"
                        >
                            {location.pathname === "/message" && !isOpen ? (
                                <RiMessengerFill size={27} />
                            ) : (
                                <RiMessengerLine size={27} />
                            )}
                        </Link>
                    </li>
                </ul>

                <div
                    className="fixed top-3 md:relative md:block "
                    ref={menuRef}
                >
                    <button
                        className={`active:scale-90 active:text-[#b8b8b8] block md:mb-3 transition-all ease-out
                                p-[0.4rem] rounded-[0.3rem] hover:bg-[#34495e] md:hover:bg-[#2f4255]`}
                        onClick={() => setExpMenu(!expMenu)}
                        aria-label="Open Menu"
                        aria-expanded={expMenu}
                        aria-controls="hammenu"
                    >
                        <TbMenu2 size={30} />
                    </button>
                    {expMenu ? (
                        <HamMenu setIsOpen={setExpMenu} checkRef={menuRef} />
                    ) : null}
                </div>
            </nav>
            {isOpen ? (
                <CreatePostModal handleClose={() => setIsOpen(false)} />
            ) : null}
        </div>
    );
}
export default Sidebar;
