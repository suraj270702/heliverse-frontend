import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { setPageValue,increment,decrement } from '../../features/pageSlice'

const PaginationCard = () => {
    const page = useSelector((state)=>state.pagination.value)
    const dispatch = useDispatch()
    //console.log(page)
    const startButton = page ;
    const endButton = startButton + 3;

    // Generate an array of button numbers within the range
    const buttons = [];
    for (let i = startButton; i <= endButton; i++) {
        buttons.push(
            <button
                key={i}
                onClick={()=>dispatch(setPageValue(i))}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 ${page===i ? "bg-gray-900 text-white":""} disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="button">
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {i}
                </span>
            </button>
        );
    }
  return (
    <div className="flex items-center gap-4 mt-10">
  <button disabled={page===1}
   onClick={()=>dispatch(decrement())}
    className="flex items-center justify-center gap-2 h-10 max-h-[40px] w-10 max-w-[40px]   font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
      aria-hidden="true" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
    </svg>
   
  </button>
  <div className="flex items-center gap-2">
    {
        buttons
    }
  </div>
  <button
    onClick={()=>dispatch(increment())}
    className="flex items-center justify-center gap-2 h-10 max-h-[40px] w-10 max-w-[40px] font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button">
   
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
      aria-hidden="true" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
    </svg>
  </button>
</div> 
  )
}

export default PaginationCard