import React, { useEffect, useState } from "react";
import { useCreateSingleUserMutation, useGetDomainsQuery } from "../../services/UserApi";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
    const [createUser,createUserState]=useCreateSingleUserMutation()
  const [userData, setUserData] = useState({
    id: Math.round(Math.random() * 10000),
    avatar: "",
    first_name: "",
    last_name: "",
    email: "",
    domain: "",
    gender: "",
    available: true,
  });
  const {
    data: domainsData,
    isLoading: domainsQueryLoading,
    error: domainsQueryError,
  } = useGetDomainsQuery();
  const updateUserData = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleCreateUserData = () => {
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.avatar ||
      !userData.id ||
      !userData.email ||
      !userData.domain
    ) {
      toast.error("Please fill out all fields");
      return
    }
    createUser(userData)
    
  };

  useEffect(()=>{
    if(createUserState.isSuccess){
      toast.success("User Created Successfully")
    }
  },[createUserState.isSuccess])

  return (
    <div className="w-[96%] mx-auto lg:w-[90%] flex items-center justify-center">
      <Toaster />
      <div className="w-full lg:w-[700px] h-full p-3 md:p-5 bg-white rounded-lg">
        <h1 className="text-center text-lg md:text-xl">Create User</h1>
        <div className="mb-3 flex flex-col gap-y-1">
          <label>User Id</label>
          <input
            type="number"
            value={userData.id}
            onChange={(e) => updateUserData("id", e.target.value)}
            className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
            placeholder="Enter A User Id"
          />
        </div>
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
          <label>Avatar Url</label>
          <input
            type="text"
            value={userData.avatar}
            onChange={(e) => updateUserData("avatar", e.target.value)}
            className="py-3 pl-4 focus:outline-none bg-gray-100 border-gray-400 rounded-lg placeholder:text-gray-400"
            placeholder="Enter A Avatar Url"
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
              <option value={item} key={i}>
                {item}
              </option>
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
        <button
         disabled={createUserState.isLoading}
          onClick={handleCreateUserData}
          className="py-3 mt-3 w-full border-gray-400 transition-all duration-300 ease-in-out bg-gray-200 font-medium hover:bg-gray-100"
        >
          {createUserState.isLoading ? "Loading...":"create"}
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
