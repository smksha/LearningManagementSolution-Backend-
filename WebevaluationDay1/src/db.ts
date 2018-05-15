import Sequelize from 'sequelize'
const db= new Sequelize('learndb','ngruser','ngrpass',{
    host:'localhost',
    dialect:'mysql'
})

const Course =db.define('Course',{
    id:
    {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Batch=db.define('Batch',{
    id:
    {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    }

})

const Teacher = db.define('Teacher',{
    id:
    {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Student = db.define('Student', {
    id:
    {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Lecture=db.define('Lecture',{
    id:
    {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    }

})
const Subject=db.define('Subject',{
    id:
    {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    }

})
const MappingBatchStudent=db.define('MappingBatchStudent',{
    
})


// Cart.belongsTo(Product);
// Product.belongsTo(Vendor);
// Cart.belongsTo(User);

Batch.belongsTo(Course)
Subject.belongsTo(Course)
Teacher.belongsTo(Subject)
Lecture.belongsTo(Batch)
Lecture.belongsTo(Subject)
Subject.belongsTo(Course)
Course.hasMany(Batch)
Batch.belongsToMany(Student,{through:'MappingBatchStudent'})
Student.belongsToMany(Batch,{through:'MappingBatchStudent'})
// Student.belongsTo(Batch)

// Batch.belongsTo(Student)
db.sync().then(()=>{
    console.log('data base synced')
}).catch((err)=>{
console.log(err)
})
export {
    db,Course,Batch,Teacher,Student,Lecture,Subject,MappingBatchStudent
}
