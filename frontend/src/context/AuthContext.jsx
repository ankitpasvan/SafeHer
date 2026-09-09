import { createContext, useEffect, useState, useCallback } from "react";
import { loginUser, registerUser, googleLoginApi, fetchMe } from "../services/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // On first load, if a token exists, verify it and restore the session
  useEffect(() => {
    const token = localStorage.getItem("safeher_token");
    const cachedUser = localStorage.getItem("safeher_user");

    if (!token) {
      setLoading(false);
      return;
    }

    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
        // ignore malformed cache
      }
    }

    fetchMe()
      .then((me) => {
        setUser(me);
        localStorage.setItem("safeher_user", JSON.stringify(me));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("safeher_token");
        localStorage.removeItem("safeher_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSession = (data) => {
    const { token, ...userInfo } = data;
    localStorage.setItem("safeher_token", token);
    localStorage.setItem("safeher_user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const login = useCallback(async (email, password) => {
    setAuthError(null);
    try {
      const data = await loginUser({ email, password });
      persistSession(data);
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  }, []);

  const register = useCallback(async (payload) => {
    setAuthError(null);
    try {
      const data = await registerUser(payload);
      persistSession(data);
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  }, []);

  const loginWithGoogle = useCallback(async (customProfile) => {
    setAuthError(null);
    try {
      const data = await googleLoginApi(
        customProfile || {
          name: "Ankit",
          email: "ankit@safeher.app",
          avatar: "/user-avatar.jpg",
        },
      );
      persistSession(data);
      return data;
    } catch (_) {
      // Graceful offline fallback
      const fallbackUser = {
        _id: "google-local-user",
        name: "Ankit",
        email: "ankit@safeher.app",
        role: "user",
        token: "safeher-offline-demo-token",
      };
      persistSession(fallbackUser);
      return fallbackUser;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("safeher_token");
    localStorage.removeItem("safeher_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, authError, login, register, loginWithGoogle, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
