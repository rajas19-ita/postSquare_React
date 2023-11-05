import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
