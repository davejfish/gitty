const pool = require('../utils/pool');

module.exports = class Post {
  id;
  userID;
  content;

  constructor({ id, user_id, content }) {
    this.id = id;
    this.userID = user_id;
    this.content = content;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM posts_users
    `);
    return rows.map(row => new Post(row));
  }

  static async insert({ user_id, content }) {
    const { rows } = await pool.query(`
      INSERT INTO posts_users (user_id, content)
      VALUES ($1, $2)
      RETURNING *`, [user_id, content]);
    return new Post(rows[0]);
  }
};
