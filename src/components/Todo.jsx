import { useState } from "react";
import { Button } from "./Button";

export function Todo({ todo, deleteTodo, editTodo }) {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [done, setDone] = useState(todo.done);

    const editingTemplate = (
        <>
            <div>
                <div className="form-group p-1">
                    {/* <label htmlFor="">New title for {todo.title}</label> */}
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg font-bold border-0 outline-1  block" placeholder="Edit title" type="text" />
                </div>
                <div className="form-group p-1">
                    {/* <label htmlFor="">Edit description for {todo.title}</label> */}
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="border-0 outline-1  block" placeholder="Edit description" type="text" />
                </div>
            </div>

            <div className="flex gap-2">
                <Button onClick={() => {
                    setTitle(todo.title)
                    setDescription(todo.description)
                    setEditing(false)
                }} name={'Cancel'} color={'gray'} />

                <Button onClick={() => {
                    editTodo(todo.id, title, description)
                    setEditing(false)
                }} name={'Save'} color={'green'}/>
            </div>
        </>
    )
    const viewTemplate = (
        <>
            <div className="">
                <h1 className="p-1 text-lg font-bold">{todo.title}</h1>
                <p className="p-1">{todo.description}</p>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => setEditing(true)} name={'Edit'} color={'blue'} />
                <Button onClick={() => deleteTodo(todo.id)} name={'Delete'} color={'red'} />
            </div>
        </>


    )
    return (
        <>
            <li className="w-96 bg-white flex justify-between mb-2 items-start p-2">
                {isEditing ? editingTemplate : viewTemplate}
            </li>
        </>
    )
}