import express,{Router} from 'express'
const route:Router = Router()
import {Lecture, Student} from '../../db'
import {Batch} from '../../db'
import {Subject} from '../../db'

// import {User} from '../../db'
import Sequelize from 'sequelize'

route.get('/', (req, res) =>
{
    Lecture.findAll({
    }).then((lecture) => {
        console.log(lecture.length)
        res.status(200).send(lecture)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all lecture"
        })
    })
})

route.post('/',(req,res)=>
{
    var lectureName=req.body.name;
    var batchId=parseInt(req.body.bid);
    var subjectId=parseInt(req.body.sid);
    Lecture.create({
        name: lectureName,
        BatchId: batchId,
        StudentId:subjectId
    }).then((lecture) => {
        console.log("inserted")
        res.send(lecture)
    }).catch(err=> {
        res.send({
            error: "couldnt add new lecture"
        })
    })
})
export default route