import React, { useEffect, useRef } from "react";
import useFetchPost from "../hooks/useFetchPost";
import PostCard from "./PostCard";

import Loading from "./Loading";

function PostFeed() {
    const postsFetched = useRef(false);
    const feedRef = useRef(null);
    const { posts, fetchPosts, postLoading } = useFetchPost();
    const tolerence = 1;

    useEffect(() => {
        if (!postsFetched.current) {
            fetchPosts();
            postsFetched.current = true;
        }
    }, []);

    const handleScrollEnd = async (e) => {
        if (
            Math.ceil(
                feedRef.current.offsetHeight +
                    feedRef.current.scrollTop +
                    tolerence
            ) >= feedRef.current.scrollHeight &&
            !postLoading
        ) {
            fetchPosts();
        }
    };

    return (
        <div
            className="flex flex-col w-full items-center pt-4 gap-2 overflow-y-auto h-full"
            ref={feedRef}
            onScroll={handleScrollEnd}
        >
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            {postLoading ? <Loading /> : null}
        </div>
    );
}

export default PostFeed;
