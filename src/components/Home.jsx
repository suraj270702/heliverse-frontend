import React from "react";
import UserCard from "./cards/UserCard";
import NavCard from "./cards/NavCard";
import PaginationCard from "./cards/PaginationCard";
import { useGetUsersQuery } from "../services/UserApi";
import {  useSelector } from "react-redux";
import Loader from "./Loader";

const Home = () => {
  const filter = useSelector((state)=>state.filter)
  
  const page = useSelector((state)=>state.pagination.value)
  const args={page,domain:filter.domain,available:filter.available,gender:filter.gender,name:filter.name}
  const {data,error,isLoading} = useGetUsersQuery(args)
  //console.log("Domain",filter.domain)
  return (
   <>
    <NavCard />
    <div className="w-[96%] lg:w-[90%] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 lg:gap-x-0 gap-y-5  mt-10">
      {
        isLoading ? (
          <Loader />
        ):(
          data && data.users.map((item,i)=>(
            <UserCard key={i} first_name={item.first_name} last_name={item.last_name} email={item.email} gender={item.gender} imgUrl={item.avatar} available={item.available} domain={item.domain} id={item._id} />
          ))
        )
      }


    </div>
   {
    data && (
      <div className="flex items-center justify-center">
   <PaginationCard />
    
   </div>
    )
   }
   </>
  );
};

export default Home;
