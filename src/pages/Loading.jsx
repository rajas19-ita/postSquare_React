import React from "react";
import { FadeLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex flex-col h-full pb-16 md:pb-0 md:pl-20 w-full items-center justify-center">
      <FadeLoader size={150} color="#8f8f8f" speedMultiplier={2} />
    </div>
  );
}

export default Loading;
