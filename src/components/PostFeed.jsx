import React, { useEffect, useRef } from "react";
import useFetchPost from "../hooks/useFetchPost";
import PostCard from "./PostCard";
import { FadeLoader } from "react-spinners";

function PostFeed() {
    const postsFetched = useRef(false);
    const feedRef = useRef(null);
    const { posts, fetchPosts, contentLoading, count, imgLoading } =
        useFetchPost();
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
            !imgLoading &&
            !contentLoading
        ) {
            fetchPosts();
        }
    };

    return (
        <div
            className="flex flex-col w-full items-center pt-3 gap-2 overflow-y-auto h-full"
            ref={feedRef}
            onScroll={handleScrollEnd}
        >
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            {contentLoading ? (
                <div className="w-full">
                    <FadeLoader
                        color="#8f8f8f"
                        className="mx-auto mb-5 "
                        speedMultiplier={2}
                    />
                </div>
            ) : count.length === 0 ? null : (
                count.map((i) => (
                    <div className="w-80 sm:w-[28rem] mb-4" key={i}>
                        <div className="flex h-14 items-center">
                            <div className="w-9 h-9 mr-3.5 rounded-full animate-pulse bg-[#2A3A4B]"></div>
                            <div className="h-4 w-24 rounded-sm animate-pulse bg-[#2A3A4B]"></div>
                        </div>
                        <div className="w-full aspect-[16/9] animate-pulse bg-[#2A3A4B] rounded-sm"></div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PostFeed;
