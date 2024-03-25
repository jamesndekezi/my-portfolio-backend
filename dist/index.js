"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
mongoose_1.default.connect(`${process.env.MONGODB_URL}`).then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000 and connected to db");
    });
}).catch((error) => console.log(error.messge));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({
        message: "api is working properly"
    });
});
app.use("/api/v1/todo", todoRoutes_1.default);
