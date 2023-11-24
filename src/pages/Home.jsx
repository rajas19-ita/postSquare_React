import PostFeed from "../components/PostFeed";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Welcome from "../components/Welcome";

function Home() {
    const { isNew } = useContext(AuthContext);

    return <>{isNew ? <Welcome /> : <PostFeed />}</>;
}
export default Home;
