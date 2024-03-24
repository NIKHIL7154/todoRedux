import {createSlice , nanoid} from '@reduxjs/toolkit'

var initialState= {
    todos:[]
}
if(localStorage.todos){
    initialState = JSON.parse(localStorage.getItem('todos'))
}else{
    localStorage.setItem('todos',JSON.stringify(initialState))
}

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo = {
                edit:false,
                id:nanoid(6),
                text:action.payload,
                done:false
            }
            state.todos.push(todo)
            localStorage.setItem('todos' , JSON.stringify(state))
        },
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter(item=> item.id != action.payload)
            localStorage.setItem('todos' , JSON.stringify(state))
        },
        updateTodo:(state,action)=>{
            if(action.payload.type=="✏️"){
                state.todos.filter((item)=>item.id==action.payload.id)[0].edit=true

            }else{
                state.todos.filter((item)=>item.id==action.payload.id)[0].edit=false
                state.todos.filter((item)=>item.id==action.payload.id)[0].text=action.payload.text
                localStorage.setItem('todos' , JSON.stringify(state))}
        },
        todoStatus:(state,action)=>{
            state.todos.filter((item)=>item.id==action.payload.id)[0].done=action.payload.bool
            localStorage.setItem('todos' , JSON.stringify(state))
        },
    }
})

export const {addTodo,removeTodo,updateTodo,todoStatus} = todoSlice.actions

export default todoSlice.reducer