import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const useFetchPost = () => {
  const [posts, setPosts] = useState([]);
  const [lastTimeStamp, setLastTimeStamp] = useState(Date.now());
  const [postEnd, setPostEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    if (!postEnd) {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.VITE_API_URL}/posts?timeStamp=${lastTimeStamp}`,
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

          setPosts((posts) => [...posts, ...json]);
          setLastTimeStamp(Date.parse(post.createdAt));
        }
        setIsLoading(false);
      }
    }
  };

  return { posts, fetchPosts, isLoading };
};

export default useFetchPost;
