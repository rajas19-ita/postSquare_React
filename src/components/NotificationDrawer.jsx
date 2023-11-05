import React from "react";
import msg from "../assets/msg.gif";
import { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Notification from "./Notification";
import { FadeLoader } from "react-spinners";
import { GrAddCircle } from "react-icons/gr";

function NotificationDrawer() {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [isEnd, setIsEnd] = useState(false);
    const [notificationArr, setNotificationArr] = useState([]);
    const notisFetched = useRef(false);

    useEffect(() => {
        if (notisFetched.current) return;
        fetchNotifications();
        notisFetched.current = true;
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${
                user._id
            }/notifications?timeStamp=${timeStamp}`,
            {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        const json = await response.json();

        if (response.ok) {
            if (json.length === 0) {
                setIsEnd(true);
            } else {
                const notification = json[json.length - 1];
                setTimeStamp(Date.parse(notification.createdAt));

                setNotificationArr((notification) => [
                    ...notification,
                    ...json,
                ]);
            }
        }
        setLoading(false);
    };

    return (
        <div
            className={`absolute w-96 h-full left-full bg-main border-l-[1px] border-r-2
             border-l-[#3d4957] border-r-[#293a4b]
            overflow-y-scroll
              `}
        >
            <div className="flex flex-col gap-6 ">
                <div
                    className="text-2xl font-semibold tracking-wide flex items-center 
                 pt-7 pl-7 pb-4 bg-sidebar  "
                >
                    <h2>Notifications</h2>
                    {/* <img src={msg} className="h-12 w-16" /> */}
                </div>
                <div className="flex flex-col gap-4">
                    {notificationArr.map((notification) => (
                        <Notification
                            userId={notification.from._id}
                            key={notification._id}
                            username={notification.from.username}
                            avatarUrl={notification.from.avatarUrl}
                            postId={notification.postId}
                            commentId={notification.commentId}
                            type={notification.type}
                            createdAt={notification.createdAt}
                        />
                    ))}
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
                        <div className="self-center">
                            <button
                                className="active:scale-95 transition-all ease-out enabled:active:text-white 
                         disabled:opacity-20 opacity-100"
                                onClick={fetchNotifications}
                                aria-label="Fetch more comments"
                                disabled={isEnd}
                            >
                                <GrAddCircle size={35} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotificationDrawer;
