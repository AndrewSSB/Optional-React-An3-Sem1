import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};

type TokenProps = {
  accessToken: string;
};

type AuthContext = {
  checkPassword: (password: string, confirmPassword: string) => boolean;
  register: (
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  login: (email: string, password: string) => void;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  function checkPassword(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  async function register(
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (!firstName || !email || !password || !confirmPassword) {
      console.log("all fields must be completed");
      return;
    }
    if (!checkPassword(password, confirmPassword)) {
      console.log("password doesnt match");
      return;
    }

    const registerModel = {
      name: firstName,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "https://localhost:7232/api/auth/register",
        registerModel
      );

      setAccessToken(res.data.accessToken);
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  async function login(email: string, password: string) {
    if (!email || !password) {
      console.log("all fields must be completed");
      return;
    }

    const loginModel = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "https://localhost:7232/api/auth/login",
        loginModel
      );

      setAccessToken(res.data.accessToken);
      localStorage.setItem("accessToken", accessToken);
      console.log(accessToken);
      navigate("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        checkPassword,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
