import { api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
const API_URL: string = import.meta.env.VITE_API_URL!;

export const getRolesPermissions = createAsyncThunk(
    "auth/getRolesPermissions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/roles`);
            return response.data.roles;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to get roles and permissions" }
            );
        }
    }
);
