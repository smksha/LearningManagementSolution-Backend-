"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../../db");
route.get('/', (req, res) => {
    db_1.Lecture.findAll({}).then((lecture) => {
        console.log(lecture.length);
        res.status(200).send(lecture);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all lecture"
        });
    });
});
route.post('/', (req, res) => {
    var lectureName = req.body.name;
    var batchId = parseInt(req.body.bid);
    var subjectId = parseInt(req.body.sid);
    db_1.Lecture.create({
        name: lectureName,
        BatchId: batchId,
        StudentId: subjectId
    }).then((lecture) => {
        console.log("inserted");
        res.send(lecture);
    }).catch(err => {
        res.send({
            error: "couldnt add new lecture"
        });
    });
});
exports.default = route;
