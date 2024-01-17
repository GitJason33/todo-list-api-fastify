const db = require('../config/db.config.js');
const TABLE = "tasks";


class TaskModel {
  static async findAllForUser(user_id){
    // const PAGE_LIMIT = 20;
    // const PAGE_START_IDX = (page - 1) * PAGE_LIMIT;

    const SQL = `
      SELECT * FROM ${TABLE} WHERE user_id = $1 
      ORDER BY done ASC, 
      CASE priority 
        WHEN 'high' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'low' THEN 3
      END ASC`;
    const {rows: todos} = await db.query(SQL, [user_id]);

    return todos;
  }



  static async findExamples(){
    const SQL = `SELECT * FROM ${TABLE} WHERE _id >= 1 AND _id <= 6`;
    const {rows: examples} = await db.query(SQL);

    return examples;
  }



  static async findById(id, user_id){
    const SQL = `SELECT * FROM ${TABLE} WHERE _id = $1 AND user_id = $2`;
    const {rows} = await db.query(SQL, [id, user_id]);
    const [todo] = rows;

    return todo;
  }



  static async findMostRecent(){
    const SQL = `SELECT * FROM ${TABLE} ORDER BY _id DESC LIMIT 1`;
    const {rows} = await db.query(SQL);
    const [todo] = rows;

    return todo;
  }



  static async create({ user_id, title, priority = "low", description, due_date }){
    const SQL = `INSERT INTO ${TABLE} (user_id, title, description, priority, due_date) VALUES ($1, $2, $3, $4, $5)`;
    await db.query(SQL, [user_id, title, description, priority, due_date]);


    const todo = await TaskModel.findMostRecent();
    return todo;
  }



  static async done({ id, user_id }){
    const SQL = `UPDATE ${TABLE} SET done = true WHERE _id = $1 AND user_id = $2`;
    await db.query(SQL, [id, user_id]);
  }



  /**
   * data array must be in this order: [title, description, priority, due_date]
   */
  static async edit({ id, user_id, data }){
    const [title, description, priority, due_date] = data;

    let i = 1;
    let SQL = `\
UPDATE ${TABLE} SET \
${title === undefined ? `` : `title = $${i++},`}\
${description === undefined ? `` : `description = $${i++},`}\
${priority === undefined ? `` : `priority = $${i++},`}\
${due_date === undefined ? `` : `due_date = $${i++},`}\
`;

    if(SQL.indexOf(",") === -1) return;
    else SQL = `${SQL.trim().slice(0, SQL.length - 1)} WHERE _id = $${i++} AND user_id = $${i}`;


    await db.query(SQL, [
      ...data.filter(input => input !== undefined),
      id,
      user_id
    ]);
  }



  static async deleteById({ id, user_id }){
    const SQL = `DELETE FROM ${TABLE} WHERE _id = $1 AND user_id = $2`;
    await db.query(SQL, [id, user_id]);
  }
}


module.exports = TaskModel;