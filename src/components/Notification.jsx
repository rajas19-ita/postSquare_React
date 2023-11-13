import React from "react";
import new_user from "../assets/new_user.png";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import defaultPic from "../assets/avatar-1.jpg";
import post from "../assets/post.png";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

function Notification({
    userId,
    username,
    avatarUrl,
    postId,
    commentId,
    type,
    createdAt,
    closeDrawer,
}) {
    const notifMessage = () => {
        switch (type) {
            case "like":
                return (
                    <p className="text-[0.875rem]">
                        <span className="text-[0.9375rem] font-medium tracking-wide">
                            {username}
                        </span>{" "}
                        liked your post
                    </p>
                );
            case "comment":
                return (
                    <p className="text-[0.875rem]">
                        <span className="text-[0.9375rem] font-medium tracking-wide">
                            {username}
                        </span>{" "}
                        commented on your post
                    </p>
                );
            case "post":
                return (
                    <p className="text-[0.875rem]">
                        <span className="text-[0.9375rem] font-medium tracking-wide">
                            {username}
                        </span>{" "}
                        shared a new post
                    </p>
                );
            case "new_user":
                return (
                    <p className="text-[0.875rem]">
                        Welcome{" "}
                        <span className="text-[0.9375rem] font-medium tracking-wide">
                            {username}
                        </span>{" "}
                        to postSquare!!
                    </p>
                );
        }
    };

    return (
        <Link
            to={{
                pathname: `${type != "new_user" ? `/posts/${postId}` : null}`,
                search: `${type === "comment" ? `?cmntId=${commentId}` : null}`,
            }}
            onClick={closeDrawer}
        >
            <div
                className={`flex  w-full ${
                    type == "new_user" ? "gap-[1rem]" : "gap-[1.125rem]"
                } items-start
             border-b-[1px] border-b-[#293a4b] pb-3 px-8 pt-4 hover:bg-[#263444] transition-all ease-in-out`}
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

                <div className="flex flex-col gap-2.5 items-start">
                    <Avatar
                        pic={avatarUrl ? avatarUrl : defaultPic}
                        username={username}
                        userId={userId}
                        position="bottom"
                    />
                    {notifMessage()}
                </div>
            </div>
        </Link>
    );
}

export default Notification;
