require('dotenv').config()

const express=require('express')
const app=express();
const cors=require('cors')

const todoRoutes=require('./routes/todoRoutes.js')
const authRoutes=require('./routes/authRoutes.js')
const mongoose=require('mongoose')

app.use(express.json())
app.use(cors({
    origin: 'https://kanban-board-gray-eta.vercel.app', // ALLOW YOUR FRONTEND
    // origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // ALLOW YOUR LOCAL FRONTEND
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// mongoose.connect('mongodb://127.0.0.1:27017/taskboard')
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database Connected!'))
  .catch((err)=>{
    console.error(err)
  });

app.get('/', (req, res) => {
    res.send('Server is running successfully!');
    console.log('Server is running for root page')
});
app.use('/api/todos',todoRoutes)
app.use('/api/auth',authRoutes)
const port=process.env.PORT || 9090
app.listen(port,()=>{
    console.log(`${port} is listening`)
})

module.exports = app;
