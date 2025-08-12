import connectdb from './config/db.js'
import express from 'express'
import  dotenv  from 'dotenv'
import router from './routes/todoroutes.js';
import cors from 'cors'

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

await connectdb();

app.use(express.json())
app.use(cors())
app.use('/api/todos', router)  
app.get('/' , (req,res)=>{
  res.send("Here is the Backend of the app is live ")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

