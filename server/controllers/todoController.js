const Todo=require('../models/Todo')

let getTodoMain=async(req,res)=>{
    let allTodos=await Todo.find({owner:req.userId})
    res.json({allTodos})
    console.log('mainn page')
}

let todoController=async(req,res)=>{
    try{
        const newTodo=await Todo.create({
            // _id:req.body.id,
            content:req.body.content,
            owner:req.userId
        })

        console.log(newTodo)
        res.status(201).json(newTodo);


    }catch(error){
        console.log('problemm')
        res.status(500).json({
            message:'There was error',
            details:error.message
        })
    }
}

let deleteAllController=async(req,res)=>{
    await Todo.deleteMany({})
    res.status(200).json({
        message:'All Items Deleteddd'
    })
    console.log('Everything deletedd')
}

let singleDelete=async(req,res)=>{
    try{
        let delId=req.params.id
        let deleteOption=await Todo.findOneAndDelete({'_id':delId})
        res.status(200).json({
            message:`The task is deleted: ${deleteOption}`
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

let updateStatus=async(req,res)=>{
    let {id}=req.params
    let {status}=req.body
    let updatedData=await Todo.findByIdAndUpdate(id,{status:status},{new:true})
    console.log(updatedData)
}

module.exports={todoController,getTodoMain,deleteAllController,singleDelete,updateStatus}