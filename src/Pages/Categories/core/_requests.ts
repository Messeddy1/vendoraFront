import { api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "./Module";

// Base URL from env (e.g. http://localhost:8000/api)
const API_URL: string = import.meta.env.VITE_API_URL!;

// ─────────────────────────────────────────────────────────────────────────────
// GET ALL  —  GET /api/categories
// ─────────────────────────────────────────────────────────────────────────────
export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/categories`);
      return response.data.categories;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as AxiosError).response?.data || {
          message: "Failed to fetch categories",
        }
      );
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// CREATE  —  POST /api/categories
// ─────────────────────────────────────────────────────────────────────────────
export const createCategory = createAsyncThunk(
  "categories/create",
  async (payload: CreateCategoryPayload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/categories`, payload);
      return response.data.category;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as AxiosError).response?.data || {
          message: "Failed to create category",
        }
      );
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE  —  PUT /api/categories/{id}
// ─────────────────────────────────────────────────────────────────────────────
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, ...payload }: UpdateCategoryPayload, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/categories/${id}`, payload);
      return response.data.category;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as AxiosError).response?.data || {
          message: "Failed to update category",
        }
      );
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// DELETE  —  DELETE /api/categories/{id}
// ─────────────────────────────────────────────────────────────────────────────
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/categories/${id}`);
      return id; // return the deleted ID so the slice can remove it from state
    } catch (error: unknown) {
      return rejectWithValue(
        (error as AxiosError).response?.data || {
          message: "Failed to delete category",
        }
      );
    }
  }
);
