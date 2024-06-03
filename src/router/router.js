import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, redirect } from "react-router-dom";
import { AuthLogin } from "./pages/auth/login/app";
import { Error404 } from "./pages/error/app";
import { AuthRegister } from "./pages/auth/register/app";
import { AuthRecoveryPass } from "./pages/auth/reset_pass/app";
import { AuthUserCtxProvider, useAuthUser } from "../provider/context";
import { useEffect } from "react";
import { DashBoard } from "./pages/dashboard/app";

const RoutePrivate = ({ privElement }) => {
    const navigate = useNavigate();
    const { user, loading } = useAuthUser()

    useEffect(() => {
        if (!loading && !user) {
            navigate('auth/login', { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="bg-blueOcean"></div>
    }

    if (user) {
        return (privElement)
    }

    return null;
};

export const AppRoutes = () => {
    return (
        <Router>
            <AuthUserCtxProvider>
                <Routes>
                    <Route path="/" element={<RoutePrivate privElement={<DashBoard></DashBoard>} />} />
                    <Route path="/auth/login" element={< AuthLogin />} />
                    <Route path="/auth/register" element={<AuthRegister />} />
                    <Route path="/auth/recover-pass" element={<AuthRecoveryPass />} />
                    <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </AuthUserCtxProvider>
        </Router>
    );
};
