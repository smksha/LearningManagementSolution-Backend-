"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db = new sequelize_1.default('learndb', 'ngruser', 'ngrpass', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.db = db;
const Course = db.define('Course', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Course = Course;
const Batch = db.define('Batch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Batch = Batch;
const Teacher = db.define('Teacher', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Teacher = Teacher;
const Student = db.define('Student', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Student = Student;
const Lecture = db.define('Lecture', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Lecture = Lecture;
const Subject = db.define('Subject', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Subject = Subject;
const MappingBatchStudent = db.define('MappingBatchStudent', {});
exports.MappingBatchStudent = MappingBatchStudent;
// Cart.belongsTo(Product);
// Product.belongsTo(Vendor);
// Cart.belongsTo(User);
Batch.belongsTo(Course);
Subject.belongsTo(Course);
Teacher.belongsTo(Subject);
Lecture.belongsTo(Batch);
Lecture.belongsTo(Subject);
Subject.belongsTo(Course);
Course.hasMany(Batch);
Batch.belongsToMany(Student, { through: 'MappingBatchStudent' });
Student.belongsToMany(Batch, { through: 'MappingBatchStudent' });
// Student.belongsTo(Batch)
// Batch.belongsTo(Student)
db.sync().then(() => {
    console.log('data base synced');
}).catch((err) => {
    console.log(err);
});
