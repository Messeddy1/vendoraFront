import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", label: "🇬🇧 English" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "ar", label: "🇲🇦 العربية" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (value: string|null) => {
    if (!value) return;
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value);
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
  };

  return (
    <Select defaultValue={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className="w-auto min-w-30">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}