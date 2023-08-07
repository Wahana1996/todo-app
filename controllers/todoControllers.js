import todoModel from "../models/todoModel.js";
import slugify from "slugify";
import dotenv from "dotenv";
// import statusMode from "../models/statusMode.js";

dotenv.config();

//create todo
export const createTodoController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(401).send({
        message: "title is required",
      });
    }

    //check
    const existingTodo = await todoModel.findOne({ title });
    //existing user
    if (existingTodo) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exist",
      });
    }
    //save
    const todo = await new todoModel({
      title,
      slug: slugify(title),
    }).save();
    return res.status(201).send({
      success: true,
      message: "New todo Created",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in todo",
    });
  }
};

//updatetodo
export const updateTodoConroller = async (req, res) => {
  try {
    const { title, status } = req.body;
    const { id } = req.params;
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { title, slug: slugify(title) },
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Todo Updated Succesfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Update todo",
    });
  }
};

//get all todo
export const getAllTodoController = async (req, res) => {
  try {
    const todo = await todoModel.find({});
    res.status(200).send({
      success: true,
      message: "All Todo List",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

//singel todo
export const singleTodoController = async (req, res) => {
  try {
    const todo = await todoModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Todo Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single todo",
    });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    await todoModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Delete Todo Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while deleting todo",
    });
  }
};
// //get all status
// export const getStatusController = async (req, res) => {
//   try {
//     const todo = await statusMode
//       .find({})
//       .populate("todo", "title")
//       .sort({ createdAt: "-1" });
//     res.json(todo);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error while getting all status",
//       error,
//     });
//   }
// };

//todo status
export const todoStatusController = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;
    const todo = await statusMode.findByIdAndUpdate(
      todoId,
      { status },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updateing status",
      error,
    });
  }
};
