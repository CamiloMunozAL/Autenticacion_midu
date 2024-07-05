import dbLocal from "db-local";
import crypto from "crypto";
const { Schema } = new dbLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static create({ username, password }) {
    //1:validacion de username
    if (typeof username !== "string")
      throw new Error("username must be a string");
    if (username.length < 3) throw new Error("username must be at least 3");
    if (typeof password !== "string")
      throw new Error("password must be a string");
    if (password.length < 3) throw new Error("password must be at least 3");

    //2:validacion de existencia
    const user = User.findOne({ username });
    if (user) throw new Error("username already exists");

    const id = crypto.randomUUID();

    //3:creacion de usuario
    User.create({ _id: id, username, password }).save();

    return id;
  }
  static login({ username, password }) {}
}
