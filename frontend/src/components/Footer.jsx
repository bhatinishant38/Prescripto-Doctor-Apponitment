import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
   <div className="md:mx-10">
   
         <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
   
           <div>
             <img className="mb-5 w-40" src={assets.logo} alt="" />
             <p className="w-full md:w-1/2 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae veritatis rerum unde, est alias eos voluptatibus doloribus earum sint quidem. Laborum, mollitia illo aperiam alias esse architecto provident repellendus totam?</p>
   
           </div>
           
           <div>
             <p className="text-xl font-medium mb-5">COMPANY</p>
             <ul className="flex flex-col gap-2 text-gray-600">
               <li>Home</li>
               <li>About us</li>
               <li>Contact us</li>
               <li>Privacy policy</li>
             </ul>
           </div>
   
           <div>
             <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
             <ul className="flex flex-col gap-2 text-gray-600">
               <li>+1 123-456-7890</li>
               <li>testexample382gmail.com</li>
             </ul>
   
           </div>
         </div>
   
         <div>
           <hr className=""/>
           <p className="py-5 text-sm text-center">Copyright 2024@ Prescripto - All Right Reserved.</p>
         </div>

    </div>
  );
};

export default Footer;
