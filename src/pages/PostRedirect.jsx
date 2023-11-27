import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FadeLoader } from "react-spinners";
import PostCard from "../components/PostCard";

function PostRedirect() {
    const location = useLocation();
    const { id } = useParams();
    const cmntId = new URLSearchParams(location.search).get("cmntId");
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, [id, cmntId]);

    const fetchPost = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/${id}`,
            { headers: { authorization: `Bearer ${user.token}` } }
        );
        const json = await response.json();

        if (response.ok) {
            setPost(json);
        }
        setLoading(false);
    };

    return (
        <div className="flex pt-4 justify-center h-full overflow-y-auto">
            {loading ? (
                <FadeLoader color="#8f8f8f" speedMultiplier={2} />
            ) : (
                <PostCard
                    post={post}
                    openModal={cmntId ? true : false}
                    notiCommentId={cmntId}
                />
            )}
        </div>
    );
}

export default PostRedirect;
