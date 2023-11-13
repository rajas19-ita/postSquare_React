import React, { useRef, useState, useEffect } from "react";
import { FadeLoader } from "react-spinners";

function UserCard({ pic, username, position, userId, color }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const userFetched = useRef(false);

    useEffect(() => {
        if (userFetched.current === true) return;
        userFetch();
        userFetched.current = true;
    }, []);

    const userFetch = async () => {
        const queryParams = new URLSearchParams();

        queryParams.append("dataFields[]", "bio");

        const response = await fetch(
            `${
                import.meta.env.VITE_API_URL
            }/users/${userId}?${queryParams.toString()}`
        );

        const json = await response.json();
        if (response.ok) {
            setUser(json);
        }
        setLoading(false);
    };
    return (
        <>
            <div
                className={`absolute ${
                    position == "top"
                        ? "bottom-full "
                        : position == "left"
                        ? "right-full top-0"
                        : position == "bottom"
                        ? "top-full"
                        : "left-full top-0"
                } opacity-60 w-64 h-[15rem]`}
            ></div>
            <div
                className={`absolute flex z-10 flex-col gap-3 w-64 min-h-[5rem] ${
                    color == "dark"
                        ? "bg-[#2a3a4b] border-[1px] border-slate-600"
                        : "bg-[#34495e] border-[1px] border-slate-600"
                }  ${
                    position == "top"
                        ? "bottom-[130%] "
                        : position == "left"
                        ? "right-[130%] top-0"
                        : position == "bottom"
                        ? "top-[130%]"
                        : "left-[130%] top-0"
                } rounded-md p-4 `}
            >
                <div className="flex gap-4 items-center">
                    <img
                        src={pic}
                        alt={`avatar of ${username}`}
                        className={`rounded-full cursor-pointer w-14 h-14 `}
                    />
                    <h2 className="text-sm font-medium tracking-wide">
                        {username}
                    </h2>
                </div>

                {loading ? (
                    <div className="self-center">
                        <FadeLoader
                            color="#8f8f8f"
                            height={7}
                            margin={-9}
                            radius={8}
                            width={3}
                            speedMultiplier={2}
                        />
                    </div>
                ) : (
                    <p className="text-sm leading-[1.4rem]">{user.bio}</p>
                )}
            </div>
        </>
    );
}

export default UserCard;
