import { Router } from "express";
import {
  createTask,
  deleteTask,
  getOneTask,
  getTask,
  getTasksByProject,
  updateTask
} from "../controllers/task.controller";
const router = Router();

router.post("/", createTask);
router.get("/", getTask);
router.get("/:id", getOneTask);
router.delete("/:id", deleteTask);
router.put('/:id',updateTask);
router.get('/project/:projectid',getTasksByProject);

export default router;
