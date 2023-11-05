import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import CaptionInput from "./CaptionInput";
import { FadeLoader } from "react-spinners";

function PostEditPage({
    aspect,
    croppedImg,
    loading,
    handleBack,
    setCaption,
    caption,
    createPost,
}) {
    return (
        <div
            className="self-center flex flex-col rounded-md w-full max-w-[23rem] md:max-w-[48rem] aspect-[4/5] mx-16
         bg-[#34495e] md:aspect-[3/2] text-[#e6e6e6]"
            aria-labelledby="post-page-heading"
        >
            <div className="flex justify-between p-4 border-b-[1px] border-b-slate-600 h-[11%] items-center">
                <button
                    className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] "
                    onClick={() => {
                        handleBack();
                    }}
                    aria-label="back"
                >
                    <HiArrowLeft size={25} />
                </button>
                <h2 className="text-[1rem] md:text-lg " id="post-page-heading">
                    Create Your Post
                </h2>
                <button
                    className=" active:scale-95 transition-all ease-out uppercase text-[0.85rem] md:text-[0.90rem] font-semibold tracking-wide
                     text-blue-400 active:text-gray-400"
                    onClick={createPost}
                >
                    Post
                </button>
            </div>
            <div className="flex h-[89%]">
                <div
                    className={`${
                        aspect <= 0.8 ? "aspect-[4/5]" : "aspect-[13/16]"
                    }  h-full rounded-bl-md hidden md:flex md:flex-col md:items-center md:justify-center
          border-r-[1px] border-r-slate-600`}
                >
                    {loading ? (
                        <FadeLoader color="#8f8f8f" speedMultiplier={2} />
                    ) : (
                        <img
                            src={croppedImg}
                            className="h-full w-full object-contain rounded-bl-md bg-black"
                            alt="Preview of the post image"
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
