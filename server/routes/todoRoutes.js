const router=require('express').Router()
const Todo=require('../models/Todo.js')
const {todoController,getTodoMain,deleteAllController,singleDelete,updateStatus}=require('../controllers/todoController.js')

router.get('/',getTodoMain)
router.post('/',todoController)
router.delete('/clearAll',deleteAllController)
router.delete('/del/:id',singleDelete)
router.patch('/update/:id',updateStatus)

module.exports={todoRoutes:router};