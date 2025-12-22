require('dotenv').config()

const express=require('express')
const app=express();
const cors=require('cors')

const {todoRoutes}=require('./routes/todoRoutes.js')
const mongoose=require('mongoose')

app.use(express.json())
app.use(cors({
    origin: 'https://kanban-board-gray-eta.vercel.app', // Your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}))

// mongoose.connect('mongodb://127.0.0.1:27017/taskboard')
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'))
  .catch((err)=>{
    console.error(err)
  });


app.use('/api/todos/',todoRoutes)
const port=process.env.PORT || 9090
app.listen(port,()=>{
    console.log(`${port} is listening`)
})

