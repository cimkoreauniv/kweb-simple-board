const { runQuery } = require("../lib/database");

const formatDate = (date) => {
  const yr = date.getFullYear();
  const mon = date.getMonth() + 1;
  const dt = date.getDate();
  const hrs = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();
  return `${yr}. ${mon}. ${dt} ${hrs}:${mins}:${secs}`;
};

const replaceDate = (article) => {
  if (article) {
    article.createdAt = formatDate(article.createdAt);
    article.lastUpdated = formatDate(article.lastUpdated);
  }
  return article;
};

const getList = async (start, count) => {
  const sql = `SELECT articles.id AS id, title, content, created_at AS createdAt,
    last_updated AS lastUpdated, display_name as displayName
    FROM articles INNER JOIN users ON articles.author=users.id
    AND articles.is_active = 1 AND articles.is_deleted=0
    ORDER BY articles.id DESC LIMIT ?, ?`;

  const result = await runQuery(sql, [start, count]);
  return result.map(replaceDate);
};

const getTotalCount = async () => {
  const sql = `SELECT Count(*) AS count FROM articles WHERE is_active=1 AND is_deleted=0`;
  const result = await runQuery(sql);
  return result[0].count;
};

const getById = async (id) => {
  const sql = `SELECT articles.id AS id, title, content, created_at AS createdAt,
  last_updated AS lastUpdated, display_name as displayName
  FROM articles INNER JOIN users ON articles.author=users.id
  AND articles.is_active = 1 AND articles.is_deleted=0 AND articles.id=?`;

  const result = await runQuery(sql, [id]);
  return result[0];
};

const getByIdAndAuthor = async (id, author) => {
  const sql = `SELECT articles.id AS id, title, content, created_at AS createdAt,
  last_updated AS lastUpdated, display_name as displayName
  FROM articles INNER JOIN users ON articles.author=users.id
  AND articles.is_active = 1 AND articles.is_deleted=0 AND articles.id=? AND users.id = ?`;

  const result = await runQuery(sql, [id, author.id]);
  return result[0];
};

const create = async (title, content, author) => {
  const sql = `INSERT INTO articles (title, content, author) VALUES (?, ?, ?)`;
  const result = await runQuery(sql, [title, content, author.id]);
  return result.insertId;
};

const update = async (id, title, content) => {
  const sql = `UPDATE aritcles SET title=?, content=? WHERE id=?`;
  await runQuery(sql, [title, content, id]);
};

const remove = async (id) => {
  const sql = `UPDATE articles SET is_deleted=1 WHERE id=?`;
  await runQuery(sql, [id]);
};

module.exports = {
  getList,
  getTotalCount,
  getById,
  getByIdAndAuthor,
  create,
  update,
  remove,
};
