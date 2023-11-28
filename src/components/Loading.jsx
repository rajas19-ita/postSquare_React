import React from "react";
import loadGif from "../assets/loadingGif.gif";

function Loading({ size, type, count }) {
    const content = () => {
        switch (type) {
            case "line":
                return (
                    <div className="w-full flex flex-col gap-2">
                        {Array(count - 1)
                            .fill(0)
                            .map((i, index) => (
                                <div
                                    className="h-4 rounded-sm animate-pulse bg-[#2A3A4B]"
                                    key={index}
                                ></div>
                            ))}
                        <div
                            className={`h-4 ${
                                size === "large" ? "w-full" : "w-1/2"
                            } rounded-sm animate-pulse bg-[#2A3A4B]`}
                        ></div>
                    </div>
                );
            default:
                return (
                    <img
                        src={loadGif}
                        className={size === "small" ? "w-7" : "w-14"}
                    />
                );
        }
    };

    return <>{content()}</>;
}

export default Loading;
