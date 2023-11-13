import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import EditProfile from "./pages/EditProfile";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import PageNotFound from "./pages/PageNotFound";
import Loading from "./pages/Loading";
import PostRedirect from "./pages/PostRedirect";

function App() {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div className="w-full h-screen mx-auto bg-main lg:max-w-screen-lg text-[#e6e6e6] ">
                <Sidebar />

                <Routes>
                    <Route path="/" element={user ? <Home /> : <LoginForm />} />
                    <Route
                        path="/signup"
                        element={user ? <Navigate to="/" /> : <SignUpForm />}
                    />
                    <Route
                        path="/editProfile"
                        element={user ? <EditProfile /> : <AccessDeniedPage />}
                    />
                    <Route
                        path="/posts/:id"
                        element={user ? <PostRedirect /> : <AccessDeniedPage />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            <ToastContainer />
        </>
    );
}

export default App;
