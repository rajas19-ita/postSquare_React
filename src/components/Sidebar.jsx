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
import NotificationDrawer from "./NotificationDrawer";
import MessageDrawer from "./MessageDrawer";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [msgOpen, setMsgOpen] = useState(false);
    const [expMenu, setExpMenu] = useState(false);
    const menuRef = useRef();
    const { user } = useContext(AuthContext);
    const location = useLocation();

    return (
        <div
            className="fixed bottom-0 w-full h-16 bg-sidebar 
    flex md:flex-col  md:h-full md:w-20 z-30 items-center md:gap-[4.5rem]  "
        >
            <Link to="/" className="hidden md:block mt-7 w-12 h-12">
                <img src={logo} alt="postSquare logo" />
            </Link>

            <nav className="flex md:flex-col flex-grow">
                <ul className="flex flex-grow justify-around md:justify-start md:flex-col md:gap-4 ">
                    <li>
                        <Link
                            to="/"
                            className="p-[0.5rem] block rounded-[0.3rem] active:scale-90 active:text-[#b8b8b8] 
            transition-all ease-out hover:bg-[#2f4255]"
                            aria-label="Home"
                            onClick={() => {
                                setNotiOpen(false);
                                setMsgOpen(false);
                            }}
                        >
                            {location.pathname === "/" &&
                            !isOpen &&
                            !notiOpen &&
                            !msgOpen ? (
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
                            onClick={() => {
                                setNotiOpen(false);
                                setMsgOpen(false);
                            }}
                        >
                            {location.pathname === "/editProfile" &&
                            !isOpen &&
                            !notiOpen &&
                            !msgOpen ? (
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
                        <button
                            className="active:scale-90 active:text-[#b8b8b8] transition-all ease-out
                                   p-[0.5rem] rounded-[0.3rem] hover:bg-[#2f4255] block"
                            disabled={user ? false : true}
                            onClick={() => {
                                setNotiOpen(!notiOpen);
                                setMsgOpen(false);
                            }}
                            aria-label="View Notifications"
                        >
                            {notiOpen && !isOpen ? (
                                <AiFillHeart size={27} />
                            ) : (
                                <AiOutlineHeart size={27} />
                            )}
                        </button>
                    </li>
                    <li>
                        <button
                            className="active:scale-90 active:text-[#b8b8b8] transition-all ease-out
                            p-[0.5rem] rounded-[0.3rem] hover:bg-[#2f4255] block"
                            disabled={user ? false : true}
                            aria-label="View Messages"
                            onClick={() => {
                                setNotiOpen(false);
                                setMsgOpen(!msgOpen);
                            }}
                        >
                            {msgOpen && !isOpen && !notiOpen ? (
                                <RiMessengerFill size={27} />
                            ) : (
                                <RiMessengerLine size={27} />
                            )}
                        </button>
                    </li>
                </ul>

                <div
                    className="fixed top-3 md:relative md:block mb-4"
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
            {notiOpen ? <NotificationDrawer /> : null}
            {msgOpen ? <MessageDrawer /> : null}
        </div>
    );
}
export default Sidebar;
