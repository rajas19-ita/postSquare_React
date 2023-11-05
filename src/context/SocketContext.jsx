import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import AuthContext from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setSocket(
                io(import.meta.env.VITE_API_URL, {
                    autoConnect: false,
                    query: { token: user.token },
                })
            );
        }
    }, [user]);

    useEffect(() => {
        if (!socket) return;

        function onConnect() {
            console.log("connected");
        }
        function onMsg() {
            console.log("message recieved");
        }
        function onNotification(params) {
            console.log(params);
        }

        socket.connect();
        socket.on("connect", onConnect);
        socket.on("msg", onMsg);
        socket.on("notification", onNotification);

        return () => {
            if (socket) {
                socket.disconnect();
                socket.off("connect", onConnect);
                socket.off("msg", onMsg);
                socket.off("notification", onNotification);
            }
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
