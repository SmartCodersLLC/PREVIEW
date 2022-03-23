const i18next = require("i18next");
const Backend = require("i18next-node-fs-backend");
const middleware = require("i18next-http-middleware");

const commonTranslationRU = require("../locales/ru/translation.json");
const commonTranslationKG = require("../locales/kg/translation.json");
const commonTranslationEN = require("../locales/en/translation.json");

const resources = {
  ru: {
    translation: commonTranslationRU,
  },
  kg: {
    translation: commonTranslationKG,
  },
  en: {
    translation: commonTranslationEN,
  },
};

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    resources,
    defaultNS: "translation",
    detection: {
      order: ["querystring", "cookie"],
      cache: ["cookie"],
      lookupQuerystring: "lang",
      lookupCookie: "lang",
    },
    fallbackLng: "ru",
    preload: ["ru"],
  });

const translator = middleware.handle(i18next);

module.exports = translator;
