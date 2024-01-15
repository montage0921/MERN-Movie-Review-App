import React from "react";
import { GiFilmSpool } from "react-icons/gi";
import Container from "../Container";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";
import { useTheme } from "../../hooks";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  return (
    <div className="bg-mzy-blue shadow-sm shadow-gray-500 px-10 ">
      <Container className=" text-white p-2  ">
        <div className="flex justify-between items-center">
          <CustomLink to={"/"}>
            <img src="./logo-color.png" alt="" className="h-10 " />
          </CustomLink>

          <ul className="flex items-center space-x-4">
            <li>
              <button onClick={toggleTheme} className="bg-mzy-blue p-1 rounded">
                <GiFilmSpool
                  className="dark:text-white text-black "
                  size={24}
                />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="search..."
              />
            </li>
            <li>
              <CustomLink to={"/auth/signin"}>Sign In</CustomLink>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
