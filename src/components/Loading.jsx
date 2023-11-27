import React from "react";
import loadGif from "../assets/loadingGif.gif";

function Loading({ size }) {
    return <img src={loadGif} className={size === "small" ? "w-7" : "w-14"} />;
}

export default Loading;
