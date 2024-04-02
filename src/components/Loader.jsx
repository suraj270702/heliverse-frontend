import { Circle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-full'>
        <div>
            <h1 className=' animate-pulse text-[10px]'><Circle /></h1>
        </div>
    </div>
  )
}

export default Loader