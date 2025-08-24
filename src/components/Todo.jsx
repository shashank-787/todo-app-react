import { useState } from "react";
import { Button } from "./Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
{/* <MdCancel /> */}
export function Todo({ todo, deleteTodo, editTodo, handleCheckBox }) {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description)

    const editingTemplate = (
        <>
            <div>
                <div className="form-group p-1">
                    {/* <label htmlFor="">New title for {todo.title}</label> */}
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="font-bold border-0 outline-1 block" placeholder="Edit title" type="text" />
                </div>
                <div className="form-group p-1">
                    {/* <label htmlFor="">Edit description for {todo.title}</label> */}
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="border-0 outline-1 block" placeholder="Edit description" type="text" />
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={() => {
                    setTitle(todo.title)
                    setDescription(todo.description)
                    setEditing(false)
                }} className="bg-gray-400 px-1 rounded-md cursor-pointer" >Cancel</button>
            

                <button onClick={() => {
                    editTodo(todo.id, title, description)
                    setEditing(false)
                }} className="bg-green-400 px-1 rounded-md  cursor-pointer">Save</button>
            </div>
        </>
    )
    const viewTemplate = (
        <>
            <div className="">
                <div className="flex items-center justify gap-2">
                    <input checked={todo.isCompleted} name={todo.id} onChange={handleCheckBox} type="checkbox" value="" style={{ accentColor: '#16a34a'}}  className="min-w-4 h-4 border border-black"/>
                    <h1 className={`${todo.isCompleted?"line-through":""} text-lg font-bold`}>{todo.title}</h1>
                </div>
                <p className="p-1">{todo.description}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setEditing(true)} className="bg-blue-400 px-2 py-1 rounded-md cursor-pointer">{<FaEdit size={"20px"} /> }</button>
                <button onClick={() => deleteTodo(todo.id)} className="bg-red-400 px-2 py-1 rounded-md cursor-pointer">{<MdDelete size={"20px"} />}</button>
                
            </div>
        </>


    )
    return (
        <>
            <li className="w-full  flex justify-between mb-1 items-start">
                {isEditing ? editingTemplate : viewTemplate}
            </li>
        </>
    )
}