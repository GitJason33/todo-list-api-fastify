const TaskModel = require("../models/task-model");
const { TaskValidator } = require('../tools/Validator');
const { toInt } = require("../tools/functions.js");


class TaskController {
  /**
   * route:  GET /task/all?page=n
   * desc:   retrieve all user todos
   * access: PRIVATE
   */
  static async getTodos(req, reply) {
    const todos = await TaskModel.findAllForUser(req.user['_id']);

    reply.send(todos);
  }



  /**
   * route:  GET /task/examples
   * desc:   retrieve sample todos for home page
   * access: PUBLIC
   */
  static async getExamples(req, reply) {
    const todos = await TaskModel.findExamples();

    reply.send(todos);
  }



  /**
   * route:  GET /task/:id
   * desc:   retrieve a task by its id
   * access: PRIVATE
   */
  static async getTodo(req, reply) {
    const todo_id = toInt(req.params.id);
    let user_id = req.user['_id'];


    // example todos
    if (todo_id >= 1 && todo_id <= 6)
      user_id = 1;


    const todo = await TaskModel.findById(todo_id, user_id);
    TaskValidator.notFound(todo);

    reply.send(todo);
  }



  /**
   * route:  POST /task
   * desc:   create a new user task
   * access: PRIVATE
   */
  static async createTodo(req, reply) {
    const {title, description, priority, due_date} = req.body;
    TaskValidator.todoData({ title, priority });


    const todo = await TaskModel.create({
      user_id: req.user['_id'],
      title,
      description,
      priority,
      due_date
    });


    reply.status(201).send(todo);
  }



  /**
   * route:  PUT /task/done/:id
   * desc:   mark a task as complete
   * access: PRIVATE
   */
  static async markAsDone(req, reply) {
    const todo_id = toInt(req.params.id);
    await TaskModel.done({ id: todo_id, user_id: req.user['_id'] });

    reply.status(202).send({ msg: "todo marked as done!" });
  }



  /**
   * route:  PUT /task/:id
   * desc:   edit a user task
   * access: PRIVATE
   */
  static async editTodo (req, reply) {
    const todo_id = toInt(req.params.id);
    const {title, description, priority, due_date} = req.body;


    await TaskModel.edit({
      id: todo_id,
      user_id: req.user['_id'],
      data: [title, description, priority, due_date]
    });


    reply.code(202).send({ msg: "updated!" });
  }



  /**
   * route:  DELETE /task/:id
   * desc:   delete a user task
   * access: PRIVATE
   */
  static async deleteTodo(req, reply) {
    const todo_id = toInt(req.params.id);
    await TaskModel.deleteById({ id: todo_id, user_id: req.user['_id'] });

    reply.code(204).send();
  }
}

module.exports = TaskController;