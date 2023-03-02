const db = require("../db");
const bcrypt = require("bcryptjs");

module.exports = {
  getAll: () => {
    return db("users")
      .select("id", "username", "role", "last_login", "signup_date")
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },
  updateUser: (data) => {
    return db("users")
      .update({
        id: data.id,
        username: data.username,
        role: data.role,
      })
      .where({ id: data.id })
      .then((result) => {
        return result;
      })
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
      .then((result) => {
        return result;
      })
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
      .then((result) => {
        if (result.length <= 0) {
          return { error: "Kullanıcı yok" };
        } else if (!result[0].status) {
          return { error: "Kullanıcı aktif değil" };
        } else if (bcrypt.compare(password, result[0].password)) {
          return {
            id: result[0].id,
            username: result[0].username,
            role: result[0].role,
          };
        } else if (!bcrypt.compare(password, result[0].password)) {
          return { error: "Yanlış şifre" };
        } else {
          return { error: "Bilinmeyen hata" };
        }
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  },
};
