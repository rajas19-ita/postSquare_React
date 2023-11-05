import PostFeed from "../components/PostFeed";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import Welcome from "../components/Welcome";

function Home() {
    const { user, isNew, setIsNew } = useContext(AuthContext);
    const usersFetched = useRef(false);
    const [existingUsers, setExistingUsers] = useState([]);

    useEffect(() => {
        if (usersFetched.current === true) return;
        usersFetch();
        usersFetched.current = true;
    }, []);

    const usersFetch = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`);

        const json = await response.json();
        if (response.ok) {
            setExistingUsers(json);
        }
    };

    return (
        <div className="h-full pb-16 md:pb-0 md:pl-20 text-[#e6e6e6] w-full ">
            {isNew ? (
                <Welcome
                    user={user}
                    existingUsers={existingUsers}
                    setIsNew={setIsNew}
                />
            ) : (
                <PostFeed />
            )}
        </div>
    );
}
export default Home;
