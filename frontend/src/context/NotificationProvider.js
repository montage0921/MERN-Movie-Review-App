import React, { Children, createContext } from "react";

//To use context, create a context firstly
//It returns two object, provider and consumer
//The objects' purposes are inferred from their names
const NotificationContext = createContext();

//Provider provide value that can be used for all its descendants
export default function NotificationProvider({ children }) {
  //this function is the Provider's value
  const updateNotification = () => {};

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}

      {/*Code for notification css and html  */}
      <div className="fixed left-1/2 -translate-x-1/2 top-24">
        <div className=" bg-green-400 rounded shadow-md shadow-gray-400 bounce">
          <p className="text-white px-4 py-2 font-semibold ">
            Somethign went wrong
          </p>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}
