import jwtDecode from "jwt-decode";
import { AUTH_LOGIN_SESSION_STORAGE_KEY } from "../config";
import User from "../models/User";
import { AuthState } from "./authSlice";


export const setInitialAuthState = (): AuthState => {
    const token = sessionStorage.getItem(AUTH_LOGIN_SESSION_STORAGE_KEY);
    let user = null;
    if (token) {
        const container: { user: User } = jwtDecode(token);
        user = container.user;
    }

    return {
        user,
        token
    }
}


export const handleToken = (state: AuthState, token: string) => {
    state.token = token;
    const container: { user: User } = jwtDecode(token);
    state.user = container.user;
    sessionStorage.setItem(AUTH_LOGIN_SESSION_STORAGE_KEY, token);
}