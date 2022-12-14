import React, { useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { toast } from 'react-toastify';
import {RxUpdate,RxCross2} from 'react-icons/rx';
const TodoCard = ({ item,getData }) => {
    const { _id, name, email, type } = item;
    const [edit,setEdit]=useState(false);

    const handleDelete=()=>{
        fetch(`http://localhost:5000/deletetodo/${_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                getData();
                    toast.success('Deleted successfully');
                
                console.log(data);
            })
    }


    const handleUpdate = (event ) => {
        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
       

        const addData = {
            name:name,
             email:email, 
             type:type
        }

        console.log(addData);

        fetch(`http://localhost:5000/updatetodo/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addData)
        })
            .then(res => res.json())
            .then(data => {
                    setEdit(false);
                    getData();
                    toast.success('Updated successfully');
                
                console.log(data);
            })

       
    }


    const handleType = ( ) => {
        const addData = {
            name:name,
             email:email, 
             type:'Complete'
        }

        console.log(addData);

        fetch(`http://localhost:5000/updatetodo/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addData)
        })
            .then(res => res.json())
            .then(data => {
                    setEdit(false);
                    getData();
                    toast.success('Complete successfully');
                
                console.log(data);
            })

       
    }


    return (
        <div className='grid grid-cols-12 items-center text-xl w-11/12 mx-auto hover:bg-slate-100 p-2 '>
            <div className=' col-span-6 ' >
                {
                    edit ?
                    <form onSubmit={handleUpdate} className='mt-5 flex gap-5'>
                    <input name='name' type="text" placeholder="add your update" className="input input-bordered input-primary w-full " defaultValue={name} />
                    <button className='btn  btn-primary font-bold '> <RxUpdate className='w-6 h-6' /> </button>
                    <button className='btn  btn-error font-bold '> <RxCross2 className='w-6 h-6' onClick={()=>setEdit(false)}  /> </button>
                </form>
                     :<p className={`${type === 'Complete' ? 'line-through' : ''} `} >{name}</p>
                }
            </div>

            <div className={`col-span-3 mx-auto ${type === 'Complete' ? 'text-green-500' : 'text-red-500'} `} >
                <p>{type}</p>
            </div>

            <div className=' col-span-1 text-green-600 mx-auto' >
                {type === 'Pending' && <IoCheckmarkCircleOutline className='w-8 h-8 cursor-pointer' onClick={handleType} />}
            </div>

            <div className=' col-span-1 text-primary mx-auto ' >
                <AiTwotoneEdit className='w-8 h-8 cursor-pointer' onClick={()=>{
                    setEdit(true);
                }} />
            </div>
            <div className=' col-span-1 text-red-600  mx-auto' >
                <MdDeleteForever className='w-8 h-8 cursor-pointer' onClick={()=>{handleDelete(_id)}} />
            </div>


        </div>
    );
};

export default TodoCard;