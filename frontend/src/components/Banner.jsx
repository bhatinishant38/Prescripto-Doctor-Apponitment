import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="my-16 flex min-h-90 overflow-hidden rounded-2xl bg-primary px-6 shadow-lg shadow-blue-100 sm:px-10 md:mx-10 md:px-14 lg:px-16">
      <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
        <div className="max-w-xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
            Simple, trusted care
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Book an appointment with trusted doctors.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-blue-100 sm:text-base">
            Get the care you need from experienced specialists , whenever you
            need it.
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md"
        >
          Create account{" "}
          <span className="ml-2" aria-hidden="true">
            &rarr;
          </span>
        </button>
      </div>
      <div className="relative hidden w-1/2 md:block lg:w-5/12">
        <img
          className="absolute bottom-0 right-0 h-full w-full max-w-md object-contain object-bottom"
          src={assets.appointment_img}
          alt="Doctor ready for an appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
