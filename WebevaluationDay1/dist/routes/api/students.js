"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../../db");
const db_2 = require("../../db");
const db_3 = require("../../db");
route.get('/', (req, res) => {
    db_1.Student.findAll({}).then((student) => {
        console.log(student.length);
        res.status(200).send(student);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all students"
        });
    });
});
route.get('/:id', (req, res) => {
    var studentId = parseInt(req.params.id);
    db_1.Student.findAll({
        where: {
            id: studentId
        }
    }).then((student) => {
        res.status(200).send(student);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve student"
        });
    });
});
route.post('/', (req, res) => {
    var studentName = req.body.name;
    db_1.Student.create({
        name: studentName,
    }).then((student) => {
        console.log("inserted");
        res.send(student);
    }).catch(err => {
        res.send({
            error: "couldnt add new student"
        });
    });
});
// route.post('/:id/batches',(req,res)=>
// {
//     var studentId= parseInt(req.params.id);
//     var batchId=parseInt(req.body.batchId);
//     MappingBatchStudent.create({
//         StudentId: studentId,
//         BatchId : batchId
//     }).then((stud:any) => {
//         console.log("inserted")
//         res.send(stud)
//     }).catch((err: Error)=>console.log(err.message));
// }) 
// route.get('/:studentId/batches',(req,res)=>{
route.get('/:id/batches', (req, res) => {
    var studentId = parseInt(req.params.id);
    db_2.Batch.findAll({
        include: [{
                model: db_1.Student,
                through: {
                    attributes: ['StudentId', 'BatchId']
                },
                where: {
                    id: studentId
                }
            }]
    }).then((students) => {
        res.status(200).send(students);
    }).catch((err) => {
        console.log(err.message);
    });
});
route.post('/:id/batches', (req, res) => {
    var studentId = parseInt(req.params.id);
    var batchId = parseInt(req.body.bid);
    db_3.MappingBatchStudent.create({
        StudentId: studentId,
        BatchId: batchId
    }).then((mapdata) => {
        res.status(200).send(mapdata);
    }).catch((err) => {
        console.log(err.message);
    });
});
exports.default = route;
