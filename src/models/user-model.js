const db = require('../config/db.config.js');
const { hashSync } = require("bcryptjs");
const TABLE = 'users';


class UserModel {
  static async findById(id = 0) {
    const SQL = `SELECT * FROM ${TABLE} WHERE _id = $1`;
    const { rows } = await db.query(SQL, [id]);
    const [user] = rows;

    return user;
  }



  static async findByEmail(email) {
    const SQL = `SELECT * FROM ${TABLE} WHERE email = $1`;
    const { rows } = await db.query(SQL, [email]);
    const [user] = rows;

    return user;
  }



  static async findMostRecent() {
    const SQL = `SELECT * FROM ${TABLE} ORDER BY _id DESC LIMIT 1`;
    const { rows } = await db.query(SQL);
    const [user] = rows;

    return user;
  }



  static async register({ name, email, password }) {
    password = hashSync(password, 12);

    const SQL = `INSERT INTO ${TABLE} (name, email, password) VALUES ($1, $2, $3)`;
    await db.query(SQL, [name, email.toLowerCase(), password]);


    const user = await UserModel.findMostRecent();
    return user;
  }
}

module.exports = UserModel;
