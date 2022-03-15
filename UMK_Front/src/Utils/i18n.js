import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// файлы языков
import commonTranslationRU from "../Locales/ru/common.json";
import commonTranslationKG from "../Locales/kg/common.json";
import commonTranslationEN from "../Locales/en/common.json";

const resources = {
  // cm - namepsace, https://www.i18next.com/principles/namespaces
  ru: {
    cm: commonTranslationRU,
  },
  kg: {
    cm: commonTranslationKG,
  },
  en: {
    cm: commonTranslationEN,
  },
};

i18n
  // Подключение бэкенда i18next
  .use(Backend)
  // Автоматическое определение языка
  .use(LanguageDetector)
  // модуль инициализации
  .use(initReactI18next)
  .init({
    resources,
    // Стандартный язык
    fallbackLng: "ru",
    debug: false,
    defaultNS: "cm",
    // Распознавание и кэширование языковых кук
    detection: {
      order: ["querystring", "cookie", "localStorage"],
      cache: ["cookie", "localStorage"],
      lookupQuerystring: "lang",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
