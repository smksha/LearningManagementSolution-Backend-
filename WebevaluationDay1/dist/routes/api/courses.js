"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../../db");
const db_2 = require("../../db");
const db_3 = require("../../db");
const db_4 = require("../../db");
const db_5 = require("../../db");
const db_6 = require("../../db");
route.get('/', (req, res) => {
    db_1.Course.findAll({}).then((course) => {
        console.log(course.length);
        res.status(200).send(course);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all courses"
        });
    });
});
route.get('/:id', (req, res) => {
    var courseId = parseInt(req.params.id);
    db_1.Course.findAll({
        where: {
            id: courseId
        }
    }).then((cart) => {
        res.status(200).send(cart);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve course"
        });
    });
});
route.post('/', (req, res) => {
    var courseName = req.body.name;
    db_1.Course.create({
        name: courseName,
    }).then((course) => {
        console.log("inserted");
        res.send(course);
    }).catch(err => {
        res.send({
            error: "couldnt add new course"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    var courseId = parseInt(req.params.id);
    db_2.Batch.findAll({
        where: {
            CourseId: courseId
        }
    }).then((batches) => {
        console.log('batches according to courses');
        res.status(200).send(batches);
    }).catch((err) => {
        res.status(500).send(console.log(err));
    });
});
route.post('/', (req, res) => {
    var batchName = req.body.name;
    var courseId = parseInt(req.body.courseId);
    db_2.Batch.create({
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
route.get('/:id/batches/:bid', (req, res) => {
    var courseId = parseInt(req.params.id);
    var batchId = parseInt(req.params.bid);
    db_2.Batch.findAll({
        where: {
            id: batchId,
            CourseId: courseId
        }
    }).then((cart) => {
        res.status(200).send(cart);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve course"
        });
    });
});
route.get('/:cid/batches/:bid/lectures', (req, res) => {
    var courseId = parseInt(req.params.cid);
    var batchId = parseInt(req.params.bid);
    db_3.Lecture.findAll({
        include: [
            {
                model: db_2.Batch,
                where: {
                    CourseId: courseId
                }
            }
        ],
        where: {
            BatchId: batchId
        }
    }).then((batches) => {
        console.log('batches according to courses');
        res.status(200).send(batches);
    }).catch((err) => {
        res.status(500).send(console.log(err));
    });
});
route.get('/:cid/batches/:bid/lectures/:lid', (req, res) => {
    var courseId = parseInt(req.params.cid);
    var batchId = parseInt(req.params.bid);
    var lectureId = parseInt(req.params.lid);
    db_3.Lecture.findAll({
        include: [
            {
                model: db_2.Batch,
                where: {
                    CourseId: courseId
                }
            }
        ],
        where: {
            BatchId: batchId,
            id: lectureId
        }
    }).then((batches) => {
        console.log('batches according to courses');
        res.status(200).send(batches);
    }).catch((err) => {
        res.status(500).send(console.log(err));
    });
});
route.get('/:id/batches/:batchid/students', (req, res) => {
    var courseId = parseInt(req.params.id);
    var batchId = parseInt(req.params.batchid);
    db_4.Student.findAll({
        include: [{
                model: db_2.Batch,
                through: {
                    attributes: ['StudentId', 'BatchId']
                },
                where: {
                    id: batchId,
                    CourseId: courseId
                }
            }]
    })
        .then((students) => {
        res.status(200).send(students);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all teachers"
        });
    });
});
route.get('/:id/batches/:batchid/teachers', (req, res) => {
    db_6.Teacher.findAll({
        include: [{
                model: db_5.Subject,
                include: [{
                        model: db_1.Course,
                        where: {
                            id: parseInt(req.params.id)
                        },
                        include: [{
                                model: db_2.Batch,
                                where: {
                                    id: parseInt(req.params.batchid)
                                },
                            }]
                    }]
            }],
    }).then((teachers) => {
        res.status(200).send(teachers);
    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all teachers"
        });
    });
});
exports.default = route;
