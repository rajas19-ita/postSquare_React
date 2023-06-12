import React from "react";
import PostModal from "../components/PostModal";
import { BsDot } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useContext } from "react";
import getTimePassed from "../utils/getTimePassed";
import AuthContext from "../context/AuthContext";
import defaultPic from "../assets/avatar-1.jpg";

function PostCard({
  post: { caption, imageUrl, createdAt, author, _id, likes, hasLiked },
}) {
  const [liked, setLiked] = useState(hasLiked);
  const [isOpen, setIsOpen] = useState(false);
  const [ratio, setRatio] = useState(null);
  const [totalLikes, setTotalLikes] = useState(likes);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="w-80 sm:w-96 rounded-md bg-[#34495e] ">
      <div className="flex h-16 px-4 items-center ">
        <img
          src={author.avatarUrl ? author.avatarUrl : defaultPic}
          alt="avatar"
          className="rounded-full w-10 h-10 mr-4"
        />
        <h2 className="text-lg font-medium mr-2 tracking-wide">
          {author.username}
        </h2>
        <BsDot className="text-gray-300 text-sm mt-1 mr-1" />
        <h3 className=" tracking-wide text-gray-500 mt-0.5">
          {getTimePassed(createdAt)}
        </h3>
      </div>
      {isLoading ? (
        <div className="w-full aspect-[16/9] animate-pulse bg-[#2A3A4B]"></div>
      ) : null}
      <img
        src={imageUrl}
        onLoad={handleLoad}
        className={`${isLoading ? "hidden" : "block"}`}
      />

      <div className="flex h-10 pl-3.5 pr-4 mt-1 items-center justify-between">
        <div className="flex gap-4">
          <button className="active:scale-95" onClick={handleLike}>
            {liked ? <AiFillHeart size={27} /> : <AiOutlineHeart size={27} />}
          </button>
          <button className="active:scale-95" onClick={() => setIsOpen(true)}>
            <TbMessageCircle2 size={27} />
          </button>
        </div>
        <span className="font-normal">{totalLikes} likes</span>
      </div>
      <div className="px-4 mt-2 mb-4">
        <p className="font-normal break-words">
          <span className="font-medium ">{author.username} </span>
          {caption}
        </p>
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
      />
    </div>
  );
}

export default PostCard;
