"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../../db");
route.get('/', (req, res) => {
    db_1.Batch.findAll({}).then((batch) => {
        console.log(batch.length);
        res.status(200).send(batch);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all batches"
        });
    });
});
route.post('/', (req, res) => {
    var batchName = req.body.name;
    var courseId = parseInt(req.body.courseId);
    db_1.Batch.create({
        name: batchName,
        CourseId: courseId
    }).then((course) => {
        console.log("inserted");
        res.send(course);
    }).catch(err => {
        res.send({
            error: "couldnt add new batch"
        });
    });
});
exports.default = route;
