const i18next = require("i18next");
const Backend = require("i18next-node-fs-backend");
const i18nextMiddleware = require("i18next-express-middleware");

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + "..\\locales\\{{lng}}\\{{ns}}.json",
    },
    // defaultNS: "translation",
    detection: {
        order: ["querystring", "cookie"],
        cache: ["cookie"],
        lookupQuerystring: "lang",
        lookupCookie: "lang",
      },
    fallbackLng: "ru",
    preload: ["ru"],
  });

const translator = i18nextMiddleware.handle(i18next);

module.exports = translator;
