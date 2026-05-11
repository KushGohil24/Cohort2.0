import { create } from "zustand";
import { authService } from "../service/auth.service";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login(email, password);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.register(formData);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const data = await authService.getMe();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },
}));
