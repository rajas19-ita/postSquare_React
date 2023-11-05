import React from "react";
import new_user from "../assets/new_user.png";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import defaultPic from "../assets/avatar-1.jpg";
import post from "../assets/post.png";

function Notification({
    userId,
    username,
    avatarUrl,
    postId,
    commentId,
    type,
    createdAt,
}) {
    const notifMessage = () => {
        switch (type) {
            case "like":
                return (
                    <p className="text-[0.875rem]">
                        {username} liked your post
                    </p>
                );
            case "comment":
                return (
                    <p className="text-[0.875rem]">
                        {username} commented on your post
                    </p>
                );
            case "post":
                return (
                    <p className="text-[0.875rem]">
                        {username} shared a new post
                    </p>
                );
            case "new_user":
                return (
                    <p className="text-[0.875rem]">
                        Welcome {username} to postSquare!!
                    </p>
                );
        }
    };

    return (
        <div
            className={`flex  w-full ${
                type == "new_user" ? "gap-[1rem]" : "gap-[1.125rem]"
            } items-start
             border-b-[1px] border-b-[#293a4b] pb-3 px-8`}
        >
            <div>
                <img
                    src={
                        type == "like"
                            ? like
                            : type == "comment"
                            ? comment
                            : type == "post"
                            ? post
                            : new_user
                    }
                    width={type == "new_user" ? 34 : 30}
                    height={type == "new_user" ? 34 : 30}
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <img
                    src={avatarUrl ? avatarUrl : defaultPic}
                    alt={`avatar of ${username}`}
                    className={`rounded-full w-8 h-8 self-start`}
                />
                {notifMessage()}
            </div>
        </div>
    );
}

export default Notification;
