const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  addTodoController,
  getTodosController,
  getTodoByIdController,
  editTodoByIdController,
  deleteTodoByIdController,
} = require("../controllers/todoController");

const todoRoute = express.Router();

todoRoute.post("/todo", authenticateToken, addTodoController);
todoRoute.get("/todos", authenticateToken, getTodosController);
todoRoute.get("/todo/:id", authenticateToken, getTodoByIdController);
todoRoute.put("/todo/:id", authenticateToken, editTodoByIdController);
todoRoute.delete("/todo/:id", authenticateToken, deleteTodoByIdController);

module.exports = todoRoute;
