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