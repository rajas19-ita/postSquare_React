import React, { useState } from "react";
import defaultPic from "../assets/avatar-1.jpg";
import UserCard from "./UserCard";

function Avatar({ pic, username, userId, position, color }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`relative `}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <img
                src={pic ? pic : defaultPic}
                alt={`avatar of ${username}`}
                className={`rounded-full w-9 h-9 cursor-pointer  `}
            />
            {isOpen ? (
                <UserCard
                    pic={pic ? pic : defaultPic}
                    username={username}
                    position={position}
                    userId={userId}
                    color={color}
                />
            ) : null}
        </div>
    );
}

export default Avatar;
