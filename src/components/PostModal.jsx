import ReactDom from "react-dom";
import { FaTimes } from "react-icons/fa";
import defaultPic from "../assets/avatar-1.jpg";
import { AiOutlineSend } from "react-icons/ai";
import { useContext, useState } from "react";
import CommentList from "./CommentList";
import EmojiPicker from "./EmojiPicker";
import Comment from "./Comment";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

function PostModal({
  isOpen,
  img,
  ratio,
  author,
  avatar,
  caption,
  createdAt,
  handleClose,
  postId,
}) {
  const [comment, setComment] = useState("");
  const [commentArr, setCommentArr] = useState([]);
  const { user } = useContext(AuthContext);

  const addComment = async () => {
    if (comment) {
      if (comment.trim().length === 0) {
        setComment("");
        return toast.info("Oops! You forgot to write a comment.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      const latest = {
        author: user.username,
        comment,
        avatar: user.avatarUrl ? user.avatarUrl : defaultPic,
        createdAt: new Date(),
      };
      setComment("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (response.ok) {
        setCommentArr((commentArr) => [latest, ...commentArr]);
      }
    }
  };

  const onClose = () => {
    setComment("");
    setCommentArr([]);
    handleClose();
  };

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed w-screen h-screen inset-0 bg-gray-950 bg-opacity-70 z-40">
        <button className="fixed right-0 m-2" onClick={onClose}>
          <FaTimes size={30} className="text-[#e6e6e6]" />
        </button>
      </div>

      <div
        className={`fixed flex aspect-[4/6] w-80 ${
          ratio === 0.8
            ? "sm:aspect-[3/2] sm:w-[38rem] md:w-[42rem] lg:w-[47rem] xl:w-3/5 "
            : "sm:aspect-[5/3] sm:w-[38rem] md:w-[45rem] lg:w-[50rem] xl:w-2/3 xl:aspect-[11/6]"
        }
                            text-[#e6e6e6] bg-[#34495e] z-50 top-1/2 left-1/2 
                            -translate-x-1/2 -translate-y-1/2 rounded-md
                            
                            `}
      >
        <div
          className={`${
            ratio === 0.8
              ? "sm:aspect-[13/20] md:aspect-[7/10] xl:aspect-[4/5] "
              : "sm:aspect-[385/512] md:aspect-[13/16] xl:aspect-square "
          } bg-black hidden sm:block rounded-l-md h-full                    
                    `}
        >
          <img src={img} className="h-full object-contain rounded-l-md" />
        </div>

        <div className="flex flex-col flex-grow rounded-r-md">
          <div className="flex items-center px-5 py-3.5 border-b-[1px] border-b-slate-600 rounded-tr-md">
            <img
              src={avatar ? avatar : defaultPic}
              alt="avatar"
              className="rounded-full w-9 h-9 mr-4"
            />

            <h2 className="text-base font-medium tracking-wide">{author}</h2>
          </div>
          <div className="flex-grow container flex flex-col">
            <Comment
              author={author}
              comment={caption}
              avatar={avatar ? avatar : defaultPic}
              createdAt={createdAt}
            />
            {commentArr.map((comment, index) => (
              <Comment
                key={index}
                author={comment.author}
                comment={comment.comment}
                avatar={comment.avatar}
                createdAt={comment.createdAt}
              />
            ))}
            <CommentList postId={postId} user={user} />
          </div>
          <div className="border-t-[1px] flex items-center border-t-slate-600 py-2">
            <div className="ml-4 mr-4">
              <EmojiPicker handleText={setComment} position="top" />
            </div>
            <textarea
              className="text-base w-full  bg-[#34495e] focus:outline-none resize-none"
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button className="mr-2 ml-3 active:scale-95" onClick={addComment}>
              <AiOutlineSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
export default PostModal;
