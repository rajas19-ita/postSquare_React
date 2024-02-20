import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const useFetchPost = () => {
    const [posts, setPosts] = useState([]);
    const [lastTimeStamp, setLastTimeStamp] = useState(Date.now());
    const [postEnd, setPostEnd] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    const { user } = useContext(AuthContext);

    const fetchPosts = async () => {
        if (!postEnd) {
            setPostLoading(true);
            const response = await fetch(
                `${process.env.VITE_API_URL}/api/posts?timeStamp=${lastTimeStamp}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const json = await response.json();

            if (response.ok) {
                if (json.length === 0) {
                    setPostEnd(true);
                } else {
                    const post = json[json.length - 1];
                    setLastTimeStamp(Date.parse(post.createdAt));

                    setPosts((posts) => [...posts, ...json]);
                }
                setPostLoading(false);
            }
        }
    };

    return { posts, fetchPosts, postLoading };
};

export default useFetchPost;
