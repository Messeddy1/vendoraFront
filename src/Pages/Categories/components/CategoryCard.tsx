import type { Category } from "../core/Module";

interface CardProps {
    category: Category
    ;
    onEdit: () => void;
    onDelete: () => void;
}
function CategoryCard({ category, onEdit, onDelete }: CardProps) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-white/8 bg-slate-800/60 transition duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-black/40">
            {/* Image */}
            {category.image ? (
                <img
                    src={category.image}
                    alt={category.name}
                    className="h-36 w-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
            ) : (
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-violet-950 to-indigo-900">
                    <span className="text-4xl">📦</span>
                </div>
            )}

            {/* Body */}
            <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="font-mono text-xs text-violet-300">/{category.slug}</p>
                {category.description && (
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-100">
                        {category.description}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-400 px-4 py-3">
                <span className="text-xs text-gray-100">
                    {new Date(category.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
                <div className="flex gap-1">
                    <button
                        id={`cat-edit-${category.id}`}
                        onClick={onEdit}
                        aria-label={`Edit ${category.name}`}
                        className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-500/15 hover:text-gray-300"
                    >
                        ✏️
                    </button>
                    <button
                        id={`cat-delete-${category.id}`}
                        onClick={onDelete}
                        aria-label={`Delete ${category.name}`}
                        className="rounded-md p-1.5 text-gray-500 transition hover:bg-red-500/15 hover:text-red-400"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </article>
    );
}
export default CategoryCard;