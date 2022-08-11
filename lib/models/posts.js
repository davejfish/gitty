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
};
