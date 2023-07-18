import React, { useEffect } from "react";
import PostModal from "../components/PostModal";
import { BsDot } from "react-icons/bs";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineSend,
  AiOutlineSmile,
} from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useContext } from "react";
import getTimePassed from "../utils/getTimePassed";
import AuthContext from "../context/AuthContext";
import defaultPic from "../assets/avatar-1.jpg";
import CommentBox from "./CommentBox";
import { useRef } from "react";
import { FadeLoader } from "react-spinners";

function PostCard({
  post: { caption, imageUrl, createdAt, author, _id, likes, hasLiked },
}) {
  const [liked, setLiked] = useState(hasLiked);
  const [isOpen, setIsOpen] = useState(false);
  const [ratio, setRatio] = useState(null);
  const [totalLikes, setTotalLikes] = useState(likes);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const boxRef = useRef(null);
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

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

  const handleInput = (e) => {
    setComment(e.target.value);

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
      console.log("posted");
    }
    setComment("");
    setIsPosting(false);
  };

  return (
    <div className="w-80 sm:w-[29.25rem] pt-2 bg-[#2e4053] border-b-[1px] border-b-slate-600 ">
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
          <h3 className=" text-gray-500 mt-0.5 text-[0.875rem]">
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
            <button className="active:scale-95" onClick={handleLike}>
              {liked ? <AiFillHeart size={27} /> : <AiOutlineHeart size={27} />}
            </button>
            <button className="active:scale-95" onClick={() => setIsOpen(true)}>
              <TbMessageCircle2 size={27} />
            </button>
          </div>
          <span className="font-medium text-[0.875rem] tracking-wide">
            {totalLikes} likes
          </span>
        </div>
        <div className="mt-2 mb-4">
          <p className="break-words font-light text-[0.875rem] leading-[1.4rem]">
            <span className="font-medium tracking-wide">
              {author.username}{" "}
            </span>
            {caption}
          </p>
        </div>
        <CommentBox
          boxRef={boxRef}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
          ratio={ratio}
          postId={_id}
          user={user}
        />
        {/* <div>
          <p className="break-words font-light text-[0.875rem] leading-[1.4rem]">
            <span className="font-medium tracking-wide">
              {author.username}{" "}
            </span>
            {caption}
          </p>
        </div> */}
      </div>
      <div
        className={`flex items-center pt-3 pb-4  ${
          isOpen
            ? "pl-5 pr-2  bg-[#34495e] border-t-[1px] border-t-slate-600"
            : "bg-[#2e4053] transition-commentBox duration-[800ms] ease-in-out"
        }`}
      >
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
              className={`max-h-[5.125rem] flex-grow container bg-[#2e4053] focus:outline-none 
      resize-none text-[0.875rem] font-light leading-[1.4rem] ${
        isOpen
          ? "bg-[#34495e]"
          : "bg-[#2e4053] transition-colors  duration-[800ms] ease-in-out"
      }`}
              placeholder="Add a comment..."
              onChange={handleInput}
              value={comment}
              rows={1}
            />
            <button
              className={`text-[0.875rem] font-medium tracking-wide pl-2 ${
                comment.trim().length === 0 ? "hidden" : "block"
              }`}
              onClick={postComment}
            >
              Post
            </button>
          </>
        )}

        <button className=" ml-3 active:scale-95">
          <AiOutlineSmile size={17} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}

export default PostCard;
