import { login, register, getMe, logout } from "../services/auth.api"
import { AuthContext } from "../auth.context";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, loading, setUser, setLoading } = context;
    async function handleRegister({ username, email, password }) {
        setLoading(true);
        const data = await register({ username, email, password });
        setUser(data.user);
        setLoading(false);
    }
    async function handleLogin({ username, email, password }) {
        setLoading(true);
        const data = await login({ email, username, password });
        setUser(data.user);
        setLoading(false);
    }
    async function handleGetMe() {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
    }
    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}