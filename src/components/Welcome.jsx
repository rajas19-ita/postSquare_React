import React from "react";
import waving from "../assets/waving.png";
import defaultPic from "../assets/avatar-1.jpg";
import Happy from "../assets/happy.png";
import post from "../assets/post.png";
import click from "../assets/click.gif";

function Welcome({ user: { username }, existingUsers, setIsNew }) {
    return (
        <div className="flex flex-col items-center justify-center  h-full w-full">
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
                            <img
                                src={
                                    user1.avatarUrl
                                        ? user1.avatarUrl
                                        : defaultPic
                                }
                                alt={`avatar of ${user1.username}`}
                                className={`rounded-full w-8 h-8 `}
                                name={user1.username}
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

                    <p className="text-2xl font-semibold leading-[2.1rem] flex gap-2">
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
