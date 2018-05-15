import express,{Router} from 'express'
const route:Router = Router()
import {Course} from '../../db'
import {Batch} from '../../db'
import {Lecture} from '../../db'
import {Student} from '../../db'
import {Subject} from '../../db'
import {MappingBatchStudent} from '../../db'
import {Teacher} from '../../db'
import Sequelize from 'sequelize'

route.get('/', (req, res) =>
{
    Course.findAll({
    }).then((course) => {
        console.log(course.length)
        res.status(200).send(course)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt find all courses"
        })
    })
})
route.get('/:id', (req, res) => {

    var courseId = parseInt(req.params.id)
    Course.findAll({
        where: {
            id: courseId
        }
    }).then((cart) => {

        res.status(200).send(cart)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve course"
        })
    })
})

route.post('/',(req,res)=>
{
    var courseName=req.body.name;
    Course.create({
        name: courseName,
    }).then((course) => {
        console.log("inserted")
        res.send(course)
    }).catch(err=> {
        res.send({
            error: "couldnt add new course"
        })
    })
})

route.get('/:id/batches',(req,res)=>
{
    var courseId = parseInt(req.params.id)
Batch.findAll({
        where: {
            CourseId:courseId
        }
    }).then((batches) => {
            console.log('batches according to courses')
            
            res.status(200).send(batches)
        }).catch((err) => {
            res.status(500).send(
                console.log(err)
            )
        })
})
route.post('/',(req,res)=>
{
    var batchName=req.body.name;
    var courseId=parseInt(req.body.courseId)
    Batch.create({
        name: batchName,
        CourseId:courseId
    }).then((course) => {
        console.log("inserted")
        res.send(course)
    }).catch(err=> {
        res.send({
            error: "couldnt add new batch"
        })
    })
})
route.get('/:id/batches/:bid', (req, res) => {

    var courseId = parseInt(req.params.id)
    var batchId=parseInt(req.params.bid)
    Batch.findAll({
        where: {
            id: batchId,
            CourseId: courseId
        }
    }).then((cart) => {

        res.status(200).send(cart)

    }).catch((err) => {
        res.status(500).send({
            error: "Couldnt retrieve course"
        })
    })
})
route.get('/:cid/batches/:bid/lectures',(req,res)=>
{
    var courseId = parseInt(req.params.cid)
    var batchId = parseInt(req.params.bid)
Lecture.findAll({
    include: [
        {
            model:Batch,
            where:
            {
                CourseId:courseId         
            }
        }
    ],
        where: {
            BatchId:batchId
        }
    }).then((batches) => {
            console.log('batches according to courses')
            
            res.status(200).send(batches)
        }).catch((err) => {
            res.status(500).send(
                console.log(err)
            )
        })
})
route.get('/:cid/batches/:bid/lectures/:lid',(req,res)=>
{
    var courseId = parseInt(req.params.cid)
    var batchId = parseInt(req.params.bid)
    var lectureId=parseInt(req.params.lid)
Lecture.findAll({
    include: [
        {
            model:Batch,
            where:
            {
                CourseId:courseId         
            }
        }
    ],
        where: {
            BatchId:batchId,
            id:lectureId
        }
    }).then((batches) => {
            console.log('batches according to courses')
            
            res.status(200).send(batches)
        }).catch((err) => {
            res.status(500).send(
                console.log(err)
            )
        })
})

route.get('/:id/batches/:batchid/students', (req, res) => {  
    
   var  courseId=parseInt(req.params.id);
   var  batchId=parseInt(req.params.batchid);

    Student.findAll({
        include:[{
            model: Batch,
            through:{
                attributes:['StudentId','BatchId']
            },
            where:
            {
                id:batchId,
                CourseId:courseId
            }
        }]

    })

.then((students) => {
    
    res.status(200).send(students)
    
    }).catch((err:Error) => {
    res.status(500).send({
    error: "Couldnt find all teachers"
    })
    })
    })  



route.get('/:id/batches/:batchid/teachers', (req, res) => {  
    Teacher.findAll({
    include: 
    [{
    model:Subject,
    include:
    [{
    model:Course,
    where:
    {
        id:parseInt(req.params.id)
    },
    include:
    [{
    model:Batch,
    where:
    {
        id:parseInt(req.params.batchid)
    },
    }]
    }]
    }],
    }).then((teachers) => {
    
    res.status(200).send(teachers)
    
    }).catch((err) => {
    res.status(500).send({
    error: "Couldnt find all teachers"
    })
    })
    })  
export default route
