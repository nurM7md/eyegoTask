"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 p-3 text-white transition bg-gray-800 rounded-lg shadow-md md:hidden top-4 left-4 hover:bg-gray-700"
        >
          <Menu size={24} />
        </button>
      )}


      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block z-40 shadow-lg`}
      >

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold ">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-300 rounded hover:bg-gray-700 md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <ul className="space-y-3 text-gray-200">
          
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 font-medium rounded-md hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/charts"
              className="block px-4 py-2 font-medium rounded-md hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Charts
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="block px-4 py-2 font-medium rounded-md hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              LogOut
            </Link>
          </li>
        </ul>

      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
