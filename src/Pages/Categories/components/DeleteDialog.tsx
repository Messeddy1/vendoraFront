import type { Category } from "../core/Module";
import { Spinner } from "./Spiner";

interface DeleteDialogProps {
    category: Category;
    onConfirm: () => void;
    onCancel: () => void;
    isBusy: boolean;
}

function DeleteDialog({ category, onConfirm, onCancel, isBusy }: DeleteDialogProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm rounded-2xl border border-white/8 bg-slate-900 p-8 text-center shadow-2xl animate-in slide-in-from-bottom-4 duration-200"
                onClick={(e) => e.stopPropagation()}
                role="alertdialog"
                aria-modal="true"
            >
                <div className="mb-3 text-4xl">🗑️</div>
                <h3 className="mb-1 text-base font-semibold text-slate-100">Delete Category</h3>
                <p className="mb-6 text-sm text-slate-400">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-slate-100">{category.name}</span>?
                    This cannot be undone.
                </p>
                <div className="flex justify-center gap-2">
                    <button
                        id="cat-delete-cancel-btn"
                        onClick={onCancel}
                        className="rounded-lg border border-white/8 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
                    >
                        Cancel
                    </button>
                    <button
                        id="cat-delete-confirm-btn"
                        onClick={onConfirm}
                        disabled={isBusy}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isBusy ? <Spinner /> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteDialog;