import { api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
const API_URL: string = import.meta.env.VITE_API_URL!;
// const BASE_URL: string = import.meta.env.VITE_BASE_URL!;

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (user: {
        name: string;
        email: string;
        id: number;
    }, { rejectWithValue }) => {
        const { name, email, id } = user;
        try {
            const response = await api.put(`${API_URL}/user/${id}`, {
                name,
                email,
            });
            return response.data.user;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to get user info" }
            );
        }
    }
);
export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async (data: { currentPassword: string; newPassword: string; confirmPassword: string }, { rejectWithValue }) => {
        const { currentPassword, newPassword, confirmPassword } = data;
        try {
            const response = await api.put(`${API_URL}/user/update-password`, {
                password: newPassword,
                current_password:currentPassword,
                password_confirmation:confirmPassword
            });
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to get user info" }
            );
        }
    }
);

export const getuserSessions = createAsyncThunk(
    "auth/getSessions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/user/sessions`);
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to get user sessions" }
            );
        }
    }
);


export const logoutSession = createAsyncThunk(
    "auth/logoutSession",
    async (sessionId:string, { rejectWithValue }) => {

        try {
            const response = await api.post(`${API_URL}/user/sessions/logout/${sessionId}`);
            return response.data.sessions;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to logout session" }
            );
        }
    }
);
export const logoutAllSession = createAsyncThunk(
    "auth/logoutAllSession",
    async (_, { rejectWithValue }) => {

        try {
            const response = await api.post(`${API_URL}/user/sessions/logout`);
            return response.data.sessions;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to logout session" }
            );
        }
    }
);