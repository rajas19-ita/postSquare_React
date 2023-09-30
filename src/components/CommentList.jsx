import Comment from "./Comment";
import { useState, useRef, useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";

import defaultPic from "../assets/avatar-1.jpg";
import { FadeLoader } from "react-spinners";

function CommentList({ postId, user }) {
    const [commentArr, setCommentArr] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [contentLoading, setContentLoading] = useState(false);
    const [count, setCount] = useState([]);
    const commentsFetched = useRef(false);

    useEffect(() => {
        if (commentsFetched.current) return;
        fetchComments();
        commentsFetched.current = true;
    }, []);

    const fetchComments = async () => {
        if (!isEnd) {
            setContentLoading(true);
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/posts/${postId}/comments?timeStamp=${timeStamp}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const json = await response.json();

            if (response.ok) {
                setContentLoading(false);
                if (json.length === 0) {
                    setIsEnd(true);
                } else {
                    setCount(Array.from({ length: json.length }, (v, i) => i));

                    const cmnt = json[json.length - 1];
                    setTimeStamp(Date.parse(cmnt.createdAt));

                    // const updatedComments = await fetchImg(json);
                    setCommentArr((comments) => [...comments, ...json]);
                    setCount([]);
                }
            }
        }
    };

    // const fetchImg = async (json) => {
    //     const updatedComments = await Promise.all(
    //         json.map(async (comment) => {
    //             if (comment.author.avatarUrl) {
    //                 const response = await fetch(comment.author.avatarUrl);
    //                 const blob = await response.blob();
    //                 comment.author.avatarUrl = URL.createObjectURL(blob);
    //             } else {
    //                 comment.author.avatarUrl = defaultPic;
    //             }
    //             return comment;
    //         })
    //     );

    //     return updatedComments;
    // };

    return (
        <>
            {commentArr.map((cmnt) => (
                <Comment
                    key={cmnt._id}
                    author={cmnt.author.username}
                    comment={cmnt.comment}
                    avatar={cmnt.author.avatarUrl}
                    createdAt={cmnt.createdAt}
                />
            ))}

            {contentLoading ? (
                <div className="self-center">
                    <FadeLoader
                        color="#8f8f8f"
                        height={7}
                        margin={-9}
                        radius={8}
                        width={3}
                        speedMultiplier={2}
                    />
                </div>
            ) : count.length === 0 ? (
                <div className="self-center">
                    <button
                        className="active:scale-95 transition-all ease-out enabled:active:text-white 
                         disabled:opacity-20 opacity-100"
                        onClick={fetchComments}
                        aria-label="Fetch more comments"
                        disabled={isEnd}
                    >
                        <GrAddCircle size={35} />
                    </button>
                </div>
            ) : (
                count.map((i) => (
                    <div className="flex gap-3.5 w-full" key={i}>
                        <div className="w-9 h-9 rounded-full animate-pulse bg-[#2A3A4B]"></div>
                        <div className={`flex flex-col gap-1`}>
                            <div className="w-20 h-4 rounded-sm animate-pulse bg-[#2A3A4B]"></div>
                            <div className="h-4 w-64 rounded-sm animate-pulse bg-[#2A3A4B]"></div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
export default CommentList;
