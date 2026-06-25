// ─────────────────────────────────────────────────────────────────────────────
// CategoryModal — Create / Edit
// ─────────────────────────────────────────────────────────────────────────────

import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import type { Category, CreateCategoryPayload } from "../core/Module";
import { ACTIONS, STATUS } from "@/types/Types";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../core/_requests";
import FormField from "./FormField";
import { FieldError } from "./FieldError";
import { Spinner } from "./Spiner";

interface ModalProps {
    editing: Category | null;
    onClose: () => void;
}

function CategoryModal({ editing, onClose }: ModalProps) {
    const dispatch = useAppDispatch();
    const { status, action, fieldErrors, error } = useAppSelector(
        (s) => s.categories
    );

    const isBusy =
        status === STATUS.PENDING &&
        (action === ACTIONS.CREATE || action === ACTIONS.UPDATE);

    const [form, setForm] = useState<CreateCategoryPayload>({
        name: editing?.name ?? "",
        description: editing?.description ?? "",
        image: editing?.image ?? "",
    });

    useEffect(() => {
        setForm({
            name: editing?.name ?? "",
            description: editing?.description ?? "",
            image: editing?.image ?? "",
        });
    }, [editing]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const thunk = editing
            ? dispatch(updateCategory({ id: editing.id, ...form }))
            : dispatch(createCategory(form));
        const result = await thunk;
        if (result.meta.requestStatus === "fulfilled") onClose();
    };

    const inputClass =
        "w-full rounded-lg border border-white/8 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl border border-white/8 bg-slate-900 shadow-2xl animate-in slide-in-from-bottom-4 duration-200"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                    <h2 className="text-base font-semibold text-slate-100">
                        {editing ? "Edit Category" : "New Category"}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
                    >
                        ✕
                    </button>
                </div>

                {/* Global error */}
                {error && action !== ACTIONS.READ && (
                    <div className="mx-6 mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6" noValidate>
                    <FormField label="Name" required>
                        <input
                            id="cat-name"
                            name="name"
                            type="text"
                            className={inputClass}
                            placeholder="e.g. Electronics"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <FieldError errors={fieldErrors} field="name" />
                    </FormField>

                    <FormField label="Description">
                        <textarea
                            id="cat-description"
                            name="description"
                            className={`${inputClass} resize-none`}
                            placeholder="Short description…"
                            value={form.description ?? ""}
                            onChange={handleChange}
                            rows={3}
                        />
                        <FieldError errors={fieldErrors} field="description" />
                    </FormField>

                    <FormField label="Image URL">
                        <input
                            id="cat-image"
                            name="image"
                            type="text"
                            className={inputClass}
                            placeholder="https://example.com/image.png"
                            value={form.image ?? ""}
                            onChange={handleChange}
                        />
                        <FieldError errors={fieldErrors} field="image" />
                    </FormField>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-1">
                        <button
                            type="button"
                            id="cat-cancel-btn"
                            onClick={onClose}
                            className="rounded-lg border border-white/8 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id={editing ? "cat-update-btn" : "cat-create-btn"}
                            disabled={isBusy}
                            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isBusy ? <Spinner /> : editing ? "Save Changes" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryModal;
