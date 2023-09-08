import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import defaultPic from "../assets/avatar-1.jpg";

const useFetchPost = () => {
    const [posts, setPosts] = useState([]);
    const [lastTimeStamp, setLastTimeStamp] = useState(Date.now());
    const [postEnd, setPostEnd] = useState(false);
    const [contentLoading, setContentLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [count, setCount] = useState([]);

    const { user } = useContext(AuthContext);

    const fetchPosts = async () => {
        if (!postEnd) {
            setContentLoading(true);
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/posts?timeStamp=${lastTimeStamp}`,
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
                    setPostEnd(true);
                } else {
                    setCount(Array.from({ length: json.length }, (v, i) => i));
                    setImgLoading(true);

                    const post = json[json.length - 1];
                    setLastTimeStamp(Date.parse(post.createdAt));

                    const updatedPosts = await fetchImg(json);
                    setPosts((posts) => [...posts, ...updatedPosts]);
                    setCount([]);
                    setImgLoading(false);
                }
            }
        }
    };
    const fetchImg = async (json) => {
        const updatedPosts = await Promise.all(
            json.map(async (post) => {
                if (!post.author.avatarUrl) {
                    post.author.avatarUrl = defaultPic;
                    const response = await fetch(post.imageUrl);
                    const blob = await response.blob();
                    post.imageUrl = URL.createObjectURL(blob);
                } else {
                    const req1 = fetch(post.imageUrl);
                    const req2 = fetch(post.author.avatarUrl);
                    const response = await Promise.all([req1, req2]);

                    const blob = await Promise.all([
                        response[0].blob(),
                        response[1].blob(),
                    ]);
                    post.imageUrl = URL.createObjectURL(blob[0]);
                    post.author.avatarUrl = URL.createObjectURL(blob[1]);
                }
                return post;
            })
        );

        return updatedPosts;
    };

    return { posts, fetchPosts, contentLoading, count, imgLoading };
};

export default useFetchPost;
