import type { ReactNode, CSSProperties } from "react";

const primary = "oklch(0.55 0.22 262.1)";
const primaryLight = "oklch(0.55 0.22 262.1 / 0.12)";

interface AvatarProps {
  initials: string;
  size?: number;
}

interface BadgeProps {
  children: ReactNode;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function Avatar({ initials, size = 30 }: AvatarProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 8,
    background: primaryLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.38,
    fontWeight: 700,
    color: primary,
    flexShrink: 0,
  };

  return <div style={style}>{initials}</div>;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span
      style={{
        background: primaryLight,
        color: primary,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 9px",
        borderRadius: 20,
      }}
    >
      {children}
    </span>
  );
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  const style: CSSProperties = {
    width: 18,
    height: 18,
    borderRadius: 5,
    border: `2px solid ${checked ? primary : "#d1d5db"}`,
    background: checked ? primary : "#fff",
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  };

  return (
    <div onClick={onChange} style={style}>
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4l3 3 5-6"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
