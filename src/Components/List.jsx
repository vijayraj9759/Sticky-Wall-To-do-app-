import React from 'react'
import { useState, useEffect } from 'react'
import delimg from '../assets/images/delete_icon-removebg-preview.png'
import editimg from '../assets/images/edit_icon.svg'
import { v4 as uuidv4 } from 'uuid'

const Add = () => {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [editingId, seteditingId] = useState("")
  const [editingText, seteditingText] = useState("")
  const [hasloaded, sethasloaded] = useState(false)
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    try {
      let Stringtodo = localStorage.getItem("todos")
      if (Stringtodo) {
        let todos = JSON.parse(Stringtodo)
        if (Array.isArray(todos)) {
          setTodos(todos)
        } else {
          console.log("here is no array")
          localStorage.removeItem("todos")
        }
      }
      sethasloaded(true);
    } catch (e) {
      console.log("here something going wrong")
    }
  }, [])

  useEffect(() => {
    if (hasloaded) {
      localStorage.setItem("todos", JSON.stringify(Todos))
    }
  }, [Todos])

  const Addtodo = () => {
    if (Todo !== '') {
      setTodos((prev) => [...prev, { id: uuidv4(), name: Todo, isCompleted: false }])
      setTodo("")
    }
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const onchangedchecked = (id) => {
    const updateTodos = Todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      return todo
    })
    setTodos(updateTodos)
  }

  const handledelete = (e, id) => {
    const updatedTodos = Todos.filter(todo => {
      if (todo.id !== id) {
        return todo;
      }
    })
    setTodos(updatedTodos)
  }

  const handleedit = (editingid, editingtext) => {
    seteditingId(editingid)
    seteditingText(editingtext)
  }

  const changeeditingtext = (e) => {
    seteditingText(e.target.value)
  }

  const handlerenamesubmit = (id) => {
    const updatedTodos = Todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, name: editingText }
      }
      return todo
    })
    setTodos(updatedTodos)
    seteditingId("")
    seteditingText("")
  }

  const handlekey = (e) => {
    if (e.key == "Enter") {
      Addtodo()
    }
  }

  const handlekeyofinput = (e, id) => {
    if (e.key == "Enter") {
      handlerenamesubmit(id)
    }
  }

  const togglefinished = () => {
    setshowfinished(!showfinished)
  }


  return (<div className='mx-auto h-[85%] sm:h-[80%] font-quicksand'>
    <div className='w-[70vw] sm:w-[52vw] h-[100%] bg-[#4a4242] mx-auto rounded-[10px] px-[10px] sm:px-[20px] py-[10px] text-white'>
      <div className=''>
        <div className='text-white font-bold pl-[1px] sm:pl-[4px] text-[16px] sm:text-1xl'>Add a Todo</div>
        <div className='flex gap-1 sm:gap-2  items-center'>
          <input value={Todo} onKeyDown={(e) => { handlekey(e) }} onChange={handlechange} className='bg-white w-[90%]  h-[30px] rounded-[20px] px-[2px] sm:px-[8px] focus:outline-1 focus:border-[2px] focus:border-[black] text-[#424141]' type="text" placeholder='Write something' />
          <button onClick={Addtodo} className='bg-[black] text-white h-[35px] w-[70px] rounded-[20px] cursor-pointer hover:scale-110'>Save</button>
        </div>
      </div>
      <div className='flex mt-[15px] text-center gap-[5px] ml-[4px]'>
        <input className='w-[15px]' type="checkbox" onChange={togglefinished} checked={showfinished} />
        <div className=''>Show finished Todos</div>
      </div>
      <div className='w-[40vw] mx-auto h-[1px] bg-white my-[15px]'></div>
      <div className='mx-[4px] h-[70%]'>
        <div className='font-bold '>Your Todos</div>
        <div className='  h-[90%]'>
          <ul className='list-none mt-1 overflow-x-auto h-[100%] scrollbar-hide'>
            {Todos.map(item => {
              return (showfinished || !item.isCompleted) && < li key={item.id} className='flex justify-between  h-[auto] hover:bg-[#757070] w-[100%] my-[5px]' >
                <div className='flex items-center gap-2 w-[70%] sm:w-[85%] ' >
                  <input type="checkbox" onChange={e => { onchangedchecked(item.id) }} checked={item.isCompleted} />
                  {editingId == item.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => changeeditingtext(e)}
                      onKeyDown={(e) => { handlekeyofinput(e, item.id) }}
                      autoFocus
                    />
                  ) : (
                    <span className='{item.isCompleted ? "line-through" : "" }  flex items-start h-[100%] w-[90%]  break-words leading-tight' >{item.name}</span>
                  )
                  }
                </div>
                <div className='flex gap-2 w-[30%] sm:w-[15%]  justify-end items-start'>
                  <button onClick={() => handleedit(item.id, item.name)} className=' cursor-pointer bg-black rounded-[50%] h-[25px]'><img className='w-[25px] h-[20px]' src={editimg} alt="" /></button>
                  <button onClick={(e) => { handledelete(e, item.id) }} className=' cursor-pointer' > <img className='w-[25px]' src={delimg} alt="" /></button>
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Add