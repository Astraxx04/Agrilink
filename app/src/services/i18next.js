import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import en from "../locales/en.json";
import hi from "../locales/hi.json";

const languageResources = {
    en: { translation: en },
    hi: { translation: hi },
}

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: languageResources
});

export default i18n;