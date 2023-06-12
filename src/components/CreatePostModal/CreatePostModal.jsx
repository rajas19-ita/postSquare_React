import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext.jsx";
import SelectPage from "./SelectPage";
import ImageEditPage from "./ImageEditPage";
import PostEditPage from "./PostEditPage";
import PostStatusPage from "./PostStatusPage";
import { dataURLtoFile } from "../../utils/dataURLtoFile";

function CreatePostModal({ isOpen, handleClose }) {
  const [page, setPage] = useState("SELECT");
  const [img, setImg] = useState(null);
  const [croppedImg, setCroppedImg] = useState(null);
  const [caption, setCaption] = useState("");
  const [aspect, setAspect] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const { user } = useContext(AuthContext);

  const onClose = () => {
    setPage("SELECT");
    setImg(null);
    setCroppedImg(null);
    setAspect(1);
    setCaption("");
    setPostError(null);
    handleClose();
  };

  const createPost = async () => {
    if (caption.trim().length === 0) {
      setCaption("");
      return toast.info("Oops! You forgot to write a caption.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setPage("POST_STATUS");
    setIsPosting(true);
    const file = dataURLtoFile(croppedImg, "postImage");
    const data = new FormData();
    data.set("caption", caption);
    data.set("postImage", file);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: data,
    });

    const json = await response.json();

    if (response.ok) {
      setIsPosting(false);
    } else {
      setPostError(json.err);
      setIsPosting(false);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "SELECT":
        return <SelectPage setPage={setPage} setImg={setImg} />;
      case "IMAGE_EDIT":
        return (
          <ImageEditPage
            img={img}
            setCroppedImg={setCroppedImg}
            setImg={setImg}
            setAspect={setAspect}
            aspect={aspect}
            setPage={setPage}
            setLoading={setLoading}
          />
        );
      case "POST_EDIT":
        return (
          <PostEditPage
            aspect={aspect}
            croppedImg={croppedImg}
            setPage={setPage}
            setCroppedImg={setCroppedImg}
            setAspect={setAspect}
            loading={loading}
            caption={caption}
            setCaption={setCaption}
            createPost={createPost}
          />
        );
      case "POST_STATUS":
        return <PostStatusPage isPosting={isPosting} postError={postError} />;
      default:
        return <SelectPage setPage={setPage} setImg={setImg} />;
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed w-screen h-screen inset-0 bg-gray-950 bg-opacity-70 z-40">
        <button className="fixed right-0 m-2" onClick={onClose}>
          <FaTimes size={30} className="text-[#e6e6e6]" />
        </button>
      </div>
      {renderPage()}
    </>,
    document.getElementById("portal")
  );
}

export default CreatePostModal;
