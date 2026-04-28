import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import JSON files
import en from "./en/translation.json";
import fr from "./fr/translation.json";
import ar from "./ar/translation.json";

const resources = {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
};
const savedLang = localStorage.getItem("lang") || "en";


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLang,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;