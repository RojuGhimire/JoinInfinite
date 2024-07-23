import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return <div className=" h-[90vh] w-[90vw] flex flex-col gap-5 items-center justify-center">

    <h1 className=" font-bold ">PAGE NOT FOUND !!</h1>
    <Link to={"/"} className=" px-4 py-2 bg-black text-white"> Go Back To Home Page</Link>
  </div>;
};

export default Error;
