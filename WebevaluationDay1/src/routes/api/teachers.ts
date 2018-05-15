import express,{Router} from 'express'
const route:Router = Router()
import {Teacher} from '../../db'
import {Batch} from '../../db'
import {Subject} from '../../db'
import {Course} from '../../db'
// import {User} from '../../db'
import Sequelize from 'sequelize'

route.get('/', (req, res) =>
{
    Teacher.findAll({
    }).then((teacher) => {
        console.log(teacher.length)
        res.status(200).send(teacher)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all teachers"
        })
    })
})
route.get('/:id', (req, res) => {

    var teacherId = parseInt(req.params.id)
    Teacher.findAll({
        where: {
            id: teacherId
        }
    }).then((teacher) => {

        res.status(200).send(teacher)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve teacher"
        })
    })
})
route.post('/',(req,res)=>
{
    var teacherName=req.body.name;
    var subjectId = parseInt(req.body.sid)
    Teacher.create({
        name: teacherName,
        SubjectId:subjectId
    }).then((teacher) => {
        console.log("inserted")
        res.send(teacher)
    }).catch(err=> {
        res.send({
            error: "couldnt add new teacher"
        })
    })
})
route.get('/:id/batches',(req,res)=>
{
    Teacher.findAll({
    include: [
    {
    model:Subject,
    include: [
    {
    model:Course,
    include: [
    {
    model:Batch,
    }
    ], 
    }
    ], 
    }
    ], 
    where:
    {
    id:parseInt(req.params.id)
    } 
    }).then((batch) => {
        res.send(batch)
    }).catch(err=> {
        res.send({
            error: "couldnt find batch"
        })
    })
})

export default route