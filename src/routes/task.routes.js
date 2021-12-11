const { Router } = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const poll = require("../db");
const router = Router();
//lista de tareas
router.get("/tasks", getAllTasks);

//Lista de tareas por id
router.get("/tasks/:id", getTask);

// Creando una tarea
router.post("/tasks", createTask);

//Eliminando una tarea
router.delete("/tasks/:id", deleteTask);

//Actualizando una tarea
router.put("/tasks/:id", updateTask);

module.exports = router;
