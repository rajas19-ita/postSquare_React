import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import CaptionInput from "./CaptionInput";
import { FadeLoader } from "react-spinners";

function PostEditPage({
  aspect,
  croppedImg,
  setPage,
  loading,
  setCroppedImg,
  setAspect,
  setCaption,
  caption,
  createPost,
}) {
  return (
    <div
      className={`fixed flex flex-col rounded-md w-80 aspect-[4/5] ${
        aspect === 0.8
          ? "sm:aspect-[3/2] sm:w-[37rem] md:w-[42rem] lg:w-[45rem] xl:w-3/5"
          : "sm:aspect-[15/9] sm:w-[37rem] md:w-[42rem] lg:w-[50rem] xl:w-2/3"
      }  z-50 bg-[#34495e]  text-[#e6e6e6] 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="flex justify-between p-3 border-b-[1px] border-b-slate-600 h-[11%] items-center">
        <button
          className="active:scale-95 ml-1"
          onClick={() => {
            setAspect(1);
            setCroppedImg(null);
            setPage("IMAGE_EDIT");
          }}
        >
          <FaArrowLeft size={17} />
        </button>
        <h2 className="md:text-lg ">Create New Post</h2>
        <button className="mr-2 active:scale-95" onClick={createPost}>
          <span className="uppercase text-sm tracking-wide text-blue-400">
            Post
          </span>
        </button>
      </div>
      <div className="flex h-[89%]">
        <div
          className={`${
            aspect === 0.8 ? "aspect-[4/5]" : "aspect-square"
          }  h-full rounded-bl-md hidden sm:flex sm:felx-col sm:items-center sm:justify-center
          border-r-[1px] border-r-slate-600`}
        >
          {loading ? (
            <FadeLoader color="#8f8f8f" speedMultiplier={2} />
          ) : (
            <img
              src={croppedImg}
              className="h-full w-full object-contain rounded-bl-md bg-black"
            />
          )}
        </div>
        <div className="flex-grow flex flex-col">
          <CaptionInput setCaption={setCaption} caption={caption} />
        </div>
      </div>
    </div>
  );
}

export default PostEditPage;
