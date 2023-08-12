import React, { useEffect, useRef } from "react";
import useFetchPost from "../hooks/useFetchPost";
import PostCard from "./PostCard";
import { FadeLoader } from "react-spinners";

function PostFeed() {
    const postsFetched = useRef(false);
    const feedRef = useRef(null);
    const { posts, fetchPosts, isLoading } = useFetchPost();
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
            ) >= feedRef.current.scrollHeight
        ) {
            fetchPosts();
        }
    };

    return (
        <div
            className="flex flex-col w-full items-center pt-3 overflow-y-auto h-full"
            ref={feedRef}
            onScroll={handleScrollEnd}
        >
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            {isLoading ? (
                <div className="w-full">
                    <FadeLoader
                        color="#8f8f8f"
                        className="mx-auto mb-5 "
                        speedMultiplier={2}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default PostFeed;
