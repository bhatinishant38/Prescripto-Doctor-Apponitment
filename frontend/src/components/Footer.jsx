import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 pt-12 text-slate-600">
      <div className="grid gap-10 pb-12 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
        <div className="max-w-md">
          <NavLink to="/" aria-label="Prescripto home">
            <img className="w-40" src={assets.logo} alt="Prescripto" />
          </NavLink>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            Prescripto makes it simple to find trusted doctors and book the care
            you need, whenever you need it.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            Company
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <NavLink className="transition-colors hover:text-blue-600" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="transition-colors hover:text-blue-600"
                to="/about"
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                className="transition-colors hover:text-blue-600"
                to="/contact"
              >
                Contact us
              </NavLink>
            </li>
            <li>
              <a
                className="transition-colors hover:text-blue-600"
                href="#privacy"
              >
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            Get in touch
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                className="transition-colors hover:text-blue-600"
                href="tel:+1121347598"
              >
                +1-121-347-598
              </a>
            </li>
            <li>
              <a
                className="wrap-break-word transition-colors hover:text-blue-600"
                href="mailto:bhatinishant38@gmail.com"
              >
                testexample38@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-200 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 Prescripto. All rights reserved.</p>
        <p className="text-slate-400">Care made simpler.</p>
      </div>
    </footer>
  );
};

export default Footer;
