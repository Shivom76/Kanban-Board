const router=require('express').Router()
const Todo=require('../models/Todo.js')
const {isUser, isOwner}=require("../middlewars/authMiddlewares.js")
const {todoController,getTodoMain,deleteAllController,singleDelete,updateStatus}=require('../controllers/todoController.js')

router.get('/',isOwner,getTodoMain)
router.post('/',isOwner,todoController)
router.delete('/clearAll',isOwner,deleteAllController)
router.delete('/del/:id',isOwner,singleDelete)
router.patch('/update/:id',isOwner,updateStatus)

module.exports=router;