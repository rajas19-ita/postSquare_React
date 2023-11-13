import PostFeed from "../components/PostFeed";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Welcome from "../components/Welcome";

function Home() {
    const { isNew } = useContext(AuthContext);

    return (
        <div className="h-full pb-16 md:pb-0 md:pl-20 text-[#e6e6e6] w-full ">
            {isNew ? <Welcome /> : <PostFeed />}
        </div>
    );
}
export default Home;
