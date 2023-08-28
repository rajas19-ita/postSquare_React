import Comment from "./Comment";
import { useState, useRef, useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";
import defaultPic from "../assets/avatar-1.jpg";
import { FadeLoader } from "react-spinners";

function CommentList({ postId, user }) {
    const [commentArr, setCommentArr] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [isLoading, setIsLoading] = useState(false);
    const commentsFetched = useRef(false);

    useEffect(() => {
        if (commentsFetched.current) return;
        fetchComments();
        commentsFetched.current = true;
    }, []);

    const fetchComments = async () => {
        if (!isEnd) {
            setIsLoading(true);
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
                setIsLoading(false);
                if (json.length === 0) {
                    setIsEnd(true);
                } else {
                    const cmnt = json[json.length - 1];
                    setTimeStamp(Date.parse(cmnt.createdAt));
                    setCommentArr((comments) => [...comments, ...json]);
                }
            }
        }
    };
    return (
        <>
            {commentArr.map((cmnt) => (
                <Comment
                    key={cmnt._id}
                    author={cmnt.author.username}
                    comment={cmnt.comment}
                    avatar={
                        cmnt.author.avatarUrl
                            ? cmnt.author.avatarUrl
                            : defaultPic
                    }
                    createdAt={cmnt.createdAt}
                />
            ))}

            <div className="self-center ">
                {isLoading ? (
                    <FadeLoader
                        color="#8f8f8f"
                        height={7}
                        margin={-9}
                        radius={8}
                        width={3}
                        speedMultiplier={2}
                    />
                ) : (
                    <button
                        className="active:scale-95 transition-all ease-out enabled:active:text-white 
                         disabled:opacity-20 opacity-100"
                        onClick={fetchComments}
                        aria-label="Fetch more comments"
                        disabled={isEnd}
                    >
                        <GrAddCircle size={35} />
                    </button>
                )}
            </div>
        </>
    );
}
export default CommentList;
