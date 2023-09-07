import PostFeed from "../components/PostFeed";
import { useState } from "react";

function Home() {
    return (
        <div className="h-full pb-16 md:pb-0 md:pl-20 text-[#e6e6e6] w-full ">
            <PostFeed />
        </div>
    );
}
export default Home;
