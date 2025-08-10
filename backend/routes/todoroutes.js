import express from 'express';
import { getTodos,updatename,updatecomplete,deleteTodo,addtodo } from '../controllers/todocontroller.js';

const router = express.Router();

router.get('/gettodos' , getTodos);
router.post('/addtodos' ,addtodo)
router.delete('/deletetodo/:id',deleteTodo)
router.put('/updatename/:id' , updatename)
router.put('/updatecomplete/:id',updatecomplete);

export default router;