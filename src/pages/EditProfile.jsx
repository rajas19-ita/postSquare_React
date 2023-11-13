import React, { useContext, useEffect } from "react";
import defaultPic from "../assets/avatar-1.jpg";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import SetAvatarModal from "../components/SetAvatarModal";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

function EditProfile() {
    const { user, dispatch } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [bio, setBio] = useState(user.bio);

    useEffect(() => {
        if (user.avatarUrl) {
            setAvatar(user.avatarUrl);
        } else {
            setAvatar(defaultPic);
        }
    }, []);

    const handleFile = (e) => {
        if (e.target.files[0].size > 2097152) {
            toast.info("Image should be less than 2MB!", {
                position: toast.POSITION.TOP_CENTER,
            });
            e.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
            setIsOpen(true);
            setAvatar(reader.result);
            e.target.value = "";
        });
    };
    const handleChange = (e) => {
        let value = e.target.value;
        if (value.length <= 150) {
            setBio(value);
        }
    };

    const handleSubmit = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/me/bio`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bio }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            localStorage.setItem(
                "user",
                JSON.stringify({ ...user, bio: json.bio })
            );
            dispatch({ type: "UPDATE_USER" });
            toast.success("bio updated Successfully!", {
                position: toast.POSITION.TOP_CENTER,
            });
        } else {
            toast.error("Failed to update bio!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <div className="h-full pb-16 md:pb-0 md:pl-20 pt-8 text-[#e6e6e6]">
            <div className="flex justify-center border-b-[1px] border-b-slate-600 pb-7 mx-10">
                <div className="h-32 w-32 rounded-full md:mr-8 relative border-[1px] border-slate-600 ">
                    {isProcessing ? (
                        <FadeLoader
                            color="#8f8f8f"
                            speedMultiplier={2}
                            className="ml-10 mt-8"
                        />
                    ) : null}
                    <img
                        src={avatar}
                        alt="avatar"
                        className={`rounded-full ${
                            isProcessing ? "hidden" : "block"
                        }`}
                        onLoad={() => setIsProcessing(false)}
                    />

                    <input
                        type="file"
                        accept=".jpg,.jpeg"
                        id="avatar-input"
                        hidden
                        onChange={handleFile}
                    />
                    <label
                        htmlFor="avatar-input"
                        aria-label="set avatar"
                        className="active:scale-95 cursor-pointer absolute bottom-0 right-1 bg-sidebar
                         p-2 rounded-md hover:bg-[#1f2a36] active:bg-[#1f2a36] 
                         active:text-[#b8b8b8]  transition-all ease-out"
                    >
                        <AiOutlineEdit size={20} />
                    </label>
                </div>
                <div className="flex flex-col gap-3 max-w-[20rem] pt-1 justify-center">
                    <h2 className="text-2xl font-semibold tracking-wide">
                        {user.username}
                    </h2>
                    <p className="text-sm leading-[1.4rem]">{bio}</p>
                </div>
                {isOpen ? (
                    <SetAvatarModal
                        handleClose={() => setIsOpen(false)}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        setIsProcessing={setIsProcessing}
                        user={user}
                    />
                ) : null}
            </div>
            <div className="flex flex-col p-8 items-center ml-4 gap-4">
                <div className="flex gap-6">
                    <label className="text-sm font-medium tracking-wide py-2">
                        Bio
                    </label>
                    <div className="flex flex-col gap-2">
                        <textarea
                            className="resize-none focus:outline-none bg-[#34495e] text-sm
                     leading-[1.4rem] px-3 py-2 focus:border-[1px] border-slate-600 w-72 h-32"
                            value={bio}
                            onChange={handleChange}
                        />
                        <span className="self-start text-sm text-[#5d6d7e]">
                            {bio.length}/150
                        </span>
                    </div>
                </div>
                <button
                    className="bg-sidebar hover:bg-[#1f2a36]  active:bg-[#1f2a36] 
                    cursor-pointer active:scale-95 py-2 px-4 rounded-md 
                    text-sm font-medium tracking-wide transition-all ease-out active:text-[#b8b8b8] disabled:opacity-20"
                    disabled={bio.trim().length === 0 ? true : false}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default EditProfile;
