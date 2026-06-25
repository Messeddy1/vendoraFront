export const Spinner = ({ size = "sm" }: { size?: "sm" | "lg" }) =>
    size === "lg" ? (
        <div className="mx-auto mt-16 h-10 w-10 animate-spin rounded-full border-[3px] border-violet-900 border-t-violet-500" />
    ) : (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
    );
