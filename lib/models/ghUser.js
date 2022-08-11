const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor({ id, username, email, avatar }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
  }

  static async insert({ username, email, avatar }) {
    if (!username) throw new Error('username is required');
    const { rows } = await pool.query(`
      INSERT INTO gh_users
      (username, email, avatar)
      VALUES ($1, $2, $3)
      RETURNING *`, [username, email, avatar]);
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }

  static async findByUserName(username) {
    const { rows } = await pool.query(`
      SELECT * FROM gh_users
      WHERE username=$1`, [username]);
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }
};
