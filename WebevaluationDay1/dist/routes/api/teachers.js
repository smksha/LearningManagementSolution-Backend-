"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../../db");
const db_2 = require("../../db");
const db_3 = require("../../db");
const db_4 = require("../../db");
route.get('/', (req, res) => {
    db_1.Teacher.findAll({}).then((teacher) => {
        console.log(teacher.length);
        res.status(200).send(teacher);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all teachers"
        });
    });
});
route.get('/:id', (req, res) => {
    var teacherId = parseInt(req.params.id);
    db_1.Teacher.findAll({
        where: {
            id: teacherId
        }
    }).then((teacher) => {
        res.status(200).send(teacher);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve teacher"
        });
    });
});
route.post('/', (req, res) => {
    var teacherName = req.body.name;
    var subjectId = parseInt(req.body.sid);
    db_1.Teacher.create({
        name: teacherName,
        SubjectId: subjectId
    }).then((teacher) => {
        console.log("inserted");
        res.send(teacher);
    }).catch(err => {
        res.send({
            error: "couldnt add new teacher"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    db_1.Teacher.findAll({
        include: [
            {
                model: db_3.Subject,
                include: [
                    {
                        model: db_4.Course,
                        include: [
                            {
                                model: db_2.Batch,
                            }
                        ],
                    }
                ],
            }
        ],
        where: {
            id: parseInt(req.params.id)
        }
    }).then((batch) => {
        res.send(batch);
    }).catch(err => {
        res.send({
            error: "couldnt find batch"
        });
    });
});
exports.default = route;
