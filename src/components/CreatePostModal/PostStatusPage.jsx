import React from "react";
import { FadeLoader } from "react-spinners";
import errorGif from "../../assets/error.gif";
import successGif from "../../assets/success.gif";

function PostStatusPage({ isPosting, postError }) {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 xl:w-[32%] 
      aspect-[4/5] sm:w-[22rem] w-80 bg-[#34495e]  text-[#e6e6e6] rounded-md flex flex-col"
    >
      <h2 className="self-center p-4 text-lg ">Posting</h2>
      <div className="flex flex-col items-center flex-grow border-t-[1px] justify-center border-t-slate-600">
        {isPosting ? (
          <FadeLoader size={150} color="#8f8f8f" speedMultiplier={2} />
        ) : postError ? (
          <div className="flex flex-col items-center">
            <img src={errorGif} alt="Error" className="w-32" />
            <p className="text-2xl text-red-500">{postError}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={successGif} alt="Success Gif" className="w-32" />
            <p className="text-2xl">Successfully Posted</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostStatusPage;
