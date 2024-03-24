import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo, todoStatus, updateTodo } from './app/todoSlice'
import './App.css'
function App() {
    const todo = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const handleAddTodo = () => {
        let value = input.current.value
        if (value == "") {
            return
        }
        dispatch(addTodo(input.current.value))
        input.current.value = ''
    }
    const handleDelete = (e) => {
        dispatch(removeTodo(e.target.id))
    }
    const handleUpdate = (e) => {
        let b = e.target
        let packet = ''
        let msg = document.querySelector(`.${b.id}`)
        if (msg != null) {
            packet = msg.value
        }

        dispatch(updateTodo({ id: b.id, type: b.innerText, text: packet }))
    }
    const handleDone = (e) => {
        let bool=e.target.checked;
        dispatch(todoStatus({id:e.target.id,bool}))
    }

    const input = useRef();
    return (
        <div className='maindiv flexed'>
            <div className="title h-[10%]">
                <h2 className='text-3xl text-white font-bold'>ToDo</h2>
            </div>
            <ul className='flexed justify-start'>
                {todo.length ? todo.map((e) => {
                    let bool=e.done
                    let fitext=e.text
                    return (<li key={e.id}>
                        <div className='flex flex-row w-[70%]'>

                                <input checked={bool}  id={e.id} onChange={handleDone} className='checky mx-2' type="checkbox" />


                            {e.edit ? <input id={e.id} className={`${e.id} text-black w-[100%] h-[40px] rounded-lg p-2 outline-none shadow-md shadow-red-500`} type="text" defaultValue={e.text} />
                                : <p className='text-white'>{bool?<del>{fitext}</del>:`${fitext}`}
                                </p>}

                        </div>

                        <div>
                            {e.done ? <></> :
                                <button className='editors px-[10px] text-xl' id={e.id} onClick={handleUpdate}>{e.edit ? "👍🏻" : "✏️"}</button>}
                            <button className='editors px-[10px] text-xl' id={e.id} onClick={handleDelete}>❌</button>
                        </div>
                    </li>)
                }) : <h2 className='text-white'>No todos yet</h2>}
            </ul>
            <div className='h-[10%] flexed flex-row w-[90%] max-w-[600px]'>
                <input required ref={input} placeholder='Enter Todo here' className='border-2 border-black rounded-lg outline-none w-[80%] h-[50px] p-2' type="text" />
                <button className='text-white px-[18px] forhover' onClick={handleAddTodo}>Add todo</button>

            </div>
        </div>
    )
}

export default App
