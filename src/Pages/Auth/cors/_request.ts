import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios";
import { AxiosError } from 'axios';

// const API_URL: string = import.meta.env.VITE_API_URL!;
const BASE_URL: string = import.meta.env.VITE_BASE_URL!;

type LoginTypeProp = {
    email: string;
    password: string;
};

type RegisterTypeProp = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: LoginTypeProp, { rejectWithValue }) => {
        try {
            await api.get(`${BASE_URL}/sanctum/csrf-cookie`);
            const response = await api.post(`${BASE_URL}/login`, credentials);
            return response.data.user;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Login failed" }
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await api.get(`${BASE_URL}/sanctum/csrf-cookie`);
            await api.post(`${BASE_URL}/logout`);
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Logout failed" }
            );
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (credentials: RegisterTypeProp, { rejectWithValue }) => {
        try {
            await api.get(`${BASE_URL}/sanctum/csrf-cookie`);
            const response = await api.post(`${BASE_URL}/register`, credentials);
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Registration failed" }
            );
        }
    }
);

// get user info
export const getUserInfo = createAsyncThunk(
    "auth/getUserInfo",
    async (_, { rejectWithValue }) => {
        try {
            await api.get(`${BASE_URL}/sanctum/csrf-cookie`);
            const response = await api.get(`${BASE_URL}/api/user`);
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(
                (error as AxiosError).response?.data || { message: "Failed to get user info" }
            );
        }
    }
);