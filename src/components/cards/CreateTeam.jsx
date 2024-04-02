import React, { useEffect, useState } from "react";
import {
  useCreateTeamMutation,
  useGetDomainsQuery,
  useGetUsersQuery,
} from "../../services/UserApi";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
import toast, { Toaster } from "react-hot-toast";
import { clearUsers } from "../../features/teamSlice";
import PaginationCard from "./PaginationCard";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const CreateTeam = () => {
  const filter = useSelector((state) => state.filter);
  const page = useSelector((state) => state.pagination.value);
  const users = useSelector((state) => state.teams.users);
  const dispatch = useDispatch();
  const [teamDomain, setTeamDomain] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userName, setUserName] = useState("");

  const args = {
    page,
    domain: teamDomain,
    available: true,
    gender: filter.gender,
    name:userName
  };
  const {
    data: domainsData,
    isLoading: domainsQueryLoading,
    error: domainsQueryError,
  } = useGetDomainsQuery();
  const { data, isError, isLoading } = useGetUsersQuery(args);
  const [createTeam, createTeamState] = useCreateTeamMutation();

  const bodyData = {
    name: teamName,
    department: teamDomain,
    users: users,
  };
  const createTeamHandler = () => {
    if (!teamName) {
      toast.error("Team Name is required");
      return
    }
    if (!teamDomain) {
      toast.error("Domain is required");
      return
    }
    if (users.length === 0) {
      toast.error("please select users");
      return
    }
    createTeam(bodyData);
    
  };

  useEffect(() => {
    if (createTeamState.isSuccess) {
      toast.success("Team created successfully");
      dispatch(clearUsers());
    }
  }, [createTeamState.isSuccess]);
  
  return (
    <div>
      <Toaster />
      <div className="bg-white">
        <div className="w-[96%] lg:w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4  py-3 w-full">
            <div className="mb-3 flex flex-row items-center gap-x-2 w-full">
              <label>Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                placeholder="Enter a Team Name"
              />
            </div>
            <div className="mb-3 flex flex-row items-center gap-y-1 w-full">
              <label>Domain</label>
              <select
                type="text"
                value={teamDomain}
                onChange={(e) => {
                  setTeamDomain(e.target.value);
                  dispatch(clearUsers());
                }}
                className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                placeholder="Enter A Email"
              >
                <option value="" hidden>
                  Domain
                </option>
                {domainsData?.domains?.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <h1 className="text-md">Users Selected {users.length}</h1>
            </div>

            <div className="w-full">
              <button
                disabled={createTeamState.isLoading}
                onClick={createTeamHandler}
                className="py-3  w-full lg:w-[200px] border-gray-400 transition-all duration-300 ease-in-out bg-gray-200 font-medium hover:bg-gray-100"
              >
                {createTeamState.isLoading ? "Loading ..." : "create"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {teamDomain && (
        <>
        <div className="mt-10 flex-col lg:flex-row flex items-center justify-between w-[96%] lg:w-[90%] mx-auto">
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
          <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400 w-full lg:w-[300px]"
                placeholder="Search By User Name"
              />
        </div>
        <div className="w-[96%] lg:w-[90%] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 lg:gap-x-0 gap-y-5  mt-10">
          {isLoading ? (
            <Loader />
          ) : (
            data &&
            data.users.map((item, i) => (
              <UserCard
                key={i}
                first_name={item.first_name}
                last_name={item.last_name}
                email={item.email}
                gender={item.gender}
                imgUrl={item.avatar}
                available={item.available}
                domain={item.domain}
                id={item._id}
                add={true}
              />
            ))
          )}
        </div>
        </>
      )}
      {teamDomain && (
        <div className="mt-10 flex items-center justify-center">
          <PaginationCard />
        </div>
      )}
    </div>
  );
};

export default CreateTeam;
