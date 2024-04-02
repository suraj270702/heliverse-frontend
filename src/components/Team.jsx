import React from 'react'
import { useGetTeamsQuery } from '../services/UserApi'
import TeamCard from './cards/TeamCard'
import Loader from './Loader'

const Team = () => {
  const {data,isLoading,isError} = useGetTeamsQuery()
  return (
    <div>
      <div className='w-[96%] lg:w-[90%] mx-auto'>
      {
    isLoading ? (
      <Loader />
    ):(
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 lg:gap-x-0 gap-y-5 mt-10'>
        {
          data?.teams.map((item,i)=>(
            <TeamCard key={i} name={item.name} department={item.department} length={item.users.length} id={item._id} />
          ))
        }
</div>
    )
  }

      </div>
    </div>
  )
}

export default Team