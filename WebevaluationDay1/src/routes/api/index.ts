import express,{Router} from 'express'
const route:Router = express.Router()
import courseRoute from './courses'
import batchRoute from './batches'
 import studentRoute from './students'
 import subjectRoute from './subjects'
 import lectureRoute from './lectures'
 import teacherRoute from './teachers'

// import cartRoute from './cart'
// import userRoute from './user'
route.use('/courses',courseRoute)
route.use('/batches',batchRoute)
route.use('/students',studentRoute)
route.use('/subjects',subjectRoute)
route.use('/lectures',lectureRoute)
route.use('/teachers',teacherRoute)

// route.use('/cart',cartRoute)
// route.use('/user',userRoute)


export default route