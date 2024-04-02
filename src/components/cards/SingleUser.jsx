import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleUserQuery,useUpdateSingleUserMutation } from "../../services/UserApi";
import { useGetDomainsQuery } from "../../services/UserApi";
import axios from "axios";
import Loader from "../Loader";


const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const { data, isLoading, error } = useGetSingleUserQuery(id);
  const [updateUser,updatingState] = useUpdateSingleUserMutation()
  
  const {
    data: domainsData,
    isLoading: domainsQueryLoading,
    error: domainsQueryError,
  } = useGetDomainsQuery();
  function updateUrlSize(url, newSize = "600x700") {
    if (url.includes("size=")) {
      return url.replace(/size=\d*x\d*/, `size=${newSize}`);
    } else {
      return `${url}&size=${newSize}`;
    }
  }
  const [userData, setUserData] = useState({
    id:0,
    avatar:"",
    first_name: "",
    last_name: "",
    email: "",
    domain: "",
    gender: "",
    available: true,
  });
  //console.log(userData.first_name)

  const updateUserData = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const args ={id,userData}
  useEffect(() => {
    if (data) {
      setUserData({
        id:data.user.id,
        avatar:data.user.avatar,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        domain: data.user.domain,
        gender: data.user.gender,
        available: data.user.available,
      });
    }
  }, [data]);
  
  const updateUserDataHandler =async()=>{
    try{
      //console.log(userData)
      
      //console.log(status)
       updateUser(args)
       
      
    }
    catch(err){
      console.log(err)
    }

  }
  //console.log(updatingState.isSuccess)
  return (
    <>
      {isLoading ? (
       <Loader />
      ) : (
        <div className="w-[96%] lg:w-[90%] mx-auto ">
          <div className="flex items-center justify-between">
          <Link to="/">
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
          <Link to="/create-single-user">
          <button className="py-3 px-4 w-full lg:w-[200px] border-gray-400 transition-all duration-300 ease-in-out bg-gray-200 font-medium hover:bg-gray-100">
                create user
              </button>
          </Link>
          </div>
          <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5 w-full h-full mt-10">
            <div className="bg-gray-50 p-2 w-full lg:w-1/3  rounded-lg">
              <img src={updateUrlSize(data.user.avatar)} />
            </div>
            <div className="w-full lg:w-1/3  bg-gray-50 p-2 lg:p-5 rounded-lg">
              <div className="grid grid-cols-1  gap-y-5">
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col items-start gap-y-1 ">
                    <h1 className="text-md  font-medium text-gray-400">
                      First Name
                    </h1>
                    <h1 className="text-lg  font-medium">
                      {data.user.first_name}
                    </h1>
                  </div>
                  <div className="flex flex-col items-start gap-y-1 ">
                    <h1 className="text-md  font-medium text-gray-400">
                      Last Name
                    </h1>
                    <h1 className="text-lg  font-medium">
                      {data.user.last_name}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col items-start gap-y-1 ">
                    <h1 className="text-md  font-medium text-gray-400">
                      Email
                    </h1>
                    <h1 className="text-lg  font-medium">{data.user.email}</h1>
                  </div>
                  <div className="flex flex-col items-start gap-y-1 ">
                    <h1 className="text-md  font-medium text-gray-400">
                      Domain
                    </h1>
                    <h1 className="text-lg  font-medium">{data.user.domain}</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col items-start gap-y-1 ">
                    <h1 className="text-md  font-medium text-gray-400">
                      Gender
                    </h1>
                    <h1 className="text-lg  font-medium">{data.user.gender}</h1>
                  </div>
                  <div className="flex flex-col items-start gap-y-1 ">
                    <h1 className="text-md  font-medium text-gray-400">
                      Availability
                    </h1>
                    <h1 className="text-lg  font-medium">
                      {data.user.available ? "Available" : "Not Available"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-gray-50 p-2 lg:p-5 rounded-lg">
              <div className="mb-3 flex flex-col gap-y-1">
                <label>FirstName</label>
                <input
                  type="text"
                  value={userData.first_name}
                  onChange={(e) => updateUserData("first_name", e.target.value)}
                  className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                  placeholder="Enter A Name"
                />
              </div>
              <div className="mb-3 flex flex-col gap-y-1">
                <label>LastName</label>
                <input
                  type="text"
                  value={userData.last_name}
                  onChange={(e) => updateUserData("last_name", e.target.value)}
                  className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                  placeholder="Enter A Last Name"
                />
              </div>
              <div className="mb-3 flex flex-col gap-y-1">
                <label>Email</label>
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) => updateUserData("email", e.target.value)}
                  className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                  placeholder="Enter A Email"
                />
              </div>
              <div className="mb-3 flex flex-col gap-y-1">
                <label>Domain</label>
                <select
                  type="text"
                  value={userData.domain}
                  onChange={(e) => updateUserData("domain", e.target.value)}
                  className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                  placeholder="Enter A Email"
                >
                  {domainsData?.domains?.map((item, i) => (
                    <option value={item} key={i}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 flex flex-col gap-y-1">
                <label>Gender</label>
                <select
                  type="text"
                  value={userData.gender}
                  onChange={(e) => updateUserData("gender", e.target.value)}
                  className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                  placeholder="Enter A Email"
                >
                  <option value="" hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3 flex flex-col gap-y-1">
                <label>Availability</label>
                <select
                  value={userData.available ? "Yes" : "No"} 
                  onChange={(e) =>
                    updateUserData("available", e.target.value === "Yes")
                  } 
                  className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button disabled={updatingState.isLoading} onClick={updateUserDataHandler} className="py-3 w-full border-gray-400 transition-all duration-300 ease-in-out bg-gray-200 font-medium hover:bg-gray-100">
                {updatingState.isLoading ? "loading ...":"update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleUser;
