import { useAuthStore } from "../state/auth.store";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  return { user, isAuthenticated, isLoading, error, login, register, logout, fetchUser };
};
