import React from "react";
import { GiFilmSpool } from "react-icons/gi";
import Container from "../Container";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 px-10 ">
      <Container className=" text-white p-2  ">
        <div className="flex justify-between items-center">
          <img src="./logo-color.png" alt="" className="h-10 " />
          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-mzy-blue p-1 rounded">
                <GiFilmSpool className="text-white " size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="search..."
              />
            </li>
            <Link
              className="text-white font-semibold text-lg"
              to="/auth/signin"
            >
              Login
            </Link>
          </ul>
        </div>
      </Container>
    </div>
  );
}
