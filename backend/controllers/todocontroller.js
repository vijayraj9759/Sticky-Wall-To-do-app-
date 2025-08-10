import Todo from "../models/todoschema.js";


// Get all todos
export const getTodos = async(req,res)=>{
    try{
        const alltodos = await Todo.find();
        console.log("hello" , alltodos)
        res.json(alltodos)
        
    }catch(error){
        res.status(500).json({message : "Server error"})
    }


}

//Add todo
export const addtodo = async(req,res)=>{
    try{
        let todo = req.body
        const newtodo = new Todo(todo)
        await newtodo.save();
        res.status(201).json(newtodo)
    }catch(error){
        res.status(500).json({message : "Server error"})
    }
}

// Delete Todo
export const deleteTodo = async(req,res)=>{
    try{
        const deletetodo = await Todo.findByIdAndDelete(req.params.id)
        if(!deletetodo){
            return res.status(404).json({message : "todo is not found  {id} "})
        }
        res.json({message : "Todo deleted" ,})
    }catch(error){
        res.status(500).json({message : "Server error"})
    }
}

//Update completed status of tood
export const updatecomplete = async(req,res)=>{
    try{
        const {id} = req.params
        const {completed}  = req.body
        const updatedtodo = await Todo.findOneAndUpdate(
            {uuid : id},
            {completed}, 
            {new : true}
        )
        if(!updatedtodo){
            return res.status(404).json({message : "todo is not found  {id} "  ,id : id })
        }
        res.json(updatedtodo)
    }catch(error){
        res.status(500).json({message : "Server error"})
    }

}

// update todo name
export const updatename = async (req,res)=>{
    try{
        const {id} = req.params
        const {name} = req.body
        const updatedtodo = await Todo.findOneAndUpdate(
            {uuid  : id},
            {name},
            {new : true}
        )
        if(!updatedtodo){
            return res.status(404).json({message : "todo is not found"})
        }
        res.json(updatedtodo)
    }catch(error){
        res.status(500).json({message : "Server error" })
    }
}