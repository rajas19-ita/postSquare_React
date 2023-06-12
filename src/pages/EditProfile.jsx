import React, { useContext, useEffect } from "react";
import defaultPic from "../assets/avatar-1.jpg";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import SetAvatarModal from "../components/SetAvatarModal";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

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
      setOpen(true);
      setAvatar(reader.result);
      e.target.value = "";
    });
  };
  return (
    <div className="h-full pb-16 md:pb-0 md:pl-20 pt-8 text-[#e6e6e6]">
      <div className="flex justify-center ">
        <div className="w-32 h-32 rounded-full md:mr-20 relative border-[1px] border-slate-600">
          {isProcessing ? (
            <FadeLoader
              size={3}
              color="#8f8f8f"
              speedMultiplier={2}
              className="ml-10 mt-8"
            />
          ) : null}
          <img
            src={avatar}
            alt="avatar"
            className={`rounded-full w-full h-full ${
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
            className="active:scale-95 cursor-pointer absolute bottom-0 right-1 bg-[#34495e] p-2 rounded-md"
          >
            <AiOutlineEdit size={20} />
          </label>
        </div>
        <SetAvatarModal
          open={open}
          handleClose={() => setOpen(false)}
          avatar={avatar}
          setAvatar={setAvatar}
          setIsProcessing={setIsProcessing}
          user={user}
        />
      </div>
    </div>
  );
}

export default EditProfile;
