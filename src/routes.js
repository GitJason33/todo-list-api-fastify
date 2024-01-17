const isLoggedIn = require("./middlewares/IsLoggedIn");
const UserController = require("./controllers/user-control");
const TaskController = require("./controllers/task-control");


module.exports = async function(app) {
  /**
   * welcome router
   * */
  app.route({
    method: 'GET',
    url: '/',
    handler: (req, reply) => {
      reply.send({msg: "welcome to my api"});
    },
  });



  /**
   * user router
   * */
  app.route({
    method: 'GET',
    url: '/user/info',
    preHandler: isLoggedIn,
    handler: UserController.getUser,
  });

  app.route({
    method: "POST",
    url: "/user/login",
    handler: UserController.loginUser,
  });

  app.route({
    method: "POST",
    url: "/user/register",
    handler: UserController.registerUser,
  });



  /**
   * task router
   * */
  app.route({
    method: "GET",
    url: "/task/examples",
    handler: TaskController.getExamples,
  });

  app.route({
    method: 'GET',
    url: '/task/all',
    preHandler: isLoggedIn,
    handler: TaskController.getTodos,
  });

  app.route({
    method: "GET",
    url: "/task/:id",
    preHandler: isLoggedIn,
    handler: TaskController.getTodo,
  });

  app.route({
    method: "POST",
    url: "/task",
    preHandler: isLoggedIn,
    handler: TaskController.createTodo,
  });

  app.route({
    method: "PUT",
    url: "/task/done/:id",
    preHandler: isLoggedIn,
    handler: TaskController.markAsDone,
  });

  app.route({
    method: "PUT",
    url: "/task/:id",
    preHandler: isLoggedIn,
    handler: TaskController.editTodo,
  });

  app.route({
    method: "DELETE",
    url: "/task/:id",
    preHandler: isLoggedIn,
    handler: TaskController.deleteTodo,
  });
}
