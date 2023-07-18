import React from "react";
import { TfiMinus } from "react-icons/tfi";
import CommentList from "./CommentList";

function CommentBox({ boxRef, isOpen, handleClose, ratio, postId, user }) {
  return (
    <div
      className={`absolute flex flex-col bg-[#34495e] w-full  ${
        ratio === 1.8 ? "top-0 " : "top-[25%] "
      }bottom-0 transition-all ease-in-out duration-300 rounded-b-sm rounded-t-2xl ${
        isOpen ? "translate-y-0" : "translate-y-[101%]"
      }`}
      ref={boxRef}
    >
      <div className=" flex flex-col items-center border-b-[1px] border-b-slate-600">
        <button onClick={handleClose}>
          <TfiMinus size={30} />
        </button>
        <h2 className="text-[0.875rem] font-medium tracking-wide pb-2">
          Comments
        </h2>
      </div>
      <div className="flex-grow   container flex flex-col ">
        <CommentList postId={postId} user={user} />
      </div>
    </div>
  );
}

export default CommentBox;
