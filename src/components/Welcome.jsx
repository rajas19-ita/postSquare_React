import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import waving from "../assets/waving.png";

import Happy from "../assets/happy.png";
import post from "../assets/post.png";
import click from "../assets/click.gif";
import Avatar from "./Avatar";
import AuthContext from "../context/AuthContext";

function Welcome() {
    const { setIsNew, user } = useContext(AuthContext);
    const usersFetched = useRef(false);
    const [existingUsers, setExistingUsers] = useState([]);

    useEffect(() => {
        if (usersFetched.current === true) return;
        usersFetch();
        usersFetched.current = true;
    }, []);

    const usersFetch = async () => {
        const queryParams = new URLSearchParams();
        queryParams.append("except", user._id);
        queryParams.append("dataFields[]", "avatarUrl");
        queryParams.append("dataFields[]", "username");

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users?${queryParams.toString()}`
        );

        const json = await response.json();
        if (response.ok) {
            setExistingUsers(json);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-[34rem] flex flex-col">
                <div className="flex gap-3">
                    <img
                        src={waving}
                        width={48}
                        height={16}
                        className="self-start"
                    />
                    <h1 className="text-3xl leading-[2.35rem] font-bold mb-7">
                        Welcome to postSquare !! <br />- Your Creative Space
                    </h1>
                </div>
                <div className="pl-7  text-[0.9375rem] leading-[1.4rem]">
                    <p className="mb-5">
                        We're excited to have you join our vibrant community of
                        creators! PostSquare is your platform to share your
                        stories, moments, and art with the world. 🌍
                    </p>

                    <p className="mb-3">
                        Feel free to connect with our community
                    </p>
                    <div className="flex gap-2 mb-8">
                        {existingUsers.map((user1) => (
                            <Avatar
                                pic={user1.avatarUrl}
                                username={user1.username}
                                userId={user1._id}
                                position="top"
                                key={user1._id}
                            />
                        ))}
                    </div>

                    <div className="flex gap-1 mb-[0.13rem] ">
                        <img
                            className="self-start mt-[-2px]"
                            src={Happy}
                            width={38}
                            height={38}
                        />
                        <p className="text-2xl  font-semibold ">
                            Happy posting
                        </p>
                    </div>

                    <p className="text-2xl font-semibold leading-[2rem] flex gap-2">
                        & enjoy your journey on
                        <span className="flex gap-1">
                            postSquare !
                            <span className="relative">
                                <button
                                    className="active:scale-90 transition-all ease-out self-start"
                                    onClick={() => setIsNew(false)}
                                >
                                    <img src={post} width={38} height={38} />

                                    <img
                                        className="self-start absolute left-3 top-3"
                                        src={click}
                                        width={45}
                                        height={45}
                                    />
                                </button>
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
