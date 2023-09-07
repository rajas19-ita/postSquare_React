import { useState, useEffect, useRef } from "react";
import getTimePassed from "../utils/getTimePassed";

function Comment({ author, comment, avatar, createdAt, caption = false }) {
    const firstUnmount = useRef(true);

    useEffect(() => {
        return () => {
            if (!firstUnmount.current && !caption) {
                URL.revokeObjectURL(avatar);
            }
            firstUnmount.current = false;
        };
    }, []);
    return (
        <div className="flex gap-3.5 w-full">
            <img
                src={avatar}
                alt={`avatar of ${author}`}
                className={`rounded-full w-9 h-9 self-start`}
            />

            <div className={`flex flex-col gap-1`}>
                <p className={`font-normal text-[0.875rem] leading-[1.4rem]`}>
                    <span className="font-medium text-[0.875rem] tracking-wide">
                        {author}{" "}
                    </span>
                    {comment}
                </p>
                <span className={`text-gray-500 text-[0.8125rem]`}>
                    {getTimePassed(createdAt)}
                </span>
            </div>
        </div>
    );
}
export default Comment;
