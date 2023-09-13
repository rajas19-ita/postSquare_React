import ReactDOM from "react-dom";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { useContext, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataURLtoFile";
import { toast } from "react-toastify";
import defaultPic from "../assets/avatar-1.jpg";
import AuthContext from "../context/AuthContext";

function SetAvatarModal({
    handleClose,
    avatar,
    setAvatar,
    setIsProcessing,
    user,
}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const { dispatch } = useContext(AuthContext);

    const updateAvatar = async (file) => {
        const data = new FormData();

        data.append("avatar", file);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/me/avatar`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: data,
            }
        );

        const json = await response.json();
        if (response.ok) {
            localStorage.setItem(
                "user",
                JSON.stringify({ ...user, avatarUrl: json.avatarUrl })
            );
            setAvatar(json.avatarUrl);
            dispatch({ type: "UPDATE_USER" });
        } else {
            toast.error("Failed to update Avatar!", {
                position: toast.POSITION.TOP_CENTER,
            });
            if (!user.avatarUrl) {
                setAvatar(defaultPic);
            } else {
                setAvatar(user.avatarUrl);
            }
        }
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onCrop = async () => {
        setIsProcessing(true);
        handleClose();
        const croppedImg = await getCroppedImg(avatar, croppedAreaPixels);

        const file = dataURLtoFile(croppedImg, "avatar");

        await updateAvatar(file);
    };

    const onClose = () => {
        if (!user.avatarUrl) {
            setAvatar(defaultPic);
        } else {
            setAvatar(user.avatarUrl);
        }
        handleClose();
    };

    return ReactDOM.createPortal(
        <>
            <div className="fixed w-screen h-screen inset-0 bg-gray-950 bg-opacity-70 z-40"></div>
            <div
                className="fixed inset-0 flex flex-col gap-4 items-center mx-auto 
      mt-4 px-4 py-3 w-72 xl:w-1/4 aspect-[4/5] bg-[#34495e] text-[#e6e6e6] z-50 rounded-md"
            >
                <button
                    className="self-end rounded-md bg-sidebar p-2 hover:bg-[#1f2a36] active:bg-[#1f2a36] 
                     active:text-[#b8b8b8] active:scale-95 transition-all ease-out"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                <div className="relative w-full h-3/4 bg-white">
                    <Cropper
                        image={avatar}
                        crop={crop}
                        zoom={zoom}
                        maxZoom={3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        cropShape="round"
                        cropSize={{ width: 130, height: 130 }}
                        showGrid={false}
                        onZoomChange={setZoom}
                    />
                </div>
                <button
                    className="active:scale-95 px-3 py-1.5 text-sm self-center 
                    font-medium bg-sidebar rounded-md hover:bg-[#1f2a36] active:bg-[#1f2a36] 
                    active:text-[#b8b8b8]  transition-all ease-out"
                    onClick={onCrop}
                >
                    Set Avatar
                </button>
            </div>
        </>,
        document.getElementById("portal")
    );
}
export default SetAvatarModal;
