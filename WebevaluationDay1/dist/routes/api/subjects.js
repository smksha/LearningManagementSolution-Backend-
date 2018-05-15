"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../../db");
const db_2 = require("../../db");
route.get('/', (req, res) => {
    db_1.Subject.findAll({}).then((subject) => {
        console.log(subject.length);
        res.status(200).send(subject);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all subjects"
        });
    });
});
route.get('/:id', (req, res) => {
    var subjectId = parseInt(req.params.id);
    db_1.Subject.findAll({
        where: {
            id: subjectId
        }
    }).then((subject) => {
        res.status(200).send(subject);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve subject"
        });
    });
});
route.post('/', (req, res) => {
    var subjectName = req.body.name;
    var courseId = parseInt(req.body.id);
    db_1.Subject.create({
        name: subjectName,
        CourseId: courseId
    }).then((subject) => {
        console.log("inserted");
        res.send(subject);
    }).catch(err => {
        res.send({
            error: "couldnt add new subject"
        });
    });
});
route.get('/:id/teachers', (req, res) => {
    var subjectId = parseInt(req.params.id);
    db_2.Teacher.findAll({
        where: {
            SubjectId: subjectId
        }
    }).then((teacher) => {
        res.status(200).send(teacher);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve teacher"
        });
    });
});
exports.default = route;
