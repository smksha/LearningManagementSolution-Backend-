"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const courses_1 = __importDefault(require("./courses"));
const batches_1 = __importDefault(require("./batches"));
const students_1 = __importDefault(require("./students"));
const subjects_1 = __importDefault(require("./subjects"));
const lectures_1 = __importDefault(require("./lectures"));
const teachers_1 = __importDefault(require("./teachers"));
// import cartRoute from './cart'
// import userRoute from './user'
route.use('/courses', courses_1.default);
route.use('/batches', batches_1.default);
route.use('/students', students_1.default);
route.use('/subjects', subjects_1.default);
route.use('/lectures', lectures_1.default);
route.use('/teachers', teachers_1.default);
// route.use('/cart',cartRoute)
// route.use('/user',userRoute)
exports.default = route;
