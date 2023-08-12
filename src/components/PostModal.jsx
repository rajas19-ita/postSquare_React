import ReactDom from "react-dom";
import { FaTimes } from "react-icons/fa";
import defaultPic from "../assets/avatar-1.jpg";

import CommentList from "./CommentList";
import EmojiPicker from "./EmojiPicker";
import Comment from "./Comment";
import { useRef } from "react";

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
    comment,
    setComment,
    handleInput,
    postComment,
    user,
    commentArr,
    setCommentArr,
}) {
    const textAreaRef = useRef(null);
    const cursor = useRef(0);
    const onClose = () => {
        setComment("");
        setCommentArr([]);
        handleClose();
    };

    if (!isOpen) return null;

    return ReactDom.createPortal(
        <>
            <div className="fixed w-screen h-screen inset-0 bg-gray-950 bg-opacity-70 z-40 flex justify-center">
                <button className="fixed right-0 m-2" onClick={onClose}>
                    <FaTimes size={30} className="text-[#e6e6e6]" />
                </button>
                <div
                    className={`flex self-center  w-full max-w-xs aspect-[4/6] mx-10 sm:max-w-[53rem] ${
                        ratio === 0.8
                            ? " sm:aspect-[3/2.1] md:aspect-[3.2/2] "
                            : " sm:aspect-[3/2] md:aspect-[3/1.8] "
                    }
                            text-[#e6e6e6] bg-[#34495e] rounded-sm
                            
                            `}
                >
                    <div
                        className={`${
                            ratio === 0.8
                                ? "sm:aspect-[2.8/5] md:aspect-[3.8/5]  lg:aspect-[4/5] "
                                : "sm:aspect-[2.5/4] md:aspect-[3.1/4] lg:aspect-[13/16]  "
                        }  bg-[#0a0f13] hidden sm:block h-full rounded-l-sm                   
                    `}
                    >
                        <img
                            src={img}
                            className="h-full object-contain rounded-l-sm"
                        />
                    </div>

                    <div className="flex flex-col flex-grow rounded-r-md">
                        <div className="flex items-center px-5 py-3.5 border-b-[1px] border-b-slate-600 rounded-tr-md">
                            <img
                                src={avatar ? avatar : defaultPic}
                                alt="avatar"
                                className="rounded-full w-9 h-9 mr-3.5"
                            />

                            <h2 className="text-[0.875rem] font-medium tracking-wide">
                                {author}
                            </h2>
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
                        <div className="border-t-[1px] flex items-center border-t-slate-600 py-5">
                            <div className="mx-4">
                                <EmojiPicker
                                    handleText={setComment}
                                    position="top"
                                    cursor={cursor}
                                    cb={() => {
                                        textAreaRef.current.style.height =
                                            "auto";
                                        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
                                    }}
                                    text={comment}
                                />
                            </div>
                            <textarea
                                className={`max-h-[5.125rem] flex-grow container bg-[#34495e] focus:outline-none 
      resize-none text-[0.875rem] font-light leading-[1.4rem] `}
                                placeholder="Add a comment..."
                                onChange={(e) => {
                                    handleInput(e, cursor);
                                }}
                                onClick={(e) => {
                                    cursor.current = e.target.selectionStart;
                                }}
                                value={comment}
                                rows={1}
                                ref={textAreaRef}
                            />
                            <button
                                className={`text-[0.875rem] font-medium tracking-wide px-4 text-blue-400 
                 enabled:active:text-gray-400 active:scale-95 transition-all ease-out  
                disabled:opacity-20 opacity-100
                `}
                                onClick={postComment}
                                disabled={
                                    comment.trim().length === 0 ? true : false
                                }
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}
export default PostModal;
