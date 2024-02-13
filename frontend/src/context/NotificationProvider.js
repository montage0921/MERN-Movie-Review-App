import React, { Children, createContext, useState } from "react";

//To use context, create a context firstly
//It returns two object, provider and consumer
//The objects' purposes are inferred from their names
export const NotificationContext = createContext();

//setTimeout returns an ID used with clearTimeout()
//to cancel the timeout before it executes if needed.
let timeoutId;

//Provider provides value that can be used for all its descendants
export default function NotificationProvider({ children }) {
  //string for notification content
  const [notification, setNotification] = useState("");
  //render different color according to classes
  const [classes, setClasses] = useState("");

  /*this function is the Provider's value
    @value: notification content
    @type: notification type
  */
  const updateNotification = (type, value) => {
    //cancel current timeout
    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-red-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);

    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}

      {/*Code for notification‘s css and html  */}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div
            className={classes + " rounded shadow-md shadow-gray-400 bounce"}
          >
            <p className="text-white px-4 py-2 font-semibold ">
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
