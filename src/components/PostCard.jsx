import React, { useEffect } from "react";
import PostModal from "../components/PostModal";
import { BsDot } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart, AiOutlineSmile } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useContext } from "react";
import getTimePassed from "../utils/getTimePassed";
import AuthContext from "../context/AuthContext";
import defaultPic from "../assets/avatar-1.jpg";
import { FadeLoader } from "react-spinners";
import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

function PostCard({
    post: { caption, imageUrl, createdAt, author, _id, likes, hasLiked },
}) {
    const [liked, setLiked] = useState(hasLiked);
    const [isOpen, setIsOpen] = useState(false);
    const [ratio, setRatio] = useState(null);
    const [totalLikes, setTotalLikes] = useState(likes);
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const cursor = useRef(0);
    const textAreaRef1 = useRef(null);
    const [comment, setComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [commentArrCard, setCommentArrCard] = useState([]);
    const [commentArrModal, setCommentArrModal] = useState([]);

    const handleLoad = (e) => {
        setIsLoading(false);
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

    const handleInput = (e, cursor) => {
        setComment(e.target.value);
        setTimeout(() => (cursor.current = e.target.selectionStart), 10);
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

    return (
        <div className="w-80 sm:w-[28rem] pt-2 bg-main border-b-[1px] border-b-slate-600 ">
            <div className="relative overflow-y-hidden">
                <div className="flex h-16 px-1 items-center ">
                    <img
                        src={author.avatarUrl ? author.avatarUrl : defaultPic}
                        alt="avatar"
                        className="rounded-full w-9 h-9 mr-3.5"
                    />
                    <h2 className="text-[0.875rem] font-medium tracking-wide mr-1 ">
                        {author.username}
                    </h2>
                    <BsDot className="text-gray-500 text-sm mt-1 " />
                    <h3 className=" text-gray-500 mt-0.5 text-[0.8125rem] tracking-wide">
                        {getTimePassed(createdAt)}
                    </h3>
                </div>

                {isLoading ? (
                    <div className="w-full aspect-[16/9] animate-pulse bg-[#2A3A4B]"></div>
                ) : null}
                <div className="w-full">
                    <img
                        src={imageUrl}
                        onLoad={handleLoad}
                        className={`${
                            isLoading ? "hidden" : "block"
                        } object-contain rounded-sm w-full`}
                    />
                </div>

                <div className="flex h-10  mt-1 items-center justify-between">
                    <div className="flex gap-4">
                        <button
                            className="active:scale-95"
                            onClick={handleLike}
                        >
                            {liked ? (
                                <AiFillHeart size={27} />
                            ) : (
                                <AiOutlineHeart size={27} />
                            )}
                        </button>
                        <button
                            className="active:scale-95"
                            onClick={() => setIsOpen(true)}
                        >
                            <TbMessageCircle2 size={27} />
                        </button>
                    </div>
                    <span className="font-medium text-[0.875rem] tracking-wide">
                        {totalLikes} likes
                    </span>
                </div>
                <div className="my-2">
                    <p className="break-words font-normal text-[0.875rem] leading-[1.4rem]">
                        <span className="font-medium tracking-wide">
                            {author.username}{" "}
                        </span>
                        {caption}
                    </p>
                </div>
                <button
                    className="text-[0.875rem] font-normal text-gray-400 mb-2"
                    onClick={() => setIsOpen(true)}
                >
                    View all Comments
                </button>
                <div className="">
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
                </div>
            </div>
            <div className={`flex items-center pt-3 pb-4 `}>
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

                <EmojiPicker
                    handleText={setComment}
                    position="top-left"
                    cursor={cursor}
                    text={comment}
                    cb={() => {
                        textAreaRef1.current.style.height = "auto";
                        textAreaRef1.current.style.height = `${textAreaRef1.current.scrollHeight}px`;
                    }}
                    color={"#9CA3AF"}
                />
            </div>
            <PostModal
                isOpen={isOpen}
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
                commentArr={commentArrModal}
                setCommentArr={setCommentArrModal}
            />
        </div>
    );
}

export default PostCard;
