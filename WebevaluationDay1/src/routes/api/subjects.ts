import express,{Router} from 'express'
const route:Router = Router()
import {Subject} from '../../db'
import {Teacher} from '../../db'
// import {User} from '../../db'
import Sequelize from 'sequelize'

route.get('/', (req, res) =>
{
    Subject.findAll({
    }).then((subject) => {
        console.log(subject.length)
        res.status(200).send(subject)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all subjects"
        })
    })
})
route.get('/:id', (req, res) => {

    var subjectId = parseInt(req.params.id)
    Subject.findAll({
        where: {
            id: subjectId
        }
    }).then((subject) => {

        res.status(200).send(subject)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve subject"
        })
    })
})
route.post('/',(req,res)=>
{
    var subjectName=req.body.name;
    var courseId = parseInt(req.body.id)
    Subject.create({
        name: subjectName,
        CourseId:courseId
    }).then((subject) => {
        console.log("inserted")
        res.send(subject)
    }).catch(err=> {
        res.send({
            error: "couldnt add new subject"
        })
    })
})
route.get('/:id/teachers', (req, res) => {

    var subjectId = parseInt(req.params.id)
    Teacher.findAll({
        where: {
            SubjectId: subjectId
        }
    }).then((teacher) => {

        res.status(200).send(teacher)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve teacher"
        })
    })
})
export default route