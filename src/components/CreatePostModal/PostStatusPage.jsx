import React from "react";
import { FadeLoader } from "react-spinners";
import errorGif from "../../assets/error.gif";
import successGif from "../../assets/success.gif";

function PostStatusPage({ isPosting, postError }) {
    return (
        <div
            className="self-center w-full max-w-[23rem] md:max-w-[25.625rem]
      aspect-[4/5] bg-[#34495e]  text-[#e6e6e6] rounded-md flex flex-col"
            aria-labelledby="post-status-heading"
        >
            <h2
                className="self-center p-4 text-[1rem] md:text-lg"
                id="post-status-heading"
            >
                {isPosting ? "Posting" : postError ? "Error" : "Posted"}
            </h2>
            <div className="flex flex-col items-center flex-grow border-t-[1px] justify-center border-t-slate-600">
                {isPosting ? (
                    <FadeLoader
                        size={150}
                        color="#8f8f8f"
                        speedMultiplier={2}
                    />
                ) : postError ? (
                    <div className="flex flex-col items-center">
                        <img
                            src={errorGif}
                            alt="Error: Failed to post"
                            className="w-24 md:w-32"
                        />
                        <p className="text-xl md:text-2xl text-red-500">
                            {postError}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <img
                            src={successGif}
                            alt="Success: Posted Successfully"
                            className="md:w-32 w-24 "
                        />
                        <p className="text-xl md:text-2xl">
                            Successfully Posted
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostStatusPage;
