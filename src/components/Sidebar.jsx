import logo from "../assets/logo.png";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlusSquare,
  AiOutlineMenu,
} from "react-icons/ai";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal/CreatePostModal";
import useLogout from "../hooks/useLogout";
import AuthContext from "../context/AuthContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expMenu, setExpMenu] = useState(false);
  const { logout } = useLogout();
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed bottom-0 w-full h-16 bg-[#273544] text-[#e6e6e6] md:flex md:flex-col md:justify-between p-4 md:h-full md:w-20">
      <div className="hidden md:block mt-2">
        <img src={logo} alt="postSquare" />
      </div>

      <ul className="grid grid-cols-3 w-3/4 justify-items-center mx-auto md:grid-cols-1 md:w-full md:h-1/2  md:items-center">
        <li className="active:scale-95">
          <Link to="/">
            <AiOutlineHome size={27} />
          </Link>
        </li>
        <li className="active:scale-95">
          <Link to="/editProfile">
            <AiOutlineUser size={27} />
          </Link>
        </li>
        <li>
          <button
            className="active:scale-95"
            onClick={() => setIsOpen(true)}
            disabled={user ? false : true}
          >
            <AiOutlinePlusSquare size={27} />
          </button>
        </li>
      </ul>

      <div className="fixed top-3 left-0  ml-2 mb-3 md:relative">
        <button
          className="active:scale-95"
          onClick={() => setExpMenu(!expMenu)}
        >
          <AiOutlineMenu size={30} />
        </button>
        <div
          className={`absolute flex flex-col items-stretch w-36 p-2 rounded-md top-0 md:top-auto md:bottom-full left-full text-[#e6e6e6] bg-[#34495e] ${
            expMenu ? "block" : "hidden"
          }`}
        >
          <Link
            to="/editProfile"
            className="p-3 hover:bg-blue-400 rounded-md active:scale-95"
          >
            Edit Profile
          </Link>
          <Link
            to="/"
            className="p-3 rounded-md hover:bg-blue-400 active:scale-95"
            onClick={logout}
          >
            Logout
          </Link>
        </div>
      </div>
      <CreatePostModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </div>
  );
}
export default Sidebar;
