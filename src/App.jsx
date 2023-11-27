import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import EditProfile from "./pages/EditProfile";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

import PostRedirect from "./pages/PostRedirect";
import AppLayout from "./layout/AppLayout";
import EntryLayout from "./layout/EntryLayout";
import PostFeed from "./components/PostFeed";
import Welcome from "./components/Welcome";

function App() {
    const { isNew } = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route element={<EntryLayout />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route
                        path="/"
                        element={isNew ? <Welcome /> : <PostFeed />}
                    />
                    <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/posts/:id" element={<PostRedirect />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
