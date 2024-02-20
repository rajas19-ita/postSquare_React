import ReactDom from "react-dom";
import { FaTimes } from "react-icons/fa";
import CommentList from "./CommentList";
import EmojiPicker from "./EmojiPicker";
import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";
import defaultPic from "../assets/avatar-1.jpg";
import Avatar from "./Avatar";
import { BsEmojiSmile } from "react-icons/bs";
import useClickOutside from "../hooks/useClickOutside";

function PostModal({
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
    cursor,
    authorId,
    notiCommentId,
}) {
    const textAreaRef = useRef(null);
    const emojiSectionRef = useRef();
    const modalSectionRef = useRef();
    const buttonRef = useRef();
    const [emIsOpen, setEmIsOpen] = useState(false);
    const [notiComment, setNotiComment] = useState();

    useEffect(() => {
        if (notiCommentId) fetchComment();
    }, []);

    const onClose = () => {
        setComment("");
        setCommentArr([]);
        handleClose();
    };

    const fetchComment = async () => {
        const response = await fetch(
            `${process.env.VITE_API_URL}/api/posts/${postId}/comments/${notiCommentId}`,
            {
                headers: { authorization: `Bearer ${user.token}` },
            }
        );

        const json = await response.json();

        if (response.ok) {
            setNotiComment(json);
        }
    };

    useClickOutside(
        () => {
            setComment("");
            setCommentArr([]);
            handleClose();
        },
        modalSectionRef,
        buttonRef
    );

    return ReactDom.createPortal(
        <>
            <div className="fixed w-screen h-screen inset-0 bg-gray-950 text-[#e6e6e6] bg-opacity-70 z-40 flex justify-center">
                <button
                    className="fixed right-0 m-2 active:text-[#b8b8b8] transition-all ease-out"
                    onClick={onClose}
                    aria-label="Close Post Modal"
                    ref={buttonRef}
                >
                    <FaTimes size={30} />
                </button>
                <div
                    className={`flex self-center w-full max-w-xs aspect-[4/6] mx-10 sm:max-w-[53rem] ${
                        ratio <= 0.8
                            ? " sm:aspect-[3/2.1] md:aspect-[3.2/2] "
                            : " sm:aspect-[3/2] md:aspect-[3/1.8] "
                    }
                             bg-[#34495e] rounded-sm
                            
                            `}
                    ref={modalSectionRef}
                >
                    <div
                        className={`${
                            ratio <= 0.8
                                ? "sm:aspect-[2.8/5] md:aspect-[3.8/5]  lg:aspect-[4/5] "
                                : "sm:aspect-[2.5/4] md:aspect-[3.1/4] lg:aspect-[13/16]  "
                        }  bg-[#0a0f13] hidden sm:block h-full rounded-l-sm

                    `}
                    >
                        <img
                            src={img}
                            className="h-full w-full object-contain rounded-l-sm"
                            alt="Post Image"
                        />
                    </div>

                    <div className="flex flex-col flex-grow ">
                        <header className="flex items-center px-5 py-3.5 gap-3.5 border-b-[1px] border-b-slate-600 ">
                            <div className={`rounded-full w-9 h-9 `}>
                                <Avatar
                                    pic={avatar ? avatar : defaultPic}
                                    username={author}
                                    userId={authorId}
                                    position="bottom"
                                    color={"dark"}
                                />
                            </div>

                            <h2
                                className={`text-[0.875rem] font-medium tracking-wide`}
                            >
                                {author}
                            </h2>
                        </header>
                        <main className="flex-grow container flex flex-col px-5 py-4 gap-7">
                            <Comment
                                authorId={authorId}
                                author={author}
                                comment={caption}
                                avatar={avatar}
                                createdAt={createdAt}
                            />
                            {notiComment ? (
                                <Comment
                                    authorId={notiComment.author._id}
                                    author={notiComment.author.username}
                                    comment={notiComment.comment}
                                    avatar={notiComment.author.avatarUrl}
                                    createdAt={notiComment.createdAt}
                                    type={"noti"}
                                />
                            ) : null}
                            {commentArr.map((comment, index) => (
                                <Comment
                                    key={index}
                                    author={comment.author}
                                    comment={comment.comment}
                                    avatar={comment.avatar}
                                    createdAt={comment.createdAt}
                                />
                            ))}
                            <CommentList
                                postId={postId}
                                user={user}
                                except={notiCommentId}
                            />
                        </main>
                        <section className="border-t-[1px] flex items-center border-t-slate-600 py-5 px-5 gap-4">
                            <div
                                className="cursor-pointer relative h-5"
                                ref={emojiSectionRef}
                            >
                                <button
                                    className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] text-white"
                                    onClick={() => {
                                        setEmIsOpen(!emIsOpen);
                                    }}
                                    aria-label="Select Emoji"
                                    aria-expanded={emIsOpen}
                                    aria-controls="post-emoji-picker"
                                >
                                    <BsEmojiSmile className=" w-5 h-5" />
                                </button>
                                {emIsOpen ? (
                                    <EmojiPicker
                                        handleText={setComment}
                                        position="top"
                                        cursor={cursor}
                                        emojiSectionRef={emojiSectionRef}
                                        setEmIsOpen={setEmIsOpen}
                                        cb={() => {
                                            textAreaRef.current.style.height =
                                                "auto";
                                            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
                                        }}
                                        text={comment}
                                    />
                                ) : null}
                            </div>

                            <textarea
                                className={`max-h-[5.125rem] flex-grow container bg-[#34495e] focus:outline-none 
                                            resize-none text-[0.875rem] font-normal leading-[1.4rem] `}
                                placeholder="Add a comment..."
                                onChange={(e) => {
                                    handleInput(e);
                                }}
                                onClick={(e) => {
                                    cursor.current = e.target.selectionStart;
                                }}
                                value={comment}
                                rows={1}
                                ref={textAreaRef}
                                name="comment"
                            />
                            <button
                                className={`text-[0.875rem] font-medium tracking-wide text-blue-400 
                                        enabled:active:text-gray-400 active:scale-95 transition-all ease-out  
                                            disabled:opacity-20 opacity-100
                                `}
                                onClick={postComment}
                                disabled={
                                    comment.trim().length === 0 ? true : false
                                }
                                aria-label="Post Comment Button"
                            >
                                Post
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}
export default PostModal;
