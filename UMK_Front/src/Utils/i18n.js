import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// файлы языков
import commonTranslationRU from "../Locales/ru/common.json";
import commonTranslationKG from "../Locales/kg/common.json";
import commonTranslationEN from "../Locales/en/common.json";
import umkTranslationRU from "../Locales/ru/umk.json";
import umkTranslationKG from "../Locales/kg/umk.json";
import umkTranslationEN from "../Locales/en/umk.json";

const resources = {
  // cm - namepsace, https://www.i18next.com/principles/namespaces
  ru: {
    cm: commonTranslationRU,
    umk: umkTranslationRU,
  },
  kg: {
    cm: commonTranslationKG,
    umk: umkTranslationKG,
  },
  en: {
    cm: commonTranslationEN,
    umk: umkTranslationEN,
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
