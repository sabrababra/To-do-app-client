import React, { useContext, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';
import TodoCard from './TodoCard';
const Todo = () => {
    const { logOut, user } = useContext(AuthContext);
    const [todoData, setTodoData] = useState([]);
    const [completeData,setCompleteData]=useState([]);
    const [pendingData,setPendingData]=useState([]);
    const getData = () => {
        fetch(`https://todo-app-server-seven.vercel.app/gettododata?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setTodoData(data)
                const complete=data.filter(p=>p.type==='Complete');
                setCompleteData(complete);
                const pending=data.filter(p=>p.type==='Pending');
                setPendingData(pending);
            })
    }
    useEffect(() => {
        getData();
    }, [])


    const handleSubmit = (event) => {

        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const email = user?.email;
        const type = 'Pending'

        const addData = { name, email, type };

        console.log(addData);

        fetch('https://todo-app-server-seven.vercel.app/addtodo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addData)
        })
            .then(res => res.json())
            .then(data => {
                getData();
                toast.success('Added successfully');
                from.reset();
                console.log(data);
            })


    }

    return (
        <div className="hero min-h-screen ">
            <div className="hero-content ">
                <div className="lg:w-[1080px] md:w-[600px] bg-white rounded-xl shadow-lg p-5">
                    {/* header */}
                    <div className="navbar">
                        <div className="flex-1">
                            <a className="btn btn-ghost normal-case text-xl">TODO-LIST</a>
                        </div>
                        <div className="flex-none">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <p className="justify-between">

                                            {user?.displayName}
                                        </p>
                                    </li>
                                    <li><p>{user?.email}</p></li>
                                    <li><button onClick={() => { logOut() }}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* count    */}
                    <div className='flex justify-evenly'>
                        <div >
                            <p className=' bg-blue-400 px-2 py-1 rounded-full font-semibold text-white '>Total:{todoData?.length}</p>
                        </div>
                        <div>
                            <p className=' bg-green-400 px-2 py-1 rounded-full font-semibold text-white '>Complete:{completeData.length}</p>
                        </div>
                        <div>
                            <p className=' bg-red-400 px-2 py-1 rounded-full font-semibold text-white '>Pending:{pendingData.length}</p>
                        </div>
                    </div>
                    {/* add section */}
                    <form onSubmit={handleSubmit} className='mt-5 flex gap-5'>
                        <input name='name' type="text" placeholder="Type here" className="input input-bordered input-primary w-full " />
                        <button className='btn  btn-primary font-bold '><GoPlus className='mr-1 w-6 h-6' /> Add todo </button>
                    </form>
                    {/* lists */}
                    <div className='mt-5 h-[300px] overflow-auto scroll-bar'>
                        {
                            todoData.map(item =><TodoCard
                                key={item?._id}
                                item={item}
                                getData={getData}
                                ></TodoCard>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Todo;