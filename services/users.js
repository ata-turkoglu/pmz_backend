const db = require("../db");
const bcrypt = require("bcryptjs");

module.exports = {
  getAll: () => {
    return db("users")
      .select(
        "id",
        "username",
        "role",
        "status",
        "enable_reset",
        "last_login",
        "signup_date"
      )
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },

  updateUser: (data) => {
    return db("users")
      .update({
        username: data.username,
        role: data.role,
        status: data.status,
        enable_reset: data.enable_reset,
      })
      .where({ id: data.id })
      .returning("id")
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },

  signin: async (data) => {
    const { username, password } = data;
    if (!username || !password) {
      return Promise.resolve({ error: "incorrect submission" });
    }

    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    let obj = {
      username,
      password: hash,
      role: null,
      status: false,
      signup_date: new Date(),
      last_login: new Date(),
    };

    return db("users")
      .insert(obj)
      .returning("id")
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },

  login: (data) => {
    const { username, password } = data;

    return db("users")
      .select("id", "username", "password", "role", "status")
      .where({ username })
      .then(async (result) => {
        if (result.length <= 0) {
          return { error: "Kullanıcı yok" };
        } else {
          let matched = await bcrypt.compare(password, result[0].password);

          if (!result[0].status) {
            return { error: "Kullanıcı aktif değil" };
          } else if (matched) {
            return {
              id: result[0].id,
              username: result[0].username,
              role: result[0].role,
            };
          } else if (!matched) {
            return { error: "Yanlış şifre" };
          } else {
            return { error: "Bilinmeyen hata" };
          }
        }
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },

  passwordReset: (data) => {
    const { username, password } = data;
    return db("users")
      .select("enable_reset as enable")
      .where({ username })
      .then(async (result) => {
        if (result.length <= 0) {
          return {
            error: "Kullanıcı bulunamadı",
          };
        } else if (result[0].enable) {
          const salt = await bcrypt.genSalt(10);
          let hash = await bcrypt.hash(password, salt);

          return db("users")
            .update({ password: hash })
            .where({ username })
            .returning("id")
            .then((result) => {
              if (result[0].id) {
                return db("users")
                  .update({ enable_reset: false })
                  .where({ username })
                  .returning("id");
              } else {
                return {
                  error: "Şifre değiştirme hatası",
                };
              }
            });
        } else if (!result[0].enable) {
          return {
            error: "Şifre değiştirme izniniz yok. Yöneticinize bilgi verin.",
          };
        } else {
          return {
            error: "password reset error",
          };
        }
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },
};
