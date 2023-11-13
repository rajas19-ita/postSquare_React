import getTimePassed from "../utils/getTimePassed";
import defaultPic from "../assets/avatar-1.jpg";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";

function Comment({ author, comment, avatar, createdAt, authorId, type }) {
    const [typ, setTyp] = useState(type);
    useEffect(() => {
        setTimeout(() => setTyp(null), 1530);
    }, []);

    return (
        <div
            className={`flex gap-3.5 w-full ${
                typ === "noti" ? "animate-bounce" : null
            }`}
        >
            <div className="self-start">
                <Avatar
                    pic={avatar ? avatar : defaultPic}
                    username={author}
                    userId={authorId}
                    position="bottom"
                    color={"dark"}
                />
            </div>

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
