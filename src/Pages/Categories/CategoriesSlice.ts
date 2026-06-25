import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ACTIONS, STATUS } from "@/types/Types";
import type { Category } from "./core/Module";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./core/_requests";

// ─────────────────────────────────────────────────────────────────────────────
// State shape
// ─────────────────────────────────────────────────────────────────────────────
interface CategoriesState {
  status: (typeof STATUS)[keyof typeof STATUS];
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  error: string | null;
  fieldErrors: Record<string, string[]> | null;
  data: Category[] | null;
}

const initialState: CategoriesState = {
  status: STATUS.IDLE,
  action: ACTIONS.IDLE,
  error: null,
  fieldErrors: null,
  data: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers (reduces repetition across cases)
// ─────────────────────────────────────────────────────────────────────────────
const setPending = (
  state: CategoriesState,
  action: (typeof ACTIONS)[keyof typeof ACTIONS]
) => {
  state.status = STATUS.PENDING;
  state.action = action;
  state.error = null;
  state.fieldErrors = null;
};

const setRejected = (state: CategoriesState, payload: unknown) => {
  state.status = STATUS.REJECTED;
  state.error =
    (payload as { message: string }).message || "Something went wrong";
  state.fieldErrors =
    (payload as { errors: Record<string, string[]> }).errors || null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────────────────────────────────────
const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Allows manually clearing errors (e.g. when a modal closes)
    clearErrors: (state) => {
      state.error = null;
      state.fieldErrors = null;
    },
  },
  extraReducers(builder) {
    // ── GET ALL ──────────────────────────────────────────────────────────────
    builder
      .addCase(getCategories.pending, (state) => {
        setPending(state, ACTIONS.READ);
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.READ;
          state.data = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        setRejected(state, action.payload);
      });

    // ── CREATE ───────────────────────────────────────────────────────────────
    builder
      .addCase(createCategory.pending, (state) => {
        setPending(state, ACTIONS.CREATE);
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.CREATE;
          // Prepend the new category to the list
          state.data = [action.payload, ...(state.data ?? [])];
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        setRejected(state, action.payload);
      });

    // ── UPDATE ───────────────────────────────────────────────────────────────
    builder
      .addCase(updateCategory.pending, (state) => {
        setPending(state, ACTIONS.UPDATE);
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.UPDATE;
          // Replace the updated record in the list
          state.data =
            state.data?.map((cat) =>
              cat.id === action.payload.id ? action.payload : cat
            ) ?? null;
        }
      )
      .addCase(updateCategory.rejected, (state, action) => {
        setRejected(state, action.payload);
      });

    // ── DELETE ───────────────────────────────────────────────────────────────
    builder
      .addCase(deleteCategory.pending, (state) => {
        setPending(state, ACTIONS.DELETE);
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.DELETE;
          // Remove the deleted record from the list
          state.data =
            state.data?.filter((cat) => cat.id !== action.payload) ?? null;
        }
      )
      .addCase(deleteCategory.rejected, (state, action) => {
        setRejected(state, action.payload);
      });
  },
});

export const { clearErrors } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
