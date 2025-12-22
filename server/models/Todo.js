const mongoose=require('mongoose')
const {Schema}=mongoose

const todoSchema=new Schema({
    // _id:{
    //     type:String,
    //     required:true
    // },
    content:{
        type:String,
        required:true,
        trim:true
    },
    createdAt: {
        type: Date,
        default: Date.now // Useful for sorting your list
    },
    status:{
        type:String,
        enum: ['todo', 'ongoing', 'completed'],
        default: 'todo' // New tasks start here
    }
}
)

const Todo=mongoose.model('Todo',todoSchema)
module.exports=Todo