import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDomain,
  addGender,
  addAvailability,
  addName,
} from "../../features/FilterSlice";
import { Link } from "react-router-dom";
import { useGetDomainsQuery } from "../../services/UserApi";

const NavCard = () => {
  const filter = useSelector((state) => state.filter);
  const {
    data: domainsData,
    isLoading: domainsQueryLoading,
    error: domainsQueryError,
  } = useGetDomainsQuery();
  
  const dispatch = useDispatch();
  return (
    <div className="bg-white">
      <div className="w-[96%] mx-auto lg:w-[90%] py-5 hidden lg:block">
        <div className="flex items-center justify-between">
          <Link to="" className="hover:text-gray-500"><h1>Users</h1></Link>
          <Link to="/teams" className="hover:text-gray-500"><h1>Teams</h1></Link>
          <select
            value={filter.domain}
            onChange={(e) => {
              
              dispatch(addDomain(e.target.value));
            }}
            className="py-3 px-4 bg-gray-100 w-[200px] border-solid border-gray-500  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="" hidden>
              Domain
            </option>
            {
              domainsData?.domains?.map((item,i)=>(
                <option value={item} key={i}>{item}</option>
              ))
            }
          </select>
          <select
            value={filter.available}
            onChange={(e) => {
              dispatch(addAvailability(e.target.value));
            }}
            className="py-3 px-4 bg-gray-100 w-[200px] border-solid border-gray-500  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="" hidden>
              Available
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select
            value={filter.gender}
            onChange={(e) => {
              dispatch(addGender(e.target.value));
            }}
            className="py-3 px-4 bg-gray-100 w-[200px] border-solid border-gray-500  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="" hidden>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            value={filter.name}
            onChange={(e)=>dispatch(addName(e.target.value))}
            className="py-3 px-4 bg-gray-100 w-[300px] border-gray-200  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            placeholder="Search By Username"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default NavCard;
