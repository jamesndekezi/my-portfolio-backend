"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoControllers_1 = require("../controller/todoControllers");
const isIdValid_1 = __importDefault(require("../validation/isIdValid"));
const todoRoutes = (0, express_1.Router)();
todoRoutes.get("/", todoControllers_1.getAllTodo);
todoRoutes.post("/", todoControllers_1.addTodo);
todoRoutes.put("/:id/complete", isIdValid_1.default, todoControllers_1.markTodoAsCompleteOrIncomplete);
todoRoutes.delete("/:id", isIdValid_1.default, todoControllers_1.deleteTodo);
todoRoutes.put("/:id", isIdValid_1.default, todoControllers_1.editTodo);
exports.default = todoRoutes;
