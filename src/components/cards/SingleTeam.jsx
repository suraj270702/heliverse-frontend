import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleTeamQuery } from "../../services/UserApi";
import UserCard from "./UserCard";
import Loader from "../Loader";


const SingleTeam = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleTeamQuery(id);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[96%] lg:w-[90%] mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/teams">
              <button className="bg-gray-200 p-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </button>
            </Link>
            <Link to="/create-team">
              <button className="py-3 px-4 w-full lg:w-[200px] border-gray-400 transition-all duration-300 ease-in-out bg-gray-200 font-medium hover:bg-gray-100">
                create new team
              </button>
            </Link>
          </div>
          <div className="mt-10">
            <div className="w-full lg:w-[300px] mx-auto bg-white flex flex-col gap-y-3 items-center justify-center">
              <h1 className="text-sm">{data?.team?.name}</h1>
              <h1 className="text-sm">{data?.team?.department}</h1>
              <h1 className="text-sm">
                Number Of Users {data?.team?.users.length}
              </h1>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 lg:gap-x-0 gap-y-5">
            {data?.team?.users.map((item, i) => (
              <UserCard
                key={i}
                first_name={item.userId.first_name}
                last_name={item.userId.last_name}
                imgUrl={item.userId.avatar}
                email={item.userId.email}
                domain={item.userId.domain}
                available={item.userId.available}
                gender={item.userId.gender}
                id={item.userId._id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTeam;
