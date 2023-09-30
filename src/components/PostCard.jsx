import React, { useEffect } from "react";
import PostModal from "../components/PostModal";
import { BsDot } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useContext } from "react";
import getTimePassed from "../utils/getTimePassed";
import AuthContext from "../context/AuthContext";
import defaultPic from "../assets/avatar-1.jpg";
import { FadeLoader } from "react-spinners";
import { useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "./EmojiPicker";

function PostCard({
    post: { caption, imageUrl, createdAt, author, _id, likes, hasLiked },
}) {
    const [liked, setLiked] = useState(hasLiked);
    const [isOpen, setIsOpen] = useState(false);
    const [emIsOpen, setEmIsOpen] = useState(false);
    const [ratio, setRatio] = useState(null);
    const [totalLikes, setTotalLikes] = useState(likes);
    const { user } = useContext(AuthContext);
    const cursor = useRef(0);
    const textAreaRef1 = useRef(null);
    const [comment, setComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [commentArrCard, setCommentArrCard] = useState([]);
    const [commentArrModal, setCommentArrModal] = useState([]);
    const [avatarLoading, setAvatarLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageLowRes, setImageLowRes] = useState(null);
    // const firstUnmount = useRef(true);
    const emojiSectionRef = useRef();

    // useEffect(() => {
    //     slash();
    // });

    // useEffect(() => {
    //     return () => {
    //         if (!firstUnmount.current) {
    //             URL.revokeObjectURL(author.avatarUrl);
    //             URL.revokeObjectURL(imageUrl);
    //         }
    //         firstUnmount.current = false;
    //     };
    // }, []);

    const handleLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        const r = naturalWidth / naturalHeight;
        setRatio(Number(r.toFixed(1)));
    };

    const handleLike = async (e) => {
        if (!liked) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${_id}/likes`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const json = await response.json();

            if (response.ok) {
                setLiked(true);
                setTotalLikes((totalLikes) => totalLikes + 1);
            }
        } else {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${_id}/likes`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response.ok) {
                setLiked(false);
                setTotalLikes((totalLikes) => totalLikes - 1);
            }
        }
    };

    const handleInput = (e) => {
        setComment(e.target.value);
        setTimeout(() => {
            cursor.current = e.target.selectionStart;
        }, 10);

        //handle textbox height with increasing comment lines
        let textBox = e.target;
        textBox.style.height = "auto";
        textBox.style.height = `${textBox.scrollHeight}px`;
    };

    const postComment = async () => {
        const latest = {
            author: user.username,
            comment,
            avatar: user.avatarUrl ? user.avatarUrl : defaultPic,
            createdAt: new Date(),
        };
        setIsPosting(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/${_id}/comments`,
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
            setCommentArrCard((commentArr) => [latest, ...commentArr]);
            if (isOpen) {
                setCommentArrModal((commentArr) => [latest, ...commentArr]);
            }
        }
        setComment("");
        setIsPosting(false);
    };

    // const slash = () => {
    //     const lastSlashIndex = imageUrl.lastIndexOf("/");
    //     const firstPart = imageUrl.slice(0, lastSlashIndex);
    //     const secondPart = imageUrl.slice(lastSlashIndex + 1);
    //     setImageLowRes(`${firstPart + "/tr:w-64,h-64/" + secondPart}`);
    // };

    return (
        <article className="w-80 sm:w-[28rem] bg-main border-b-[1px] border-b-slate-600 ">
            <header className="flex h-16 px-1 items-center ">
                {avatarLoading ? (
                    <div className="w-9 h-9 mr-3.5 rounded-full animate-pulse bg-[#2A3A4B]"></div>
                ) : null}
                <img
                    src={author.avatarUrl ? author.avatarUrl : defaultPic}
                    alt={`avatar of ${author.username}`}
                    className={`rounded-full w-9 h-9 mr-3.5 ${
                        avatarLoading ? "hidden" : "block"
                    }`}
                    onLoad={() => {
                        setAvatarLoading(false);
                    }}
                />
                <h2 className="text-[0.875rem] font-medium tracking-wide mr-1 ">
                    {author.username}
                </h2>

                <BsDot className="text-gray-400 text-sm mt-1 " />
                <span className=" text-gray-500 mt-0.5 text-[0.8125rem] tracking-wide">
                    {getTimePassed(createdAt)}
                </span>
            </header>

            <img
                src={imageUrl}
                onLoad={handleLoad}
                className={`object-contain rounded-sm w-full`}
            />

            <section className="flex h-10 mt-1 items-center justify-between">
                <div className="flex gap-4">
                    <button
                        className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] text-white"
                        onClick={handleLike}
                        aria-label="like the post"
                    >
                        {liked ? (
                            <AiFillHeart size={27} />
                        ) : (
                            <AiOutlineHeart size={27} />
                        )}
                    </button>
                    <button
                        className="transition-all ease-out active:text-[#b8b8b8] text-white"
                        onClick={() => setIsOpen(true)}
                        aria-label="view comments"
                    >
                        <TbMessageCircle2 size={27} />
                    </button>
                </div>
                <span className="font-medium text-[0.875rem] tracking-wide">
                    {totalLikes} likes
                </span>
            </section>
            <section className="mt-2 mb-3">
                <p className="break-words font-normal text-[0.875rem] leading-[1.4rem]">
                    <span className="font-medium tracking-wide">
                        {author.username}{" "}
                    </span>
                    {caption}
                </p>
            </section>

            <section>
                <button
                    className="text-[0.875rem] font-normal text-gray-400 transition-all ease-out 
                active:text-gray-500 "
                    onClick={() => setIsOpen(true)}
                >
                    View all Comments
                </button>
                {commentArrCard.map((comment, index) => (
                    <p
                        className="break-words font-normal text-[0.875rem] leading-[1.4rem]"
                        key={index}
                    >
                        <span className="font-medium tracking-wide">
                            {comment.author}{" "}
                        </span>
                        {comment.comment}
                    </p>
                ))}
            </section>

            <section className={`flex items-center pt-2 pb-4 `}>
                {isPosting ? (
                    <div className="flex-grow ">
                        <FadeLoader
                            color="#8f8f8f"
                            speedMultiplier={2}
                            height={7}
                            margin={-9}
                            radius={8}
                            width={3}
                            cssOverride={{
                                display: "block",
                                margin: "auto",
                                top: "0",
                                left: "0",
                                width: "0",
                                height: "0",
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <textarea
                            className={`max-h-[5.125rem] flex-grow container bg-main focus:outline-none 
                                        resize-none text-[0.875rem] font-normal 
                                        leading-[1.4rem] `}
                            name="comment"
                            placeholder="Add a comment..."
                            onChange={(e) => {
                                handleInput(e);
                            }}
                            onClick={(e) => {
                                cursor.current = e.target.selectionStart;
                            }}
                            value={comment}
                            rows={1}
                            ref={textAreaRef1}
                        />
                        <button
                            className={`text-[0.875rem] text-blue-400 font-medium tracking-wide mx-2 ${
                                comment.trim().length === 0 ? "hidden" : "block"
                            }`}
                            onClick={postComment}
                        >
                            Post
                        </button>
                    </>
                )}
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
                        <BsEmojiSmile className="h-5 w-5" color={"#9CA3AF"} />
                    </button>
                    {emIsOpen ? (
                        <EmojiPicker
                            handleText={setComment}
                            position="top-left"
                            cursor={cursor}
                            text={comment}
                            emojiSectionRef={emojiSectionRef}
                            setEmIsOpen={setEmIsOpen}
                            cb={() => {
                                textAreaRef1.current.style.height = "auto";
                                textAreaRef1.current.style.height = `${textAreaRef1.current.scrollHeight}px`;
                            }}
                        />
                    ) : null}
                </div>
            </section>
            {isOpen ? (
                <PostModal
                    handleClose={() => setIsOpen(false)}
                    img={imageUrl}
                    ratio={ratio}
                    author={author.username}
                    avatar={author.avatarUrl}
                    caption={caption}
                    createdAt={createdAt}
                    postId={_id}
                    comment={comment}
                    setComment={setComment}
                    handleInput={handleInput}
                    postComment={postComment}
                    user={user}
                    cursor={cursor}
                    commentArr={commentArrModal}
                    setCommentArr={setCommentArrModal}
                />
            ) : null}
        </article>
    );
}

export default PostCard;
