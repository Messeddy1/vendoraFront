export const FieldError = ({
    errors,
    field,
}: {
    errors: Record<string, string[]> | null;
    field: string;
}) =>
    errors?.[field] ? (
        <p className="mt-1 text-xs text-red-400">{errors[field][0]}</p>
    ) : null;

