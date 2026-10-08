import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import {
  getCategories,
  deleteCategory,
} from "./core/_requests";
import { clearErrors } from "./CategoriesSlice";
import type { Category } from "./core/Module";
import { STATUS, ACTIONS } from "@/types/Types";
import DeleteDialog from "./components/DeleteDialog";
import CategoryModal from "./components/CategoryModal";
import StatCard from "./components/StatCard";
import { Spinner } from "./components/Spiner";
import CategoryCard from "./components/CategoryCard";




export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const { data: categories, status, action, error } = useAppSelector(
    (s) => s.categories
  );

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");

  const isLoadingList = status === STATUS.PENDING && action === ACTIONS.READ;
  const isDeletingBusy = status === STATUS.PENDING && action === ACTIONS.DELETE;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const openCreate = () => {
    dispatch(clearErrors());
    setEditingCategory(null);
    setShowModal(true);
  };

  const openEdit = (cat: Category) => {
    dispatch(clearErrors());
    setEditingCategory(cat);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;
    const result = await dispatch(deleteCategory(deletingCategory.id));
    if (result.meta.requestStatus === "fulfilled") setDeletingCategory(null);
  };

  const filtered = (categories ?? []).filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      (cat.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen  p-6 text-slate-100 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Categories
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Manage product categories — superadmin only
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                🔍
              </span>
              <input
                id="cat-search"
                type="text"
                placeholder="Search categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search categories"
                className="w-56 rounded-lg border border-white/8 bg-slate-800 py-2 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25"
              />
            </div>

            {/* Create */}
            <button
              id="cat-create-open-btn"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-900/40 transition hover:bg-violet-500 active:scale-95"
            >
              + New Category
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="mb-6 flex gap-3">
          <StatCard value={categories?.length ?? 0} label="Total categories" />
          <StatCard value={filtered.length} label="Matching search" />
        </div>

        {/* ── Read error ── */}
        {error && action === ACTIONS.READ && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* ── Content ── */}
        {isLoadingList ? (
          <Spinner size="lg" />
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <span className="mb-3 block text-5xl">📦</span>
            <p className="text-sm">
              {search
                ? `No categories match "${search}"`
                : "No categories yet — create your first one."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {filtered.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onEdit={() => openEdit(cat)}
                onDelete={() => setDeletingCategory(cat)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {showModal && (
        <CategoryModal
          key={editingCategory?.id ?? "create"}
          editing={editingCategory}
          onClose={closeModal}
        />
      )}
      {deletingCategory && (
        <DeleteDialog
          category={deletingCategory}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingCategory(null)}
          isBusy={isDeletingBusy}
        />
      )}
    </div>
  );
}