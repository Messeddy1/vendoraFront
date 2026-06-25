function FormField({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400">
                {label}
                {required && <span className="ml-1 text-red-400">*</span>}
            </label>
            {children}
        </div>
    );
}

export default FormField;
