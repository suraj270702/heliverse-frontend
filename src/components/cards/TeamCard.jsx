import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = ({name,department,length,id}) => {
  return (
    <Link to={`/single-team/${id}`}>
    <div className='w-full h-full lg:w-[200px]  bg-white p-2 shadow-xl '>
    <div className='flex flex-col gap-y-2'>
      <h1 className='text-sm'>{name}</h1>
      <h1 className='text-sm'>{department}</h1>
      <h1 className='text-sm'>Number Of Users {length}</h1>


    </div>

  </div>
    </Link>
  )
}

export default TeamCard