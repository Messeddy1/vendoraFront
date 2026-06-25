
function StatCard({ value, label }: { value: number; label: string }) {
    return (
        <div className="rounded-xl border border-gray-400 px-5 py-4">
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="mt-0.5 text-xs text-gray-500">{label}</div>
        </div>
    );
}
export default StatCard;