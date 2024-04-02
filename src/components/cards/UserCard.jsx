import React from 'react'
import { Link } from 'react-router-dom'
import { Plus,Minus } from 'lucide-react'
import { addUser,removeUser } from '../../features/teamSlice'
import { useSelector,useDispatch } from 'react-redux'

const UserCard = ({imgUrl,first_name,last_name,email,domain,gender,available,id,add}) => {
  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    dispatch(addUser(id)); 
  };
  const handleRemoveClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    dispatch(removeUser(id)); 
  };
  const users = useSelector((state)=>state.teams.users)
  const isUserExists = users.some(user => user.userId === id);
  const AddButton = () => (
    <button onClick={handleClick} className='p-1 bg-gray-400 rounded-full'>
      <Plus />
    </button>
  );
  const CloseButton = () => (
    <button onClick={handleRemoveClick} className='p-1 bg-gray-400 rounded-full'>
      <Minus />
    </button>
  );
  return (
    <Link to={`/single-user/${id}`}>
        <div className="w-full h-full lg:w-[200px]  bg-white p-2 shadow-xl">
        <div>
          <div className="flex items-center justify-center">
            <div className=" flex items-center justify-center p-2 w-fit">
              <img
                src={imgUrl}
                alt=""
                className=""
              />
            </div>
          </div>

          <div className="mt-2">
            <h1 className="text-[#2A282F] font-medium text-start text-sm">
              {first_name} {last_name}
            </h1>
            <div className="flex items-start flex-col gap-y-2 mt-2">
              <h1 className="text-[#2A282F] font-medium text-start text-xs">
                {email}
              </h1>
              <div className='flex flex-row items-center  gap-x-4 md:gap-x-6 lg:gap-x-7'>
              <h1 className="text-[#2A282F] font-medium text-start text-xs">
                {domain}
              </h1>
              {
                add && (
                  isUserExists ? <CloseButton  className='p-1 bg-gray-400 rounded-full'/> : <AddButton  className='p-1 bg-gray-400 rounded-full' />
                )
              }
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <h1 className="text-[#2A282F] font-medium text-start text-xs">
                {gender}
              </h1>
              <h1 className="text-[#2A282F] font-medium text-start text-xs">
                {available ? "Available":"Not Available"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserCard