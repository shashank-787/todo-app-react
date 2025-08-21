import { useState } from 'react'
import { Todo } from './components/Todo'
import { Button } from './components/Button'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function addTodo() {
        if (title.trim() === '') return;

        setTodos([...todos, {
            id: uuidv4(),
            title,
            description
        }])
        setTitle('')
        setDescription('')
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id != id))
    }

    function editTodo(id, title, description) {
        if (title.trim() === '') return;
        const updatedTodos = todos.map((
            todo => (todo.id == id ? { ...todo, title: title, description: description } : todo)
        ))
        setTodos(updatedTodos)
    }
    return (
        <>
            <div className='container min-h-screen  p-5 rounded-2xl  mx-auto  bg-amber-200 '>
                <h1 className='font-bold text-xl mb-3'>Add new todo</h1>
                <div className="input-box flex items-center gap-5 mb-3">
                    <div>
                        <div>
                            <input value={title} required onChange={(e) => setTitle(e.target.value)} className="border-0 outline-1  block" type="text" placeholder="Title" />
                        </div>
                        <div>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} className="border-0 outline-1  block" type="text" placeholder="Description" />
                        </div>
                    </div>
                    <Button onClick={addTodo} name={'Create'} color={'blue'} />
                </div>

                <h2 className='font-bold text-xl mb-3'>Your Todos </h2>
                <div className='todos'>
                    <ul>
                        {todos.map((todo) =>
                            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                        )}
                    </ul>
                </div>

            </div>

        </>
    )
}

export default App
