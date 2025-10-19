import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { editUser } from '@/features/users/userSlice';


const EditUserModal = ({isOpen , onClose , user}) => {
    const dispatch = useDispatch();
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")

    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
        }
    },[user])

    const handleSubmit =async(e)=>{
        e.preventDefault()
        await dispatch(editUser({id:user.id , data:{name , email}}))
        onClose()
        toast.success("user updated successfully")
        
    }

    if(!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg dark:bg-gray-800 w-96">
        <h2 className="mb-4 text-xl font-semibold text-black">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-black">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>
          <div className="flex justify-between space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-800"
             
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserModal