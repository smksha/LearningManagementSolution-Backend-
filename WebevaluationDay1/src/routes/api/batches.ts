import express,{Router} from 'express'
const route:Router = Router()
import {Course} from '../../db'
import {Batch} from '../../db'
// import {User} from '../../db'
import Sequelize from 'sequelize'

route.get('/', (req, res) =>
{
    Batch.findAll({
    }).then((batch) => {
        console.log(batch.length)
        res.status(200).send(batch)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all batches"
        })
    })
})
route.post('/',(req,res)=>
{
    var batchName=req.body.name;
    var courseId=parseInt(req.body.courseId);
    Batch.create({
        name: batchName,
        CourseId :courseId
    }).then((course) => {
        console.log("inserted")
        res.send(course)
    }).catch(err=> {
        res.send({
            error: "couldnt add new batch"
        })
    })
})
export default route
