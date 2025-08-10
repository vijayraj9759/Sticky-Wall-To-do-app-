import { useState, useEffect } from 'react'
import delimg from '../assets/images/delete_icon-removebg-preview.png'
import editimg from '../assets/images/edit_icon.svg'
import { v4 as uuidv4 } from 'uuid'

const Add = () => {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [editingId, seteditingId] = useState("")
  const [editingText, seteditingText] = useState("")
  const [showfinished, setshowfinished] = useState(false)
  let baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchdata(url) {
      try {
        let alltodos = await fetch(url)
        let response = await alltodos.json()
        console.log(response)
        setTodos(response)

      } catch (e) {
        console.log("here something going wrong")
      }
    }
    fetchdata(`${baseurl}api/todos/gettodos`)
  }, [])

  const Addtodo = () => {
    if (Todo !== '') {
      adddata(`${baseurl}api/todos/addtodos`)
    }
    async function adddata(url) {
      try {
        let addtodo = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: uuidv4(),
            name: Todo,
            completed: false
          })
        })
        const newtodo = await addtodo.json();
        setTodos((prev) => [...prev, newtodo]) // use backend version
        setTodo("")
      } catch (error) {
        console.log("some error occured ")
      }
    }
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const onchangedchecked = (uuid) => {
    async function updatecomplete(url) {
      try {
        let currtodo = Todos.find(todo => todo.uuid == uuid)
        let currentstaus = currtodo.completed;
        const res = await fetch(url, {
          method: "PUT", // PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !currentstaus }),
        });
        const data = await res.json();
        console.log("update Response:", data);

        const updateTodos = Todos.map(todo => {
          if (todo.uuid === uuid) {
            return { ...todo, completed: !currentstaus }
          }
          return todo
        })
        setTodos(updateTodos)
      } catch (error) {
        console.log("some error occured ")
      }
    }
    updatecomplete(`${baseurl}api/todos/updatecomplete/${uuid}`)

  }

  const handledelete = (e, id) => {
    async function deletedata(url) {
      try {
        const updatedTodos = Todos.filter(todo => todo._id !== id)
        setTodos(updatedTodos)
        let deletetodo = await fetch(url, {
          method: "DELETE"
        })
        const data = await deletetodo.json();
        console.log("Delete Response:", data);
      } catch (error) {
        console.log("some error occured ")
      }
    }
    deletedata(`${baseurl}api/todos/deletetodo/${id}`)
  }

  const handleedit = (editingid, editingtext) => {
    seteditingId(editingid)
    seteditingText(editingtext)
  }

  const changeeditingtext = (e) => {
    seteditingText(e.target.value)
  }

  const handlerenamesubmit = (uuid) => {
    async function updatename(url) {
      try {
        const res = await fetch(url, {
          method: "PUT", // PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: editingText }),
        });
        const data = await res.json();
        console.log("update Response:", data);

        const updatedTodos = Todos.map(todo => {
          if (todo.uuid === uuid) {
            return { ...todo, name: editingText }
          }
          return todo
        })
        setTodos(updatedTodos)
        seteditingId("")
        seteditingText("")
      } catch (error) {
        console.log("some error occured ")
      }
    }
    updatename(`${baseurl}api/todos/updatename/${uuid}`)
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
              return (showfinished || !item.completed) && < li key={item.uuid} className='flex justify-between  h-[auto] hover:bg-[#757070] w-[100%] my-[5px]' >
                <div className='flex items-center gap-2 w-[70%] sm:w-[85%] ' >
                  <input type="checkbox" onChange={e => { onchangedchecked(item.uuid) }} checked={item.completed} />
                  {editingId == item.uuid ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => changeeditingtext(e)}
                      onKeyDown={(e) => { handlekeyofinput(e, item.uuid) }}
                      autoFocus
                    />
                  ) : (
                    <span className=' flex items-start h-[100%] w-[90%]  break-words leading-tight' >{item.name}</span>
                  )
                  }
                </div>
                <div className='flex gap-2 w-[30%] sm:w-[15%]  justify-end items-start'>
                  <button onClick={() => handleedit(item.uuid, item.name)} className=' cursor-pointer bg-black rounded-[50%] h-[25px]'><img className='w-[25px] h-[20px]' src={editimg} alt="" /></button>
                  <button onClick={(e) => { handledelete(e, item._id) }} className=' cursor-pointer' > <img className='w-[25px]' src={delimg} alt="" /></button>
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