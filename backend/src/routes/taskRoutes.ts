import { Router } from "express";
import {
  getAllTasks,
  createTask,
  deleteTaks,
  updateTask,
} from "../controllers/taskController";
const tasksRoutes = Router();

tasksRoutes.get("/tasks", getAllTasks);
tasksRoutes.post("/createTask", createTask);
tasksRoutes.delete("/deleteTask/:id", deleteTaks);
tasksRoutes.put("/updateTask/:id", updateTask);
export default tasksRoutes;
