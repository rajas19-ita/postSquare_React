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

function CreatePostModal({ handleClose }) {
    const [page, setPage] = useState("SELECT");
    const [img, setImg] = useState(null);
    const [croppedImg, setCroppedImg] = useState(null);
    const [caption, setCaption] = useState("");
    const [aspect, setAspect] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [postError, setPostError] = useState(null);
    const { user } = useContext(AuthContext);

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
        data.set("aspect", aspect);

        const response = await fetch(`${process.env.VITE_API_URL}/api/posts`, {
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
                        handleBack={() => {
                            setAspect(1);
                            setCroppedImg(null);
                            setPage("IMAGE_EDIT");
                        }}
                        loading={loading}
                        caption={caption}
                        setCaption={setCaption}
                        createPost={createPost}
                    />
                );
            case "POST_STATUS":
                return (
                    <PostStatusPage
                        isPosting={isPosting}
                        postError={postError}
                    />
                );
            default:
                return <SelectPage setPage={setPage} setImg={setImg} />;
        }
    };

    return ReactDOM.createPortal(
        <>
            <div className="fixed flex justify-center inset-0 bg-gray-950 bg-opacity-70 z-40 text-[#e6e6e6]">
                <button
                    className="fixed right-0 m-2 active:text-[#b8b8b8]"
                    onClick={handleClose}
                >
                    <FaTimes size={30} />
                </button>
                {renderPage()}
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default CreatePostModal;
