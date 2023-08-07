import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  singleTodoController,
  todoStatusController,
  updateTodoConroller,
} from "../controllers/todoControllers.js";

const router = express.Router();

//routes
//create todo
router.post("/create-todo", createTodoController);

//update todo
router.put("/update-todo/:id", updateTodoConroller);

//get All Todo
router.get("/get-todo", getAllTodoController);

//singel todo
router.get("/single-todo/:slug", singleTodoController);

//delete todo
router.delete("/delete-todo/:id", deleteTodoController);

// //get all status
// router.get("/get-status", getStatusController);

//todo status update
router.put("/todo-status/:todoId", todoStatusController);

export default router;
