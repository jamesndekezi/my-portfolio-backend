"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTodo = exports.deleteTodo = exports.markTodoAsCompleteOrIncomplete = exports.addTodo = exports.getAllTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield todoModel_1.default.find();
        res.status(200).json({
            status: 200,
            message: "success",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "failure"
        });
    }
});
exports.getAllTodo = getAllTodo;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield todoModel_1.default.create(Object.assign({}, req.body));
        res.status(201).json({
            status: 200,
            message: "success",
            data: newTodo
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.addTodo = addTodo;
const markTodoAsCompleteOrIncomplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentTodo = yield todoModel_1.default.findById(id);
        if (currentTodo) {
            const updatedTodo = yield todoModel_1.default.findByIdAndUpdate(id, {
                completed: !currentTodo.completed
            }, { new: true });
            res.status(200).json({
                status: 200,
                message: "success",
                data: updatedTodo
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }
    }
    catch (error) {
        console.error('Error toggling todo status:', error.message);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
});
exports.markTodoAsCompleteOrIncomplete = markTodoAsCompleteOrIncomplete;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentTodo = yield todoModel_1.default.findById(id);
        if (currentTodo) {
            yield todoModel_1.default.findByIdAndDelete(id);
            res.status(200).json({
                status: 200,
                message: "Todo deleted successfully"
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }
    }
    catch (error) {
        console.error('Error deleting todo:', error.message);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
});
exports.deleteTodo = deleteTodo;
const editTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentTodo = yield todoModel_1.default.findById(id);
        if (currentTodo) {
            const updatedTodo = yield todoModel_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true });
            res.status(200).json({
                status: 200,
                message: "Todo updated successfully",
                data: updatedTodo
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }
    }
    catch (error) {
        console.error('Error updating todo:', error.message);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
});
exports.editTodo = editTodo;
