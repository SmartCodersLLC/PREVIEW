require("dotenv").config();
const { Validator } = require("jsonschema");

const send = require("../modules/send");
const { md5 } = require("../modules/utils");
const { loginSchema } = require("../schemas/AuthSchema");
const COOKIE = require("../cookies");
const { sql, poolPromise, getConnected, connectWithLogin } = require("../DB");

class AuthController {
  // Оброботчик запроса для авторизации
  async login(req, res) {
    try {
      const v = new Validator();
      const isValid = v.validate(req.body, loginSchema).valid;
      console.log(isValid, req.body);
      if (!isValid) {
        return send(res, false, `Неверный формат данных!`, true, 400);
      }
      const { login, password } = req.body;
      const cryptoPass = md5(password);

      const pool = getConnected()
        ? await poolPromise()
        : await connectWithLogin(login, cryptoPass);

      console.log(pool);
      // if connectWithLogin failed
      if (pool == false) {
        return send(res, false, `Неверный логин или пароль!`, true, 401);
      }

      const ID_PROG_ID = process.env.ID_PROG_ID;
      const { recordsets } = await pool
        .input("login", sql.NVarChar, login)
        .input("password", sql.NVarChar, cryptoPass)
        .input("prog", sql.VarChar, ID_PROG_ID)
        .execute(`SP_AVN_Login`);
      console.log(recordsets);

      if (
        recordsets &&
        recordsets.length &&
        recordsets[0] &&
        recordsets[0].length
      ) {
        const { id_avn_user, id_user, id_role } = recordsets[0][0];
        const isLogIn = await COOKIE.LOGIN(
          req,
          res,
          id_role,
          id_avn_user,
          id_user
        );
        if (isLogIn) {
          return send(
            res,
            { id_role, id_avn_user, id_user },
            `Добро пожаловать!`
          );
        }
      }
      return send(res, false, `Неверный логин или пароль!`, true, 401);
    } catch (err) {
      console.log(err);
      return send(res, false, `Не удалось войти, ${err.message}`, true, 500);
    }
  }
  // Оброботчик запроса для аутентификации
  async check(req, res) {
    try {
      const IsAuthenticated = await COOKIE.CHECK_PERM(req, res);
      if (IsAuthenticated) {
        const user = await COOKIE.GET_USER(req);
        return send(res, user, `Добро пожаловать!`);
      } else {
        return send(res, false, `Введите логин и пароль!`, true, 401);
      }
    } catch (err) {
      console.log(err);
      return send(res, false, `Не удалось войти, ${err.message}`, true, 500);
    }
  }
  // Оброботчик запроса для выхода
  async logout(req, res) {
    try {
      const IsLogOut = await COOKIE.LOGOUT(req, res);
      res.clearCookie(COOKIE.COOKIE_NAME);
      return send(res, true, `Вы вышли!`);
    } catch (err) {
      console.log(err);
      res.clearCookie(COOKIE.COOKIE_NAME);
      return send(res, false, `Не удалось выйти, ${err.message}`, true, 500);
    }
  }
}

module.exports = new AuthController();
